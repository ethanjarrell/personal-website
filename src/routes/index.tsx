import type { ReactElement } from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Resume from '../pages/Resume';

interface AppRoute {
  path: string;
  element: ReactElement;
}

const routes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/resume', element: <Resume /> },
];

export default routes;
