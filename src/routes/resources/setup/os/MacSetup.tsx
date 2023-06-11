import { Box, Typography } from '@mui/material';
import SourceSetup from '../install/SourceSetup';

const MacSetup = () => (
    <Box>
        <Typography variant="body2">
            Mac OS is not an officially supported platform and there are no
            builds available. It is possible to run from source, however the
            program is generally not tested on Mac and things may not work
            properly.
        </Typography>
        <SourceSetup />
    </Box>
);

export default MacSetup;
