import { Menu, MenuItem, Typography } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
    bindHover,
    bindMenu,
    usePopupState,
} from 'material-ui-popup-state/hooks';
import { Link } from 'react-router-dom';
import LinkButton from '../../LinkButton';

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

const Submenu = ({
    menuText,
    items,
    to,
    external = false,
}: HeaderMenuProps) => {
    const menu = usePopupState({
        variant: 'popover',
        popupId: `menu-${menuText}-${to}-${items.length}`,
    });

    return (
        <MenuItem {...bindHover(menu)}>
            {to && (
                <Link
                    to={to}
                    target={external ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    {menuText}
                </Link>
            )}
            {!to && <Typography color="inherit">{menuText}</Typography>}
            <HoverMenu
                {...bindMenu(menu)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
            >
                {items.map((item) => {
                    if (item.subitems) {
                        return (
                            <Submenu
                                menuText={item.itemText}
                                items={item.subitems}
                                to={item.to}
                                external={item.external}
                                key={item.itemText + item.to}
                            />
                        );
                    }
                    return (
                        <MenuItem key={item.itemText + item.to}>
                            <Link
                                to={item.to}
                                target={external ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                color="inherit"
                            >
                                {item.itemText}
                            </Link>
                        </MenuItem>
                    );
                })}
            </HoverMenu>
        </MenuItem>
    );
};

const HeaderMenu = ({ menuText, items, to, external }: HeaderMenuProps) => {
    const menu = usePopupState({
        variant: 'popover',
        popupId: `menu-${menuText}-${to}-${items.length}`,
    });
    const menuContents = items.map((item) => {
        if (item.subitems) {
            return (
                <Submenu
                    menuText={item.itemText}
                    items={item.subitems}
                    to={item.to}
                    external={item.external}
                    key={item.itemText + item.to}
                />
            );
        }
        return (
            <MenuItem key={item.itemText + item.to}>
                <Link
                    to={item.to}
                    target={item.external ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    {item.itemText}
                </Link>
            </MenuItem>
        );
    });
    return (
        <>
            {to && (
                <LinkButton
                    to={to}
                    target={external ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    {...bindHover(menu)}
                >
                    {menuText}
                </LinkButton>
            )}
            {!to && <Typography color="inherit">{menuText}</Typography>}
            <HoverMenu
                {...bindMenu(menu)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                sx={{ display: { sm: 'none', md: 'flex' } }}
            >
                {menuContents}
            </HoverMenu>
            <Menu
                {...bindMenu(menu)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                sx={{ display: { sm: 'flex', md: 'none' } }}
            >
                {menuContents}
            </Menu>
        </>
    );
};

export default HeaderMenu;
