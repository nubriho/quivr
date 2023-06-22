import os
from typing import Any, Dict, List
from models.settings import LLMSettings
from langchain.chains import ConversationalRetrievalChain, LLMChain
from langchain.chains.question_answering import load_qa_chain
from langchain.chains.router.llm_router import LLMRouterChain, RouterOutputParser
from langchain.chains.router.multi_prompt_prompt import MULTI_PROMPT_ROUTER_TEMPLATE
from langchain.chat_models import ChatOpenAI, ChatVertexAI
from langchain.chat_models.anthropic import ChatAnthropic
from langchain.docstore.document import Document
from langchain.embeddings.base import Embeddings
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain.llms import GPT4All
from langchain.llms.base import LLM
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import SupabaseVectorStore
from llm.prompt import LANGUAGE_PROMPT
from llm.prompt.CONDENSE_PROMPT import CONDENSE_QUESTION_PROMPT
from models.chats import ChatMessage
from models.settings import BrainSettings
from pydantic import BaseModel, BaseSettings
from supabase import Client, create_client
from vectorstore.supabase import CustomSupabaseVectorStore
from logger import get_logger

logger = get_logger(__name__)

class AnswerConversationBufferMemory(ConversationBufferMemory):
    def save_context(self, inputs: Dict[str, Any], outputs: Dict[str, str]) -> None:
        # Overriding the save_context method of the parent class
        return super(AnswerConversationBufferMemory, self).save_context(
            inputs, {"response": outputs["answer"]}
        )
def get_chat_history(inputs) -> str:
    res = []
    for human, ai in inputs:
        res.append(f"{human}:{ai}\n")
    return "\n".join(res)


class BrainPicking(BaseModel):
    llm_name: str = "gpt-3.5-turbo"
    settings = BrainSettings()
    llm_config = LLMSettings()
    embeddings: OpenAIEmbeddings = None
    supabase_client: Client = None
    vector_store: CustomSupabaseVectorStore = None
    llm: LLM = None
    question_generator: LLMChain = None
    doc_chain: ConversationalRetrievalChain = None

    class Config:
        arbitrary_types_allowed = True

    def init(self, model: str, user_id: str) -> "BrainPicking":
        self.embeddings = OpenAIEmbeddings(openai_api_key=self.settings.openai_api_key)
        self.supabase_client = create_client(
            self.settings.supabase_url, self.settings.supabase_service_key
        )
        self.vector_store = CustomSupabaseVectorStore(
            self.supabase_client,
            self.embeddings,
            table_name="vectors",
            user_id=user_id,
        )
                    
        self.llm = self._determine_llm(
            private_model_args={
                "model_path": self.llm_config.model_path,
                "n_ctx": self.llm_config.model_n_ctx,
                "n_batch": self.llm_config.model_n_batch,
            },
            private=self.llm_config.private,
            model_name=self.llm_name,
        )
        self.question_generator = LLMChain(
            llm=self.llm, prompt=CONDENSE_QUESTION_PROMPT
        )
        self.doc_chain = load_qa_chain(self.llm, chain_type="stuff")
        return self

    def _determine_llm(
        self, private_model_args: dict, private: bool = False, model_name: str = None
    ) -> LLM:
        if private:
            model_path = private_model_args["model_path"]
            model_n_ctx = private_model_args["n_ctx"]
            model_n_batch = private_model_args["n_batch"]
            
            logger.info("Using private model: %s", model_path)

            return GPT4All(
                model=model_path,
                n_ctx=model_n_ctx,
                n_batch=model_n_batch,
                backend="gptj",
                verbose=True,
            )
        else:
            return ChatOpenAI(temperature=0, model_name=model_name)

    def _get_qa(
        self, chat_message: ChatMessage, user_openai_api_key
    ) -> ConversationalRetrievalChain:
        if user_openai_api_key is not None and user_openai_api_key != "":
            self.settings.openai_api_key = user_openai_api_key
        qa = ConversationalRetrievalChain(
            retriever=self.vector_store.as_retriever(),
            max_tokens_limit=chat_message.max_tokens,
            question_generator=self.question_generator,
            combine_docs_chain=self.doc_chain,
            get_chat_history=get_chat_history,
        )
        return qa

    def generate_answer(self, chat_message: ChatMessage, user_openai_api_key) -> str:
        transformed_history = []
        qa = self._get_qa(chat_message, user_openai_api_key)
        for i in range(0, len(chat_message.history) - 1, 2):
            user_message = chat_message.history[i][1]
            assistant_message = chat_message.history[i + 1][1]
            transformed_history.append((user_message, assistant_message))
        model_response = qa(
            {"question": chat_message.question, "chat_history": transformed_history}
        )
        answer = model_response["answer"]
        return answer