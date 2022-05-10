import { NavigationItem } from "./interfaces";

export const NAVIGATION: NavigationItem[] = [
    { name: 'item', path: ['/'], text: 'TOP', icon: 'HOME', colorClass: 'fill-secondary-content' },
    { name: 'item', path: ['about'], text: 'ABOUT', icon: 'INFORMATION', colorClass: 'fill-secondary-content' },
    { name: 'item', path: ['todo'], text: 'TODO', icon: 'CHECK', colorClass: 'stroke-secondary-content'  },
    { name: 'divider' },
    { name: 'header', text: '3D' },
    { name: 'item', path: ['products', '1'], text: '秩序を持つ玉' },
    { name: 'item', path: ['products', '2'], text: '込み上げる息吹' },
    { name: 'item', path: ['products', '4'], text: '飛翔する三角' },
    { name: 'item', path: ['products', '8'], text: 'ノイズ(未動作)' },
    { name: 'item', path: ['products', '9'], text: '蠢く球体' },
    { name: 'divider' },
    { name: 'header', text: '2D' },
    { name: 'item', path: ['products', '3'], text: 'マトリックス風' },
    { name: 'item', path: ['products', '5'], text: '蠢く文様(未動作)' },
    { name: 'item', path: ['products', '6'], text: '線の連続(未動作)' },
    { name: 'item', path: ['products', '10'], text: '反応拡散方程式' },
];
