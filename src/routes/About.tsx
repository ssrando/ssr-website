import { Box, Typography } from '@mui/material';

const randoDevs = [
    'lepelog',
    'cjs07',
    'CovenEsme',
    'Muzugalium',
    'YourAverageLink',
    'peppernicus',
    'azer67',
    'NULL',
];

const About = () => (
    <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Website Development</Typography>
        <Typography>cjs07</Typography>
        <Typography sx={{ pt: '2em', pb: '2em' }}>
            Powered by CommunityGateway
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>Rando Developers</Typography>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            }}
        >
            {randoDevs.map((dev) => (
                <Typography>{dev}</Typography>
            ))}
        </Box>
    </Box>
);

export default About;
