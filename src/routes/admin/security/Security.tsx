import {
    Avatar,
    Button,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {
    Add,
    Delete,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from '@mui/icons-material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';
import { useGetApi } from '../../../controller/Hooks';
import {
    DiscordRole,
    DiscordRoleWithGuild,
    SecurityPoint,
    SecurityRole,
} from '../../../ApiTypes';
import {
    changePointEnabled,
    changeRoleEnabled,
    createRole,
    deleteRole,
    updateDiscordRole,
} from '../../../controller/Security';
import InlineAvatar from '../../../components/InlineAvatar';

type SecurityRoleListRowProps = {
    role: SecurityRole;
    mutate: KeyedMutator<SecurityRole[]>;
    roles?: DiscordRole[];
    mutateRoles: KeyedMutator<DiscordRoleWithGuild[]>;
};

const SecurityRoleListRow = ({
    role,
    mutate,
    roles,
    mutateRoles,
}: SecurityRoleListRowProps) => {
    const [expanded, setExpanded] = useState(false);

    const changeEnabled = () => {
        changeRoleEnabled(role.id, !role.enabled);
        mutate();
    };

    const deleteSecurity = () => {
        deleteRole(role.id);
        mutateRoles();
        mutate();
    };

    const changeRole = (event: SelectChangeEvent) => {
        updateDiscordRole(role.id, event.target.value);
        mutate();
        mutateRoles();
    };

    const togglePoint = (point: SecurityPoint) => {
        changePointEnabled(point.id, !point.enabled);
        mutate();
    };

    const showRoleSelect = expanded && roles;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {showRoleSelect && (
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select value={role.role.id} onChange={changeRole}>
                                <MenuItem value={role.role.id}>
                                    {role.role.name}
                                </MenuItem>
                                {roles.map((selectRole) => (
                                    <MenuItem
                                        value={selectRole.id}
                                        key={selectRole.id}
                                    >
                                        {selectRole.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {!showRoleSelect && (
                        <Typography>{role.role.name}</Typography>
                    )}
                </TableCell>
                <TableCell>
                    <Switch checked={role.enabled} onChange={changeEnabled} />
                </TableCell>
                <TableCell>
                    <IconButton onClick={deleteSecurity}>
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                    colSpan={4}
                >
                    <Collapse in={expanded} timeout="auto">
                        <Table size="small">
                            <TableBody
                                sx={{
                                    'tr:last-child > *': {
                                        borderBottom: 'unset',
                                    },
                                }}
                            >
                                {role.points.map((point) => (
                                    <TableRow key={point.id}>
                                        <TableCell>
                                            {point.permission}
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={point.enabled}
                                                onChange={() =>
                                                    togglePoint(point)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const Security = () => {
    const { data, error, mutate } = useGetApi<SecurityRole[]>('/api/security');
    const {
        data: roles,
        error: rolesError,
        mutate: mutateRoles,
    } = useGetApi<DiscordRoleWithGuild[]>('/api/security/roles');
    const [newRole, setNewRole] = useState(0);

    if (error) {
        return <Typography>An error occurred.</Typography>;
    }

    if (!data) {
        return (
            <Typography>
                This server does not have security management configured or
                enabled. Reach out to your system administrator.
            </Typography>
        );
    }

    if (rolesError) {
        toast.error('Error occurred while loading available roles.');
    }

    if (!roles) {
        toast.error('No roles loaded.');
    }

    const create = () => {
        createRole(roles[newRole].id);
        mutate();
        mutateRoles();
    };

    const changeNewRole = (event: SelectChangeEvent<number>) => {
        setNewRole(event.target.value as number);
    };

    const showAdd = roles && roles.length > 0 && !rolesError;

    return (
        <>
            <Typography variant="h4">Security Management</Typography>
            <TableContainer
                sx={{
                    width: 'max-content',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    pt: '1em',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Role</TableCell>
                            <TableCell>Enabled</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((role) => (
                            <SecurityRoleListRow
                                role={role}
                                mutate={mutate}
                                roles={roles}
                                mutateRoles={mutateRoles}
                                key={role.id}
                            />
                        ))}
                        {showAdd && (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <FormControl fullWidth>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={newRole}
                                            onChange={changeNewRole}
                                            renderValue={(value) => (
                                                <InlineAvatar
                                                    src={`https://cdn.discordapp.com/icons/${roles[value].guildId}/${roles[value].guildIcon}.png`}
                                                    alt={roles[value].guildName}
                                                    caption={roles[value].name}
                                                    fullSize
                                                />
                                            )}
                                        >
                                            {roles.map((selectRole, index) => (
                                                <MenuItem
                                                    value={index}
                                                    key={selectRole.guildName}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={`https://cdn.discordapp.com/icons/${selectRole.guildId}/${selectRole.guildIcon}.png`}
                                                            alt={
                                                                selectRole.guildName
                                                            }
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        sx={{
                                                            color: `#${selectRole.color.toString(
                                                                16,
                                                            )}`,
                                                        }}
                                                    >
                                                        {selectRole.name}
                                                    </ListItemText>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <Button
                                        onClick={create}
                                        startIcon={<Add />}
                                    >
                                        Add Role
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Security;
