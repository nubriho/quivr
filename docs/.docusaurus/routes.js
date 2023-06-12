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
    component: ComponentCreator('/docs', '31a'),
    routes: [
      {
        path: '/docs/backend/intro',
        component: ComponentCreator('/docs/backend/intro', 'a7f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/backend-development',
        component: ComponentCreator('/docs/category/backend-development', 'a07'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/frontend-development',
        component: ComponentCreator('/docs/category/frontend-development', '65b'),
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
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
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
