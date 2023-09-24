import { Add, Delete, Edit } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
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
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useGetApi } from '../../../../controller/Hooks';
import {
    DiscordConnection,
    DiscordRole,
    UserGuild,
} from '../../../../ApiTypes';
import {
    addServer,
    deleteServer,
    setAdminRole,
} from '../../../../controller/Superuser';
import InlineAvatar from '../../../../components/InlineAvatar';

type AdminRoleSelectProps = {
    server: string;
    current?: number;
    done: () => void;
};

const AdminRoleSelect = ({ server, current, done }: AdminRoleSelectProps) => {
    const [selected, setSelected] = useState(current ?? 0);
    const { data: roles } = useGetApi<DiscordRole[]>(
        `/api/superuser/admins/roles/${server}`,
    );
    if (!roles) {
        return <div />;
    }

    const setRole = async () => {
        await setAdminRole(server, roles[selected].id);
        done();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl>
                <InputLabel id={`role-select-label-${server}`}>Role</InputLabel>
                <Select
                    labelId={`role-select-label-${server}`}
                    label="Role"
                    value={selected}
                    onChange={(event) =>
                        setSelected(event.target.value as number)
                    }
                >
                    {roles.map((role, index) => (
                        <MenuItem value={index} key={role.id}>
                            <ListItemText sx={{ color: role.color }}>
                                {role.name}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={setRole}>Confirm</Button>
        </Box>
    );
};

type ServerRowProps = {
    server: DiscordConnection;
    mutate: KeyedMutator<DiscordConnection[]>;
    mutateServers: KeyedMutator<UserGuild[]>;
};

const ServerRow = ({ server, mutate, mutateServers }: ServerRowProps) => {
    const [editingRole, setEditingRole] = useState(false);

    const startEditing = () => {
        setEditingRole(true);
    };

    const stopEditing = () => {
        setEditingRole(false);
        mutate();
    };

    const removeServer = async () => {
        await deleteServer(server.id);
        mutate();
        mutateServers();
    };

    const statusChip = () => {
        if (!server.enabled) {
            return <Chip label="Disabled" color="error" />;
        }
        if (!server.botConnected) {
            return <Chip label="Bot Unconnected" color="warning" />;
        }
        return <Chip label="Active" color="success" />;
    };

    return (
        <TableRow>
            <TableCell>
                <Avatar
                    src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                    alt="server icon"
                />
            </TableCell>
            <TableCell>{server.name}</TableCell>
            <TableCell>{statusChip()}</TableCell>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                {server.adminRole && !editingRole && (
                    <Typography
                        sx={{
                            color: `#${server.adminRole.color.toString(16)}`,
                        }}
                    >
                        {server.adminRole.name}
                    </Typography>
                )}
                {!server.adminRole && !editingRole && (
                    <Typography>--</Typography>
                )}
                {editingRole && (
                    <AdminRoleSelect server={server.id} done={stopEditing} />
                )}
                {!editingRole && (
                    <IconButton onClick={startEditing}>
                        <Edit />
                    </IconButton>
                )}
            </TableCell>
            <TableCell>
                <IconButton size="small" onClick={removeServer}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

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

    if (!servers) {
        return <div />;
    }

    let canAdd = true;
    if (!userServers || userServers.length === 0) {
        canAdd = false;
    }

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
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Server</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Admin Role</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servers.map((server) => (
                            <ServerRow
                                server={server}
                                mutate={mutate}
                                mutateServers={mutateServers}
                                key={server.id}
                            />
                        ))}
                        {canAdd && (
                            <TableRow>
                                <TableCell colSpan={3} sx={{ border: 'none' }}>
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
