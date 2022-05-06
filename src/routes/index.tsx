import React from 'react';
import { Route, ReactLocation, Link } from '@tanstack/react-location';
import Pendding from '../pages/Pendding';
import { productionRegister } from './basePath';
import { addProductRouters } from './productRouters';

const Index = () => {
  return (
    <div>
      hoge
    </div>
  )
}

export const location = new ReactLocation();
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
];


export const routes = productionRegister(addProductRouters('products', prneRouter));