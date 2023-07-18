export type HeaderMenuItem = {
    itemText: string;
    to: string;
    subitems?: HeaderMenuItem[];
    external?: boolean;
};

export interface HeaderMenuProps {
    menuText: string;
    to: string;
    items: HeaderMenuItem[];
    external?: boolean;
}
export const communityMenu: HeaderMenuItem[] = [
    {
        itemText: 'Races',
        to: '/community/races',
        subitems: [
            {
                itemText: 'Asyncs',
                to: '/community/races/asyncs',
            },
        ],
    },
];

export const resourcesMenu: HeaderMenuItem[] = [
    {
        itemText: 'Setup Guide',
        to: '/resources/setup',
    },
    {
        itemText: 'FAQ',
        to: 'resources/faq',
    },
    {
        itemText: 'Trackers',
        to: '',
        subitems: [
            {
                itemText: 'Web Tracker Main Instance',
                to: 'https://tracker.ssrando.com',
                external: true,
            },
            {
                itemText: 'Web Tracker Dev Instance',
                to: 'https://devtracker.ssrando.com',
                external: true,
            },
        ],
    },
];

export const fullMenuMobile: HeaderMenuItem[] = [
    {
        itemText: 'Downloads',
        to: '/builds',
    },
    {
        itemText: 'Community',
        to: '/community',
        subitems: communityMenu,
    },
    {
        itemText: 'Resources',
        to: '/resources',
        subitems: resourcesMenu,
    },
    {
        itemText: 'Discord',
        to: 'https://discord.ssrando.com',
        external: true,
    },
];
