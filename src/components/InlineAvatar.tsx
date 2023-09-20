import { Avatar, Box, Typography } from '@mui/material';

type InlineAvatarProps = {
    src: string;
    alt: string;
    caption: string;
};

const InlineAvatar = ({ src, alt, caption }: InlineAvatarProps) => (
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
            src={src}
            alt={alt}
        />
        <Typography sx={{ pl: '0.5em' }} variant="body2">
            {caption}
        </Typography>
    </Box>
);

export default InlineAvatar;
