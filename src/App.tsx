import React, { ReactNode } from 'react';
import { Outlet, Router, Route } from '@tanstack/react-location';
import { ThreeProvider } from './components/ThreeContext';
import { routes, location } from './routes';
import { TransitionPointsController } from './components/controller/TransitionPointsController';
import { Earth } from './components/controller/Earth';
import { MatrixMovie } from './components/controller/MatrixMovie';
import { SquareFly } from './components/controller/SquareFly';
import { Buble } from './components/controller/Buble';
import { Buble2 } from './components/controller/Buble2';
import { OutMaterial } from './components/controller/OutMaterial';
import { Shader1 } from './components/controller/Shader1';
import { Shader2 } from './components/controller/Shader2';
import { ExampleCanvas } from './temp/ExampleCanvas';
import { Navigation } from './components/common/Navigation';

const addRouters = (path: string, router: Route[], components: ReactNode[]): Route[] => {
  const routes = components.map((Component, index) => {
    return {
      path: '/' + (index + 1).toString(),
      element: Component,
    };
  });
  return [
    ...router,
    {
      path: path,
      children: routes,
    },
  ];
};
const productionRegister = (router: Route[]): Route[] => {
  if (process.env.NODE_ENV === 'production') {
    return [
      {
        path: 'saihate',
        children: router,
      }
    ];
  }
  return router;
}

const productComponents: ReactNode[] = [
  <ThreeProvider><TransitionPointsController /></ThreeProvider>,
  <ThreeProvider><Earth /></ThreeProvider>,
  <MatrixMovie />,
  <ThreeProvider><SquareFly /></ThreeProvider>,
  <ThreeProvider><Buble /></ThreeProvider>,
  <ThreeProvider><Buble2 /></ThreeProvider>,
  <ThreeProvider><OutMaterial /></ThreeProvider>,
  <ThreeProvider><Shader1 /></ThreeProvider>,
  <ThreeProvider><Shader2 /></ThreeProvider>,
  <ExampleCanvas />,
];


const registerProduct = (routes: Route[]) => addRouters('/products', routes, productComponents);

function App() {
  return (
    <div className="App">
      <Router routes={productionRegister(registerProduct(routes))} location={location}>
        <div className='flex z-0'>
          <nav className="w-80 flex-none z-10 bg-white sticky left-0 top-0">
            <Navigation className='px-4 py-2 sticky' />
          </nav>

          <div className='w-full min-h-screen'>
            <Outlet />
          </div>
        </div>
      </Router>

    </div >
  );
}

export default App;
