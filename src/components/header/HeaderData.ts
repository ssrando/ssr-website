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
        // to: '/community/races',
        to: '',
        subitems: [
            {
                itemText: 'Asyncs',
                to: '/community/races/asyncs',
            },
        ],
    },
];

const guideMenu = [
    {
        itemText: 'Setup Guide',
        to: '/resources/setup',
    },
];

export const resourcesMenu: HeaderMenuItem[] = [
    {
        itemText: 'FAQ',
        to: '/resources/faq',
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

export const fullMenu: HeaderMenuItem[] = [
    {
        itemText: 'Downloads',
        to: '/builds',
    },
    {
        itemText: 'Resources',
        // to: '/resources',
        to: '',
        subitems: resourcesMenu,
    },
    {
        itemText: 'Community',
        // to: '/community',
        to: '',
        subitems: communityMenu,
    },
    {
        itemText: 'Discord',
        to: 'https://discord.ssrando.com',
        external: true,
    },
];

const loadServerHeaderData = async () => {
    const guideFiles: string[] = await (
        await fetch('/api/files/guides')
    ).json();
    guideFiles.forEach((guideFile) =>
        guideMenu.push({
            itemText: guideFile.split('.')[0],
            to: `/resources/guides/${guideFile}`,
        }),
    );
    resourcesMenu.push({ itemText: 'Guides', to: '', subitems: guideMenu });
};
loadServerHeaderData();
