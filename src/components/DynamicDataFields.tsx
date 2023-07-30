import {
    Autocomplete,
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material';
import NumberEntryField from './NumberField';

type StringElement = {
    name: string;
    type: 'string';
    length?: number;
};

type BooleanElement = {
    name: string;
    type: 'boolean';
};

type NumberElement = {
    name: string;
    type: 'number';
    min?: number;
    max?: number;
};

type SelectElement = {
    name: string;
    type: 'select';
    choices: string[];
};

type ArrayElement = {
    name: string;
    type: 'array';
    elementType: 'string' | 'number' | 'boolean' | 'array' | 'object';
    minSize?: number;
    maxSize?: number;
};

type ObjectElement = {
    name: string;
    type: 'object';
    // eslint-disable-next-line no-use-before-define
    children: ShapeElement[];
};

export type ShapeElement =
    | StringElement
    | BooleanElement
    | NumberElement
    | SelectElement
    | ArrayElement
    | ObjectElement;

const defaultValueForType = (type: string): unknown => {
    switch (type) {
        case 'string':
            return '';
        case 'boolean':
            return false;
        case 'number':
            return 0;
        case 'array':
            return [];
        case 'object':
            return {};
        default:
            return '';
    }
};

type FieldProps<T extends ShapeElement, V> = {
    type: T;
    value: V;
    sync: (key: string, value: V) => void;
};

const StringField = ({
    type,
    value,
    sync,
}: FieldProps<StringElement, string>) => (
    <Box>
        <TextField
            margin="dense"
            id="versionLink"
            label={type.name}
            fullWidth
            variant="standard"
            required
            value={value}
            onChange={(event) => sync(type.name, event.target.value)}
        />
    </Box>
);

const BooleanField = ({
    type,
    value,
    sync,
}: FieldProps<BooleanElement, boolean>) => (
    <Box>
        <FormControlLabel
            control={
                <Checkbox
                    value={value}
                    onChange={(event) => sync(type.name, event.target.checked)}
                />
            }
            label={type.name}
        />
    </Box>
);

const NumberField = ({
    type,
    value,
    sync,
}: FieldProps<NumberElement, number>) => (
    <Box>
        <NumberEntryField
            margin="dense"
            id="versionLink"
            label={type.name}
            variant="standard"
            value={value}
            onChange={(event) => sync(type.name, Number(event.target.value))}
            min={type.min}
            max={type.max}
        />
    </Box>
);

const SelectField = ({
    type,
    value,
    sync,
}: FieldProps<SelectElement, string>) => (
    <Box>
        <Autocomplete
            disablePortal
            options={type.choices}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label={type.name} />
            )}
            value={value}
            onChange={(event, newValue) => sync(type.name, newValue ?? '')}
        />
    </Box>
);

const ArrayField = ({
    type,
    value,
    sync,
}: FieldProps<ArrayElement, unknown[]>) => {
    const syncChild = (index: number, newValue: unknown) => {
        const updated = [...value];
        if (newValue === '') {
            updated.splice(index, 1);
        } else {
            updated[index] = newValue;
        }
        sync(type.name, updated);
    };
    const createField = (entry: unknown, index: number) =>
        // eslint-disable-next-line no-use-before-define
        fieldForType(
            {
                name: `${index}`,
                type: type.elementType,
            } as StringElement, // this cast is only to satisfy ts, it's functionally meaningless
            entry,
            (key: string, newValue: unknown) => syncChild(index, newValue),
        );
    return (
        <Box>
            {type.name}
            <Box sx={{ ml: '1em' }}>
                {value.map((entry, index) => createField(entry, index))}
                {createField(
                    defaultValueForType(type.elementType),
                    value.length,
                )}
            </Box>
        </Box>
    );
};

const ObjectField = ({
    type,
    value,
    sync,
}: FieldProps<ObjectElement, Record<string, unknown>>) => {
    const syncChild = (key: string, childValue: unknown) => {
        value[key] = childValue;
        sync(type.name, value);
    };
    return (
        <Box>
            {type.name}
            <Box sx={{ ml: '1em' }}>
                {type.children.map((child) =>
                    // eslint-disable-next-line no-use-before-define
                    fieldForType(child, value[child.name], syncChild),
                )}
            </Box>
        </Box>
    );
};

export const fieldForType = (
    type: ShapeElement,
    value: unknown,
    sync: (key: string, newValue: unknown) => void,
) => {
    switch (type.type) {
        case 'string':
            return (
                <StringField type={type} value={value as string} sync={sync} />
            );
        case 'boolean':
            return (
                <BooleanField
                    type={type}
                    value={value as boolean}
                    sync={sync}
                />
            );
        case 'number':
            return (
                <NumberField type={type} value={value as number} sync={sync} />
            );
        case 'select':
            return (
                <SelectField type={type} value={value as string} sync={sync} />
            );
        case 'array':
            return (
                <ArrayField
                    type={type}
                    value={(value as unknown[]) ?? []}
                    sync={sync}
                />
            );
        case 'object':
            return (
                <ObjectField
                    type={type}
                    value={(value as Record<string, unknown>) ?? {}}
                    sync={sync}
                />
            );
        default:
            return null;
    }
};
