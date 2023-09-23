import { Add, Delete } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    ListItemAvatar,
    ListItemText,
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
import { useGetApi } from '../../../../controller/Hooks';
import { DiscordConnection, UserGuild } from '../../../../ApiTypes';
import { addServer, deleteServer } from '../../../../controller/Superuser';
import InlineAvatar from '../../../../components/InlineAvatar';

const DiscordServers = () => {
    const [adding, setAdding] = useState(false);
    const [toAdd, setToAdd] = useState(0);
    const { data: servers, mutate } = useGetApi<DiscordConnection[]>(
        '/api/superuser/discord/servers',
    );
    const { data: userServers, mutate: mutateServers } = useGetApi<UserGuild[]>(
        '/api/superuser/discord/userServers',
        true,
    );

    // const [userServers, setUserServers] = useState<UserGuild[]>([]);

    // useEffect(() => {
    //     const loadServers = async () => {
    //         const res = await fetch('/api/superuser/discord/userServers');
    //         const vals = await res.json();
    //         setUserServers(vals);
    //     };
    //     loadServers();
    // }, []);

    if (!servers) {
        return <div />;
    }

    let canAdd = true;
    if (!userServers || userServers.length === 0) {
        canAdd = false;
    }

    const removeServer = async (server: string) => {
        await deleteServer(server);
        mutate();
        mutateServers();
    };

    const startAddServer = () => {
        setAdding(true);
    };

    const confirmAdd = async () => {
        await addServer(userServers[toAdd]);
        setAdding(false);
        mutate();
        mutateServers();
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
                            <TableRow key={server.id}>
                                <TableCell>
                                    <Avatar
                                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                                        alt="server icon"
                                    />
                                </TableCell>
                                <TableCell>{server.name}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => removeServer(server.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {canAdd && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    {!adding && (
                                        <Button
                                            startIcon={<Add />}
                                            onClick={startAddServer}
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
                                                    value={toAdd}
                                                    onChange={(event) =>
                                                        setToAdd(
                                                            event.target
                                                                .value as number,
                                                        )
                                                    }
                                                    inputProps={{
                                                        style: {
                                                            display: 'flex',
                                                            background:
                                                                'purple',
                                                        },
                                                    }}
                                                    renderValue={(value) => (
                                                        <InlineAvatar
                                                            src={`https://cdn.discordapp.com/icons/${userServers[value].id}/${userServers[value].icon}.png`}
                                                            alt={
                                                                userServers[
                                                                    value
                                                                ].name
                                                            }
                                                            caption={
                                                                userServers[
                                                                    value
                                                                ].name
                                                            }
                                                            fullSize
                                                        />
                                                    )}
                                                >
                                                    {userServers?.map(
                                                        (server, index) => (
                                                            <MenuItem
                                                                value={index}
                                                                key={server.id}
                                                            >
                                                                <ListItemAvatar>
                                                                    <Avatar
                                                                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                                                                        alt={
                                                                            server.name
                                                                        }
                                                                    />
                                                                </ListItemAvatar>
                                                                <ListItemText>
                                                                    {
                                                                        server.name
                                                                    }
                                                                </ListItemText>
                                                            </MenuItem>
                                                        ),
                                                    )}
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
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DiscordServers;
