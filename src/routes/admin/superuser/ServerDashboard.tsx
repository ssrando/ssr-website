import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import DiscordServers from './tabs/DiscordServers';
import Admins from './tabs/Admins';

const ServerDashboard = () => {
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Typography sx={{ pb: '1em' }} variant="h4">
                Server Dashboard
            </Typography>
            <Box>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleTabChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Discord Servers" value="1" />
                            <Tab label="Admins" value="2" />
                            <Tab label="Users" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <DiscordServers />
                    </TabPanel>
                    <TabPanel value="2">
                        <Admins />
                    </TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default ServerDashboard;
