import { Box } from '@mui/material';

interface SpoilerBlockProps {
    text: string;
    // eslint-disable-next-line react/require-default-props
    alwaysShow?: boolean;
}

const SpoilerBlock = ({ text, alwaysShow = false }: SpoilerBlockProps) => (
    <Box
        sx={{
            background: (theme) =>
                alwaysShow ? 'inherit' : theme.palette.text.primary,
            '&:hover': { background: 'inherit' },
        }}
    >
        {text}
    </Box>
);

export default SpoilerBlock;
