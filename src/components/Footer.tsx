import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class Footer extends React.Component {
    render() {
        return (
            <>
                <AppBar
                    position="fixed"
                    color="primary"
                    sx={{ top: 'auto', bottom: 0 }}
                >
                    <Toolbar sx={{ flexDirection: 'column' }}>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="h6">
                            Skyward Sword Randomizer
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton
                                href="https://github.com/ssrando/ssrando"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </IconButton>
                            <IconButton
                                href="https://discord.ssrando.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faDiscord} />
                            </IconButton>

                            <Link to="/about" style={{ color: 'inherit' }}>
                                <IconButton>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </IconButton>
                            </Link>
                        </Box>
                        <Typography variant="caption">
                            In-game imagery and system logos Copyright ©
                            Nintendo, 2011-2023 - The Skyward Sword Randomizer
                            community does <b>not</b> share copyrighted material
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </>
        );
    }
}

export default Footer;
