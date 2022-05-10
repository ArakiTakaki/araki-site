
interface RoutingComponent {
    name: 'item';
    icon?: string;
    path: string[];
    text: string;
    colorClass?: string;
}

interface DividerComponent {
    name: 'divider';
}

interface HeaderComponent {
    name: 'header';
    text: string;
}

export type NavigationItem = RoutingComponent | DividerComponent | HeaderComponent;