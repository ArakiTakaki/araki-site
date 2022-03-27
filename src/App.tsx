import React, { ReactNode } from 'react';
import { Outlet, Router, Route } from '@tanstack/react-location';
import { ThreeProvider } from './components/ThreeContext';
import { routes, location } from './routes';
import { TransitionPointsController } from './components/controller/TransitionPointsController';
import { Earth } from './components/controller/Earth';
import { MatrixMovie } from './components/controller/MatrixMovie';
import { SquareFly } from './components/controller/SquareFly';
import { Buble } from './components/controller/Buble';

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
];

  
const registerProduct = (routes: Route[]) => addRouters('/products', routes, productComponents);

function App() {
  return (
    <div className="App">
      <Router routes={productionRegister(registerProduct(routes))} location={location}>
        <Outlet />
      </Router>
    </div>
  );
}

export default App;
