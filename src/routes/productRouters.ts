import { Route } from '@tanstack/react-location';
import { createElement, FC } from 'react';
import Pendding from '../pages/Pendding';

const provide = async (component: FC) => {
    const provider = await import('../components/ThreeContext');
    const a = await component;
    return createElement(provider.ThreeProvider, {}, createElement(a));
};

const productRouter = [
    () => import('../pages/products/TransitionPointsController').then((value) => provide(value.TransitionPointsController)),
    () => import('../pages/products/Earth').then(props => provide(props.Earth)),
    () => import('../pages/products/MatrixMovie').then(props => createElement(props.MatrixMovie)),
    () => import('../pages/products/SquareFly').then(res => provide(res.SquareFly)),
    () => import('../pages/products/Buble').then(res => provide(res.Buble)),
    () => import('../pages/products/Buble2').then(res => provide(res.Buble2)),
    () => import('../pages/products/OutMaterial').then(res => provide(res.OutMaterial)),
    () => import('../pages/products/Shader1').then(res => provide(res.Shader1)),
    () => import('../pages/products/Shader2').then(res => provide(res.Shader2)),
    () => import('../temp/ExampleCanvas').then(props => createElement(props.ExampleCanvas)),
];

export const addProductRouters = (path: string, router: Route[]): Route[] => {
    const routes = productRouter.map((Component, index) => {
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
            pendingElement: createElement(Pendding),
        },
    ];
};