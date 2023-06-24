import { Box, Typography } from '@mui/material';

const PlayDolphin = () => (
    <Box>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Playing the randomized game on a Dolphin requires the following:
            <Box
                sx={{
                    textAlign: 'left',
                }}
            >
                <ul>
                    <li>
                        The{' '}
                        <a href="https://dolphin-emu.org">Dolphin emulator</a>.
                        <ul>
                            <li>
                                It is recommended that you use the latest beta
                                version, and not the stable version as it is
                                very old.
                            </li>
                        </ul>
                    </li>
                    <li>
                        A controller to play with. It is recommnded that you use
                        a Wii Remote and Nunchuck to play, however mapping
                        controls to a standard controller{' '}
                        <a href="https://youtu.be/7Dp7AVJRQJk">is possible</a>.
                    </li>
                    <ul>
                        <li>
                            If you plan to use a Wii Remote and Nunchuck, your
                            computer must have Bluetooth capabilities, and you
                            will still need the sensor bar from a Wii console
                            (it can remain connected to the console, but the
                            console must be powered on). If you cannot
                            accomplish both of these, you can purchase a Dolphin
                            Bar which can accomplish one or both.
                        </li>
                    </ul>
                </ul>
            </Box>
            and can be accomplished with the following steps:
            <Box sx={{ textAlign: 'left' }}>
                <ol>
                    <li>
                        Generate a randomized game. You can have the outputted
                        file anywhere. [SOUE01]&quot;
                    </li>
                    <li>
                        Launch the generated file. This can be done in multiple
                        ways:
                    </li>
                    <ul>
                        <li>
                            Select &quot;Open&quot; from the toolbar. Navigate
                            to where you generated the file and double click to
                            launch.
                        </li>
                        <li>
                            Drag and drop the generated file into the Dolphin
                            window
                        </li>
                    </ul>
                    <li>Have fun and enjoy your seed!</li>
                </ol>
            </Box>
        </Typography>
    </Box>
);

export default PlayDolphin;
