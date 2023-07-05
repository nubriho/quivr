FROM python:3.11-bullseye

RUN apt-get update && apt-get install -y libgeos-dev

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir -r /code/requirements.txt --timeout 100

COPY ./scripts/start.sh /code/scripts/start.sh
RUN chmod +x /code/scripts/start.sh

COPY . /code/

ENTRYPOINT ["/code/scripts/start.sh"]
