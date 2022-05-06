import React, { ReactNode } from 'react';
import { Outlet, Router, Route, Link } from '@tanstack/react-location';
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
import { getUrl } from './utils/site';

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

            <div className='sticky px-8 py-2 flex top-0 bg-white z-10 items-center'>
              <p className='text-3xl'>SAIHATE</p>
              <p className='text-xs ml-4'>v1.0.0</p>
            </div>

            <ul className='menu px-4'>
              <li className="menu-title">
                <span>3D</span>
              </li>
              <li><Link to={getUrl('products', '1')}>秩序を持つ玉</Link></li>
              <li><Link to={getUrl('products', '2')}>込み上げる息吹</Link></li>
              <li><Link to={getUrl('products', '4')}>飛翔する三角</Link></li>
              <li><Link to={getUrl('products', '8')}>ノイズ</Link></li>
              <li><Link to={getUrl('products', '9')}>蠢く球体</Link></li>
              <li />
              <li className="menu-title">
                <span>2D</span>
              </li>
              <li><Link to={getUrl('products', '3')}>マトリックス風のマテリックス</Link></li>
              <li><Link to={getUrl('products', '5')}>蠢く文様</Link></li>
              <li><Link to={getUrl('products', '6')}>線の連続</Link></li>
              <li><Link to={getUrl('products', '10')}>反応拡散方程式</Link></li>
            </ul>
          </nav>

          <div className='bg-black w-full min-h-screen'>
            <Outlet />
          </div>
        </div>
      </Router>

    </div >
  );
}

export default App;
