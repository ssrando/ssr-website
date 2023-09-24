import { Error } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearSessions } from '../../../../controller/Superuser';
import { UserContext } from '../../../../contexts/UserContext';

const Actions = () => {
    const { update } = useContext(UserContext);
    const navigate = useNavigate();

    const doClearSessions = async () => {
        const result = await clearSessions();
        if (result.success) {
            update({ loggedIn: false, user: undefined });
            navigate('/');
        } else {
            toast.error(`Failed to clear sessions - ${result.error}`);
        }
    };
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: 'error.secondary',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Error sx={{ color: 'error.main' }} fontSize="medium" />
                <Typography sx={{ color: 'error.main' }}>
                    These actions are dangerous, global, and often irreversible.
                    Proceed with caution.
                </Typography>
            </Box>
            <Button onClick={doClearSessions}>Clear All Sessions</Button>
        </>
    );
};

export default Actions;
