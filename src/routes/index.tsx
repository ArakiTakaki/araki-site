import React from 'react';
import { Route, ReactLocation, Link } from '@tanstack/react-location';

const Index = () => {
  return (
    <div>
      <h1>作品置き場</h1>

      <h2>3D系</h2>
      <p><Link to="/products/1">秩序を持つ玉</Link></p>
      <p><Link to="/products/2">込み上げる息吹</Link></p>

      <h2>2D系</h2>
      <p>準備中</p>
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
