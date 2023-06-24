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
                        It is also possible to{' '}
                        <a href="https://www.youtube.com/watch?v=vh0XMr_11Mk">
                            use Joycons
                        </a>
                        , though this has been reported to be issue prone for
                        some people.
                    </li>
                    <ul>
                        <li>
                            If you plan to use a Wii Remote and Nunchuck, your
                            computer must have Bluetooth capabilities, and you
                            will still need the sensor bar from a Wii or Wii U
                            console - connect it to the console and power on the
                            console (for Wii U you will need to enter the Wii
                            menu, the Wii U menu nwill not power the sensor
                            bar). If you cannot accomplish both of these, you
                            can purchase a Mayflash Dolphin Bar which can
                            accomplish one or both.
                        </li>
                        <li>
                            Using a Wii Remote and Nunchuck in Dolphin also
                            requires some extra configuration - open the
                            Controllers menu, and check &quot;Emulate the
                            Wii&apos;s Bluetooth adapter&quot; and set Wii
                            Remote 1 to &quot;Real Wii Remote&quot;.
                        </li>
                    </ul>
                </ul>
            </Box>
            and can be accomplished with the following steps:
            <Box sx={{ textAlign: 'left' }}>
                <ol>
                    <li>
                        Generate a randomized game. You can put the outputted
                        file anywhere. [SOUE01]&quot;
                    </li>
                    <li>Open Dolphin</li>
                    <li>Connect your controller</li>
                    <ul>
                        <li>
                            To connect a Wii Remote to your computer, ensure
                            your computer&apos;s Bluetooth is turned on and
                            press the sync button on the Wii remote. Dolphin
                            should detect the controller and connect it. The
                            controller is connected once the lights on the Wii
                            Remote turn solid.
                        </li>
                    </ul>
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
