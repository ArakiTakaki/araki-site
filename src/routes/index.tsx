import React from 'react';
import { Route, ReactLocation } from '@tanstack/react-location';

export const location = new ReactLocation();
export const routes: Route[] = [
  {
    path: '/',
    element: <div>index</div>
  },
];
