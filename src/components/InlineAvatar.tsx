import { Avatar, Box, Typography } from '@mui/material';

type InlineAvatarProps = {
    src: string;
    alt: string;
    caption: string;
    fullSize?: boolean;
};

const InlineAvatar = ({ src, alt, caption, fullSize }: InlineAvatarProps) => {
    const styles = fullSize ? {} : { width: '24px', height: '24px' };
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Avatar sx={styles} src={src} alt={alt} />
            <Typography sx={{ pl: '0.5em' }} variant="body2">
                {caption}
            </Typography>
        </Box>
    );
};

export default InlineAvatar;
