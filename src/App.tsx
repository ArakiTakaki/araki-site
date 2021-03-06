import { Outlet, Router } from '@tanstack/react-location';
import { routes, location } from './routes';
import { Navigation } from './components/common/Navigation';
import { DefaultLayout } from './layout/DefaultLayout';

function App() {
  return (
    <Router routes={routes} location={location}>
      <DefaultLayout.Provider 
        navigation={(
          <DefaultLayout.Navigation>
            <Navigation />
          </DefaultLayout.Navigation>
        )}
        content={
          <DefaultLayout.Content>
            <Outlet />
          </DefaultLayout.Content>
        }
      />
    </Router>
  );
}

export default App;
