import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'e4d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '150'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '8a6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '7b1'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '79b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '42f'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '060'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'b8a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'a84'),
    routes: [
      {
        path: '/docs/backend/api/chat',
        component: ComponentCreator('/docs/backend/api/chat', '621'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/backend/api/error_handling',
        component: ComponentCreator('/docs/backend/api/error_handling', 'af8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/backend/api/getting_started',
        component: ComponentCreator('/docs/backend/api/getting_started', 'd8e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/backend/intro',
        component: ComponentCreator('/docs/backend/intro', 'a7f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/backend/llm/private-llm',
        component: ComponentCreator('/docs/backend/llm/private-llm', '699'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/api',
        component: ComponentCreator('/docs/category/api', '664'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/getting-started',
        component: ComponentCreator('/docs/category/getting-started', '01f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/llm',
        component: ComponentCreator('/docs/category/llm', 'b34'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/quivrs-brain',
        component: ComponentCreator('/docs/category/quivrs-brain', '1d3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/quivrs-face',
        component: ComponentCreator('/docs/category/quivrs-face', '21d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/frontend/manage-docs-versions',
        component: ComponentCreator('/docs/frontend/manage-docs-versions', 'f63'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/get_started/intro',
        component: ComponentCreator('/docs/get_started/intro', 'a87'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/privacy_policy',
        component: ComponentCreator('/docs/privacy_policy', '039'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/roadmap',
        component: ComponentCreator('/docs/roadmap', '7ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '70f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
