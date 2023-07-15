import { HeaderMenuItem } from './HeaderMenu';

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
