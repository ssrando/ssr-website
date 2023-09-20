import { Avatar, Box, Typography } from '@mui/material';

const InlineAvatar = () => (
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
        />
        <Typography sx={{ pl: '0.5em' }} variant="body2">
            Role
        </Typography>
    </Box>
);

export default InlineAvatar;
