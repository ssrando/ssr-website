import { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RRLink } from 'react-router-dom';
import { fullMenuMobile } from '../HeaderData';
import UserMenu from '../UserMenu';
import logo from '../icon.ico';
import MobileMenuItem from './MobileHeaderMenu';

const MobileMenu = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded((open) => !open);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
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
                    onClick={toggleExpanded}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            {expanded && (
                <>
                    {fullMenuMobile.map((menu) => (
                        <MobileMenuItem
                            menuText={menu.itemText}
                            to={menu.to}
                            items={menu.subitems ?? []}
                            external={menu.external}
                        />
                    ))}
                    <Box sx={{ display: 'flex' }}>
                        <UserMenu />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default MobileMenu;
