import { Box, Typography } from '@mui/material';
import SourceSetup from '../install/SourceSetup';

const OtherSetup = () => (
    <Box>
        <Typography variant="body2">
            OSes other than Windows, Mac, and Linux are not regularly used nor
            regularly tested with. Compatability with other OSes is not
            guaranteed. However, if you can install Python 3 on your OS, you
            will likely be able to run from source.
        </Typography>
        <SourceSetup />
    </Box>
);

export default OtherSetup;
