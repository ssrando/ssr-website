import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import SourceSetup from '../install/SourceSetup';

const WindowsSetup = () => {
    const [source, setSource] = useState(false);

    const updateSourceSelection = (event: ChangeEvent<HTMLInputElement>) => {
        setSource(event.target.value === 'yes');
    };
    return (
        <>
            <Typography variant="body2">
                Are you running from source? (If you are unsure what this means,
                select &quot;No&quot;).
            </Typography>
            <FormControl>
                <RadioGroup
                    row
                    value={source ? 'yes' : 'no'}
                    onChange={updateSourceSelection}
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                    />
                </RadioGroup>
            </FormControl>
            {source && <SourceSetup />}
        </>
    );
};

export default WindowsSetup;
