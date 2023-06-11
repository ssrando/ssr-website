import { Box, Typography } from '@mui/material';
import SourceSetup from '../install/SourceSetup';

const LinuxSetup = () => (
    <>
        <Box>
            <Typography variant="body2">
                Linux is an officially supported platform, however it only
                supports running from source. You are expected to be comfortable
                with the terminal and the specifics of your distro.
            </Typography>
        </Box>
        <SourceSetup />
    </>
);

export default LinuxSetup;
