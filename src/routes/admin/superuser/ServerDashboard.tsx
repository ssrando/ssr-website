import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Avatar,
    Box,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';

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
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
                <Typography>Manage Discord Servers</Typography>
                <TableContainer
                    sx={{
                        width: 'fit-content',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        pb: '1em',
                    }}
                >
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>Skyward Sword Randomizer</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>
                                    Skyward Sword Randomizer Racing
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography>Admins</Typography>
                <TableContainer
                    sx={{
                        width: 'fit-content',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>cjs07</TableCell>
                                <TableCell>superuser</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>alkalineace</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: '24px',
                                                height: '24px',
                                            }}
                                        />{' '}
                                        Role
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>mario_runner</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: '24px',
                                                height: '24px',
                                            }}
                                        />{' '}
                                        Role
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default ServerDashboard;
