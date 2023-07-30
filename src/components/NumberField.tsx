import { Add, Remove } from '@mui/icons-material';
import { IconButton, Paper, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type NumberFieldProps = {
    min?: number;
    max?: number;
} & TextFieldProps;

const NumberEntryField = ({
    min,
    max,
    label,
    onChange,
    variant,
    fullWidth,
    id,
    margin,
}: NumberFieldProps) => {
    const [value, setValue] = useState(0);
    const changed = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        const newVal = Number(event.target.value);
        if (Number.isNaN(newVal)) {
            return;
        }
        if ((min && newVal < min) || (max && newVal > max)) {
            return;
        }
        setValue(newVal);
        if (onChange) {
            onChange(event);
        }
    };

    const increment = () => {
        setValue((curr) => (curr === max ? curr : curr + 1));
    };
    const decrement = () => {
        setValue((curr) => (curr === min ? min : curr - 1));
    };
    return (
        <Paper
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 'max-content',
            }}
        >
            <IconButton
                onClick={decrement}
                disabled={min ? value <= min : false}
            >
                <Remove />
            </IconButton>
            <TextField
                margin={margin}
                id={id}
                label={label}
                fullWidth={fullWidth}
                variant={variant}
                value={value}
                onChange={changed}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <IconButton
                onClick={increment}
                disabled={max ? value >= max : false}
            >
                <Add />
            </IconButton>
        </Paper>
    );
};

export default NumberEntryField;
