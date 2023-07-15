import { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RRLink } from 'react-router-dom';
import HeaderMenu from '../desktop/HeaderMenu';
import { communityMenu, resourcesMenu } from '../HeaderData';
import UserMenu from '../UserMenu';
import logo from '../icon.ico';

const MobileMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <Typography
                variant="h6"
                component="div"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <img src={logo} alt="icon" height={32} />
                <Button component={RRLink} to="/" color="inherit">
                    Skyward Sword Randomizer
                </Button>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
                size="large"
                aria-label="app menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <MenuItem>
                    <Button component={RRLink} to="/builds" color="inherit">
                        Downloads
                    </Button>
                </MenuItem>
                <MenuItem>
                    <HeaderMenu
                        menuText="Resources"
                        items={resourcesMenu}
                        to="/resources"
                    />
                </MenuItem>
                <MenuItem>
                    <HeaderMenu
                        menuText="Community"
                        items={communityMenu}
                        to="/community"
                    />
                </MenuItem>
                <MenuItem>
                    <Button color="inherit">
                        <Link
                            color="inherit"
                            underline="none"
                            href="https://discord.ssrando.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Discord
                        </Link>
                    </Button>
                </MenuItem>
                <MenuItem>
                    <UserMenu />
                </MenuItem>
            </Menu>
        </>
    );
};

export default MobileMenu;
