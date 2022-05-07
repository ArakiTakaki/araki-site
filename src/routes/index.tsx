import React from 'react';
import { Route, ReactLocation, Link, createHashHistory } from '@tanstack/react-location';
import Pendding from '../pages/Pendding';
import { addProductRouters } from './productRouters';

const Index = () => {
  return (
    <div>
      hoge
    </div>
  )
}

const hashHistory = createHashHistory();
export const location = new ReactLocation({
  history: hashHistory,
});
const prneRouter: Route[] = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/about',
    element: async () => import('../pages/Abouts').then(res => <res.default />),
    pendingElement: <Pendding />
  },
  {
    path: '/todo',
    element: async () => import('../pages/Todo').then(res => <res.default />),
    pendingElement: <Pendding />
  },
];

export const routes = addProductRouters('products', prneRouter);