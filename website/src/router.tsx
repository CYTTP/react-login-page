import { Navigate, IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import { ErrorPage } from './comps/ErrorPage';
import { Layout } from './comps/Layout';
import { DocsLayout } from './comps/DocsLayout';
import { PagesLayout } from './comps/PagesLayout';

import { ReactComponent as Logo } from './svg/logo.svg';

import { Home } from './pages/home';
import { Preview } from './comps/Preview';

export interface MenuRouteObject
  extends Omit<IndexRouteObject, 'children' | 'index'>,
    Omit<NonIndexRouteObject, 'children' | 'index'> {
  index?: boolean;
  label?: string;
  children?: MenuRouteObject[];
}

export const routes: MenuRouteObject = {
  path: '/',
  Component: Layout,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      Component: Home,
    },
    {
      path: 'docs',
      Component: DocsLayout,
      children: [
        {
          index: true,
          element: <Navigate to="getting-started" />,
        },
        {
          label: 'OVERVIEW',
        },
        {
          path: 'getting-started',
          label: 'Getting Started',
          element: <Preview path={() => import('react-login-page/README.md')} />,
        },
      ],
    },
    {
      path: 'pages',
      Component: PagesLayout,
      children: [
        {
          index: true,
          element: <Navigate to="base" />,
        },
        {
          path: 'base',
          label: 'Login · Base',
          lazy: async () => {
            const Login = await import('@react-login-page/base');
            const LoginExample = Login.default
            return {
              element: (
                <Preview disableNav path={() => import('@react-login-page/base/README.md')}>
                  <LoginExample>
                    <LoginExample.Logo>
                      <Logo />
                    </LoginExample.Logo>
                  </LoginExample>
                </Preview>
              ),
            }
          }
        },
      ],
    },
  ],
};
