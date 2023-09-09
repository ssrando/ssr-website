import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Button,
    Divider,
    FormControlLabel,
    FormGroup,
    ListSubheader,
    Menu,
    MenuItem,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
    bindMenu,
    bindTrigger,
    usePopupState,
} from 'material-ui-popup-state/hooks';
import { UserContext } from '../../contexts/UserContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { loadServerHeaderData } from './HeaderData';

const adminMenu = [
    { name: 'Security', path: '/admin/security' },
    { name: 'Dynamic Data', path: '/admin/dynamicdata' },
    { name: 'Files', path: '/admin/files' },
];

const UserMenu = () => {
    const { state, update } = useContext(UserContext);
    const { loggedIn, user } = state;

    const { theme, toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const menuState = usePopupState({
        variant: 'popover',
        popupId: 'userMenu',
    });

    const adminMenuItems = adminMenu.map((item) => ({
        name: item.name,
        onClick: () => navigate(item.path),
    }));

    const logout = async () => {
        const logoutData = await fetch('/api/logout');
        if (logoutData.ok) {
            update({ loggedIn: false, user: undefined });
        } else if (logoutData.status === 401) {
            // if we get a 401 it means we encountered a stale session or stale client data
            // this could happen for a few reasons, but in all cases it has no neagtive consequence on
            // application state, so we can safely update client state to be in sync with server state
            update({ loggedIn: false, user: undefined });
        } else {
            toast.error(
                'Unable to process your logout request due to an error. Please refresh the page, and if you are still logged in, try again later.',
            );
        }
        menuState.close();
        loadServerHeaderData();
        navigate('/');
    };

    if (loggedIn) {
        if (!user) return <div />;
        return (
            <>
                <Tooltip title="Open user menu">
                    <Button
                        style={{ color: 'white' }}
                        sx={{ flexGrow: 0 }}
                        {...bindTrigger(menuState)}
                    >
                        {user.displayName}
                        <Avatar
                            alt={user.username}
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                        />
                    </Button>
                </Tooltip>
                <Menu
                    {...bindMenu(menuState)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {user.isAdmin && (
                        <div>
                            <ListSubheader>Admin</ListSubheader>
                            {adminMenuItems.map((item) => (
                                <MenuItem
                                    key={item.name}
                                    onClick={item.onClick}
                                >
                                    <Typography>{item.name}</Typography>
                                </MenuItem>
                            ))}
                            <Divider />
                        </div>
                    )}
                    <MenuItem>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={toggleTheme}
                                        checked={theme.palette.mode === 'dark'}
                                    />
                                }
                                label="Dark Mode"
                            />
                        </FormGroup>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </>
        );
    }
    return (
        <Button
            component={Link}
            to={`/login?target=${window.location.href}`}
            color="inherit"
        >
            Log In
        </Button>
    );
};

export default UserMenu;
