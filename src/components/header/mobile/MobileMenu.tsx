import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { fullMenu } from '../HeaderData';
import UserMenu from '../UserMenu';
import logo from '../icon.ico';
import MobileMenuItem from './MobileHeaderMenu';
import LinkButton from '../../LinkButton';

const MobileMenu = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded((open) => !open);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <LinkButton to="/">
                    <img src={logo} alt="icon" height={32} />
                    <Box sx={{ pl: '0.8em' }}>Skyward Sword Randomizer</Box>
                </LinkButton>
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
                    {fullMenu.map((menu) => (
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
