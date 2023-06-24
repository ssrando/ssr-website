import { Box, Typography } from '@mui/material';

const DownloadSetup = () => (
    <Box sx={{ textAlign: 'left' }}>
        <Typography variant="body2" component="ol" sx={{ lineHeight: '1.9em' }}>
            <li>
                Navigate to the <a href="/builds">downloads</a> page and choose
                a version to use.
            </li>
            <ul>
                <li>
                    Stable is the latest official release. It is geenrally
                    considered to be stable, but will often be missing the
                    latest features
                </li>
                <li>
                    Latest has the latest tested and finalized features and
                    changes
                </li>
                <li>
                    Beta Channel has all the latest features, including ones
                    that haven&apos;t been fully tested and finalized yet. It
                    may contain bugs.
                </li>
                <li>
                    Other beta builds are builds containing specific new
                    features, which may or may not be stable. Draft features are
                    generally not considered ready for release, but can still be
                    played with and tested
                </li>
            </ul>
            <li>
                Extract the downloaded zip file. It is recommended that you put
                the files into their own folder.
            </li>
            <li>Launch ssrando.exe</li>
            <li>
                You will be prompted to provide the location of your base game
                file. This must be a clean dump of NTSC-U (North American)
                version 1.0. Other versions and dumps from other regions will
                not work.
            </li>
        </Typography>
    </Box>
);

export default DownloadSetup;
