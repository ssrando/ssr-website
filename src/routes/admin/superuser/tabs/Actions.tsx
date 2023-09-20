import { Error } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

const Actions = () => {
    const clearSessions = () => {
        // TODO clear session
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
            <Button onClick={clearSessions}>Clear All Sessions</Button>
        </>
    );
};

export default Actions;
