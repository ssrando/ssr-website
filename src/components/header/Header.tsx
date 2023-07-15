import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import DesktopMenu from './desktop/DesktopMenu';
import MobileMenu from './mobile/MobileMenu';

const Header = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                    <DesktopMenu />
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                    <MobileMenu />
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
);

export default Header;
