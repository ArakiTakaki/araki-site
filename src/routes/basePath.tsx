import { Route } from '@tanstack/react-location';
import { BASE_PATH } from '../constants/basePath';
export const productionRegister = (router: Route[]): Route[] => {
  if (BASE_PATH !== null) {
    return [
      {
        path: BASE_PATH,
        children: router,
      }
    ];
  }
  return router;
}