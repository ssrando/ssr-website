import { Add, Remove } from '@mui/icons-material';
import { IconButton, Paper, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

type NumberFieldProps = {
    min?: number;
    max?: number;
    value: number;
    onChange: (newValue: number) => void;
} & Omit<TextFieldProps, 'onChange'>;

const NumberEntryField = ({
    min,
    max,
    label,
    onChange,
    variant,
    fullWidth,
    id,
    margin,
    value,
}: NumberFieldProps) => {
    const changed = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newVal = Number(event.target.value);
        if (Number.isNaN(newVal)) {
            return;
        }
        if ((min && newVal < min) || (max && newVal > max)) {
            return;
        }
        onChange(newVal);
    };

    const increment = () => {
        onChange(value === max ? value : value + 1);
    };
    const decrement = () => {
        onChange(value === min ? min : value - 1);
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
