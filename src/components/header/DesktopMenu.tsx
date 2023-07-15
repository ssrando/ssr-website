import { Box, Button, Link, Typography } from '@mui/material';
import { Link as RRLink } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import { communityMenu, resourcesMenu } from './HeaderData';
import UserMenu from './UserMenu';
import logo from './icon.ico';

const DesktopMenu = () => (
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
        <Button component={RRLink} to="/builds" color="inherit">
            Downloads
        </Button>
        <HeaderMenu
            menuText="Resources"
            items={resourcesMenu}
            to="/resources"
        />
        <HeaderMenu
            menuText="Community"
            items={communityMenu}
            to="/community"
        />
        {/* <Button component={RRLink} to="/rules" color="inherit">Rules</Button> */}
        <Button color="inherit">
            <Link
                color="#FFFFFF"
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.ssrando.com"
            >
                Discord
            </Link>
        </Button>
        <UserMenu />
    </>
);

export default DesktopMenu;
