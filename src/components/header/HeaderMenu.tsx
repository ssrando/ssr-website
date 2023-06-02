import { MenuItem } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
    bindHover,
    bindMenu,
    usePopupState,
} from 'material-ui-popup-state/hooks';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton';

type HeaderMenuItem = {
    itemText: string;
    to: string;
    subitems?: HeaderMenuItem[];
};

interface HeaderMenuProps {
    menuText: string;
    to: string;
    items: HeaderMenuItem[];
}

const Submenu = ({ menuText, items, to }: HeaderMenuProps) => {
    const menu = usePopupState({
        variant: 'popover',
        popupId: `menu-${menuText}-${to}-${items.length}`,
    });

    return (
        <MenuItem {...bindHover(menu)}>
            <Link to={to} color="inherit">
                {menuText}
            </Link>
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
                            />
                        );
                    }
                    return (
                        <MenuItem>
                            <Link to={item.to} color="inherit">
                                {item.itemText}
                            </Link>
                        </MenuItem>
                    );
                })}
            </HoverMenu>
        </MenuItem>
    );
};

const HeaderMenu = ({ menuText, items, to }: HeaderMenuProps) => {
    const menu = usePopupState({
        variant: 'popover',
        popupId: `menu-${menuText}-${to}-${items.length}`,
    });
    return (
        <>
            <LinkButton to={to} {...bindHover(menu)}>
                {menuText}
            </LinkButton>
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
            >
                {items.map((item) => {
                    if (item.subitems) {
                        return (
                            <Submenu
                                menuText={item.itemText}
                                items={item.subitems}
                                to={item.to}
                            />
                        );
                    }
                    return (
                        <MenuItem>
                            <Link to={item.to} color="inherit">
                                {item.itemText}
                            </Link>
                        </MenuItem>
                    );
                })}
            </HoverMenu>
        </>
    );
};

export default HeaderMenu;
