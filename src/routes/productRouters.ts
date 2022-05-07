import { Route } from '@tanstack/react-location';
import { createElement, FC } from 'react';
import Pendding from '../pages/Pendding';

const provide = async (component: FC) => {
    const provider = await import('../components/ThreeContext');
    const a = await component;
    return createElement(provider.ThreeProvider, {}, createElement(a));
};

const productRouter = [
    () => import('../components/controller/TransitionPointsController').then((value) => provide(value.TransitionPointsController)),
    () => import('../components/controller/Earth').then(props => provide(props.Earth)),
    () => import('../components/controller/MatrixMovie').then(props => createElement(props.MatrixMovie)),
    () => import('../components/controller/SquareFly').then(res => provide(res.SquareFly)),
    () => import('../components/controller/Buble').then(res => provide(res.Buble)),
    () => import('../components/controller/Buble2').then(res => provide(res.Buble2)),
    () => import('../components/controller/OutMaterial').then(res => provide(res.OutMaterial)),
    () => import('../components/controller/Shader1').then(res => provide(res.Shader1)),
    () => import('../components/controller/Shader2').then(res => provide(res.Shader2)),
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