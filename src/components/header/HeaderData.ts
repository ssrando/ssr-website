import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { File } from '../../ApiTypes';

export type HeaderMenuItem = {
    itemText: string;
    to: string;
    subitems?: HeaderMenuItem[];
    external?: boolean;
    icon?: IconProp;
    iconColor?: string;
};

export interface HeaderMenuProps {
    menuText: string;
    to: string;
    items: HeaderMenuItem[];
    external?: boolean;
    icon?: IconProp;
    iconColor?: string;
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

const staticGuideMenu: HeaderMenuItem[] = [
    {
        itemText: 'Setup Guide',
        to: '/resources/setup',
    },
];

const guideMenu = [...staticGuideMenu];

export const resourcesMenu: HeaderMenuItem[] = [
    {
        itemText: 'FAQ',
        to: '/resources/faq',
    },
    { itemText: 'Guides', to: '', subitems: guideMenu },
    {
        // itemText: 'Trackers',
        // to: '',
        // subitems: [
        //     {
        //         itemText: 'Web Tracker Main Instance',
        //         to: 'https://tracker.ssrando.com',
        //         external: true,
        //     },
        //     {
        //         itemText: 'Web Tracker Dev Instance',
        //         to: 'https://devtracker.ssrando.com',
        //         external: true,
        //     },
        // ],
        itemText: 'Tracker',
        to: 'https://robojumper.github.io/SS-Randomizer-Tracker/',
        external: true,
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
        to: '',
        subitems: [
            {
                itemText: 'Community Discord',
                to: 'discord.ssrando.com',
                external: true,
            },
            {
                itemText: 'Racing Discord',
                to: 'https://discord.gg/cWE892y8WB',
                external: true,
            },
        ],
        // to: 'https://discord.ssrando.com',
        // external: true,
    },
];

export const loadServerHeaderData = async () => {
    const res = await fetch('/api/files/guides');
    const permissionRes = await fetch('/api/files/permissionCheck');
    const hasEditGrant = permissionRes.ok;
    if (res.ok) {
        guideMenu.splice(0, guideMenu.length);
        guideMenu.push(...staticGuideMenu);
        const guideFiles: File[] = await res.json();
        guideFiles.forEach((guideFile) =>
            guideMenu.push({
                itemText: guideFile.name,
                to: `/resources/guides/${guideFile.id}`,
            }),
        );
        if (hasEditGrant) {
            guideMenu.push({
                itemText: 'New Guide',
                to: 'newFile/guides',
                icon: faAdd,
                iconColor: 'green',
            });
        }
    }
};
loadServerHeaderData();
