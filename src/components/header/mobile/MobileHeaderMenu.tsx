import { Box, Button, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { HeaderMenuProps } from '../HeaderData';
import LinkButton from '../../LinkButton';

const MobileMenuItem = ({ menuText, items, to, external }: HeaderMenuProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => setExpanded((current) => !current);

    const menuContents = items.map((item) => {
        if (item.subitems) {
            return (
                <Box
                    sx={{ pl: '1em' }}
                    key={`${item.itemText}-${item.to}-submenu-list`}
                >
                    <MobileMenuItem
                        menuText={item.itemText}
                        to={item.to}
                        items={item.subitems}
                        external={item.external}
                    />
                </Box>
            );
        }
        return (
            <Box sx={{ textAlign: 'left', pl: '1em' }}>
                {item.to && (
                    <LinkButton
                        to={item.to}
                        target={item.external ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        sx={{ justifyContent: 'flex-start' }}
                    >
                        {item.itemText}
                    </LinkButton>
                )}
                {!item.to && <Button color="inherit">{item.itemText}</Button>}
            </Box>
        );
    });

    return (
        <Box sx={{}}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {to && (
                    <LinkButton
                        to={to}
                        target={external ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        sx={{ justifyContent: 'flex-start' }}
                    >
                        {menuText}
                    </LinkButton>
                )}
                {!to && <Button color="inherit">{menuText}</Button>}
                {items.length > 0 && (
                    <>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="inherit" onClick={toggleExpansion}>
                            <ExpandMore />
                        </IconButton>
                    </>
                )}
            </Box>
            {expanded && menuContents}
        </Box>
    );
};

export default MobileMenuItem;
