import React from 'react';
import { Route, ReactLocation, Link } from '@tanstack/react-location';

const Index = () => {
  return (
    <div>
      hoge
    </div>
  )
}

export const location = new ReactLocation();
export const routes: Route[] = [
  {
    path: '/',
    element: <Index />
  },
];
