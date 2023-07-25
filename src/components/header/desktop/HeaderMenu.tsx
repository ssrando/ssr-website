import { Button, MenuItem, Typography, styled } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
    bindHover,
    bindMenu,
    usePopupState,
} from 'material-ui-popup-state/hooks';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import LinkButton from '../../LinkButton';
import { HeaderMenuProps } from '../HeaderData';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
}));

const Submenu = ({ menuText, items, to, external }: HeaderMenuProps) => {
    const menu = usePopupState({
        variant: 'popover',
        popupId: `menu-${menuText}-${to}-${items.length}`,
    });

    const menuComponent = (
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
                    <MenuItem
                        key={item.itemText + item.to}
                        component={Link}
                        to={item.to}
                        target={item.external ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                    >
                        {item.itemText}
                    </MenuItem>
                );
            })}
        </HoverMenu>
    );

    return (
        <>
            {to && (
                <MenuItem
                    {...bindHover(menu)}
                    component={Link}
                    to={to}
                    target={external ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    {menuText}
                    <ArrowRight fontSize="small" />
                    {items.length > 0 && menuComponent}
                </MenuItem>
            )}
            {!to && (
                <MenuItem {...bindHover(menu)}>
                    <Typography
                        color="inherit"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {menuText}
                        <ArrowRight fontSize="small" />
                    </Typography>
                    {items.length > 0 && menuComponent}
                </MenuItem>
            )}
        </>
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
            <MenuItem
                key={item.itemText + item.to}
                to={item.to}
                component={Link}
                target={external ? '_blank' : '_self'}
                rel="noopener noreferrer"
            >
                {item.itemText}
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
            {!to && (
                <Button color="inherit" {...bindHover(menu)}>
                    {menuText}
                </Button>
            )}
            {items.length > 0 && (
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
            )}
        </>
    );
};

export default HeaderMenu;
