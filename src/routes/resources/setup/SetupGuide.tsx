import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import WindowsSetup from './os/WindowsSetup';
import MacSetup from './os/MacSetup';
import OtherSetup from './os/OtherSetup';
import LinuxSetup from './os/LinuxSetup';
import PlayWii from './play/PlayWii';
import PlayDolphin from './play/PlayDolphin';

type OSName = 'windows' | 'mac' | 'linux' | 'other';

type OS = {
    name: string;
    display: string;
};

const availableOs: OS[] = [
    {
        name: 'windows',
        display: 'Windows',
    },
    {
        name: 'mac',
        display: 'Mac OS',
    },
    {
        name: 'linux',
        display: 'Linux',
    },
    {
        name: 'other',
        display: 'Other',
    },
];

const SetupGuide = () => {
    const [selectedOs, setSelectedOs] = useState<OSName>();
    const [selectedSystem, setSelectedSystem] = useState<string>();

    const changeOSSelection = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOs(event.target.value as OSName);
    };
    const changeSystemSelection = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedSystem(event.target.value);
    };
    return (
        <Box
            sx={{
                paddingLeft: {
                    md: '5%',
                },
                paddingRight: {
                    md: '5%',
                },
            }}
        >
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
                Setup Guide
            </Typography>
            <Box>
                <Typography variant="h6">Setting Up the Randomizer</Typography>
                <Typography variant="body1">
                    I am running the randomizer program on:
                </Typography>
                <FormControl>
                    <RadioGroup row onChange={changeOSSelection}>
                        {availableOs.map((os) => (
                            <FormControlLabel
                                value={os.name}
                                control={<Radio />}
                                label={os.display}
                                key={os.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                {selectedOs === 'windows' && <WindowsSetup />}
                {selectedOs === 'mac' && <MacSetup />}
                {selectedOs === 'linux' && <LinuxSetup />}
                {selectedOs === 'other' && <OtherSetup />}
            </Box>
            <Box>
                <Typography variant="h6">
                    Playing the Randomized Game
                </Typography>
                <Typography variant="body1">
                    I will be playing the randomized game on:
                </Typography>
                <FormControl>
                    <RadioGroup row onChange={changeSystemSelection}>
                        <FormControlLabel
                            value="wii"
                            control={<Radio />}
                            label="Wii"
                        />
                        <FormControlLabel
                            value="dolphin"
                            control={<Radio />}
                            label="Dolphin"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                {selectedSystem === 'wii' && <PlayWii />}
                {selectedSystem === 'dolphin' && <PlayDolphin />}
            </Box>
        </Box>
    );
};

export default SetupGuide;
