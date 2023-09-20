import { Add, Delete } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const DiscordServers = () => {
    const [adding, setAdding] = useState(false);
    const servers = [
        'Skyward Sword Randomizer',
        'Skyward Sword Randomizer Racing',
    ];

    const removeServer = (server: string) => {
        // TODO disconnect server
    };

    const addServer = () => {
        // TODO get valid server list from web server
        setAdding(true);
    };

    const confirmAdd = () => {
        // TODO add server to configuration on web server
        setAdding(false);
    };
    return (
        <>
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
                        {servers.map((server) => (
                            <TableRow key={server}>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>{server}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => removeServer(server)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>
                                {!adding && (
                                    <Button
                                        startIcon={<Add />}
                                        onClick={addServer}
                                    >
                                        Connect New Server
                                    </Button>
                                )}
                                {adding && (
                                    <Box sx={{ display: 'flex' }}>
                                        <FormControl>
                                            <InputLabel id="server-select-label">
                                                Server
                                            </InputLabel>
                                            <Select
                                                labelId="server-select-label"
                                                label="Server"
                                            >
                                                {servers.map((server) => (
                                                    <MenuItem>
                                                        {server}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Button onClick={confirmAdd}>
                                            Confirm
                                        </Button>
                                    </Box>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DiscordServers;
