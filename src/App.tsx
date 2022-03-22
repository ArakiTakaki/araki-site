import React, { ReactNode } from 'react';
import { Outlet, Router, Route } from '@tanstack/react-location';
import { ThreeProvider } from './components/ThreeContext';
import { routes, location } from './routes';
import './App.css';
import { TransitionPointsController } from './components/controller/TransitionPointsController';
import { Earth } from './components/controller/Earth';

const addProducts = (path: string, router: Route[], components: ReactNode[]): Route[] => {
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

const productComponents: ReactNode[] = ([
  <TransitionPointsController />,
  <Earth />
]).map((children) => <ThreeProvider>{children}</ThreeProvider>);

function App() {
  return (
    <div className="App">
      <Router routes={addProducts('/products', routes, productComponents)} location={location}>
        <Outlet />
      </Router>
    </div>
  );
}

export default App;
