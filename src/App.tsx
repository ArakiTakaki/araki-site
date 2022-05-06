import React from 'react';
import { Outlet, Router } from '@tanstack/react-location';
import { routes, location } from './routes';
import { Navigation } from './components/common/Navigation';

function App() {
  return (
    <div className="App">
      <Router routes={routes} location={location}>
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
