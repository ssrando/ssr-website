import { Box, Typography } from '@mui/material';

const PlayWii = () => (
    <Box>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Playing the randomized game on a Wii console requires the following:
            <Box sx={{ textAlign: 'left', paddingLeft: { md: '40%' } }}>
                <ul>
                    <li>A homebrewed Wii console</li>
                    <li>A USB drive or SD Card</li>
                    <li>A USB or SD card loader app</li>
                </ul>
            </Box>
            and can be accomplished with the following steps:
            <Box sx={{ textAlign: 'left' }}>
                <ol>
                    <li>
                        Generate a randomized game. You can output the file
                        directly to your USB drive or SD Card, or manually copy
                        it over after generation. Depending on your loader of
                        choice, you may need to place the file in a specific
                        folder. For example, for USB loader GX, the randomized
                        game file needs to be in a folder with the path
                        &quot;wbfs/The Legend of Zelda Skyward Sword
                        [SOUE01]&quot;
                    </li>
                    <li>
                        Connect the device to your console.. Note that the USB
                        ports on the back of the Wii are notoriously finnicky -
                        ensure that you are using the correct port. It should be
                        the outside/leftmost port on a vertical Wii, and the
                        lower port on a horizontal Wii.
                    </li>
                    <li>Navigate to your loader app.</li>
                    <li>Launch the randomized game.</li>
                    <li>Have fun and enjoy your seed!</li>
                </ol>
            </Box>
        </Typography>
    </Box>
);

export default PlayWii;
