import React, { useContext } from'react';
import { AppBar, Avatar, Box, Button, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { Link as RRLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Button component={RRLink} to="/" color="inherit">Skyward Sword Randomizer</Button>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button component={RRLink} to="/builds" color="inherit">Builds</Button>
                    <Button component={RRLink} to="/asyncs" color="inherit">Asyncs</Button>
                    {/* <Button component={RRLink} to="/rules" color="inherit">Rules</Button> */}
                    <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://tracker.ssrando.com">Tracker</Link></Button>
                    <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://devtracker.ssrando.com">Dev Tracker</Link></Button>
                    <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://discord.ssrando.com">Discord</Link></Button>
                    <UserMenu />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const UserMenu = () => {
    const { state, update } = useContext(UserContext);
    const { loggedIn, user } = state;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const logout = async () => {
        const logoutData = await fetch('/api/logout');
        if (logoutData.ok) {
            update({ loggedIn: false, user: undefined })
        } else {
            if (logoutData.status === 401) {
                // if we get a 401 it means we encounted a stale session or stale client data
                // this could happen for a few reasons, but in this case it has no negtive consequence
                // application state, so we can safely update client state to be in sync with server state
                update({ loggedIn: false, user: undefined })
            } else {
                console.log('error');
            }
        }
        closeUserMenu();
        navigate('/');
    }
    
    const closeUserMenu = () => {
        setAnchorElUser(null);
    };

    if (loggedIn) {
        if (!user) return ( <div />);
        return (
            <>
                <Tooltip title="Open settings">
                    <Button style={{ color: 'white' }} sx={{ flexGrow: 0}} onClick={handleOpenUserMenu}>
                        {user.username}
                        <Avatar alt={user.username} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} />
                    </Button>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={closeUserMenu}
                >
                    <MenuItem onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </>
        )
    }
    return (
        <Button component={RRLink} to="/login" color="inherit">Log In</Button>
    )
}

export default Header;