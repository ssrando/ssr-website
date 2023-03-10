import React from'react';
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material"
import { Link as RRLink } from 'react-router-dom';

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
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;