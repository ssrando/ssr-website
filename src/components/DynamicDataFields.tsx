import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material';
import NumberEntryField from './NumberField';

type StringElement = {
    name: string;
    type: 'string';
    minLength?: number;
    maxLength?: number;
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

export type SelectElement = {
    name: string;
    type: 'select';
    choices: string[];
};

export type ArrayElement = {
    name: string;
    type: 'array';
    elementType: 'string' | 'number' | 'boolean' | 'array' | 'object';
    minSize?: number;
    maxSize?: number;
};

export type ObjectElement = {
    name: string;
    type: 'object';
    // eslint-disable-next-line no-use-before-define
    children: ShapeElement[];
};

export const arrayTypeNames = [
    'string',
    'number',
    'boolean',
    'array',
    'object',
];

export const typeNames = [
    'string',
    'number',
    'boolean',
    'select',
    'array',
    'object',
];

export type ShapeElement =
    | StringElement
    | BooleanElement
    | NumberElement
    | SelectElement
    | ArrayElement
    | ObjectElement;

export const defaultValueForType = (
    type: string,
    choices?: string[],
    children?: ShapeElement[],
): unknown => {
    const childVals: Record<string, unknown> = {};
    switch (type) {
        case 'string':
            return '';
        case 'boolean':
            return false;
        case 'number':
            return 0;
        case 'select':
            return choices ? choices[0] : '';
        case 'array':
            return [];
        case 'object':
            children?.forEach((child) => {
                childVals[child.name] = defaultValueForType(
                    child.type,
                    child.type === 'select' ? child.choices : undefined,
                    child.type === 'object' ? child.children : undefined,
                );
            });
            return childVals;
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
            onChange={(newValue: number) => sync(type.name, newValue)}
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
    const syncChild = (index: string, newValue: unknown) => {
        const updated = [...value];
        updated[Number(index)] = newValue;
        sync(type.name, updated);
    };
    const addChild = () => {
        const updated = [...value];
        updated.push(defaultValueForType(type.elementType));
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
            syncChild,
        );
    return (
        <Box>
            {type.name}
            <Box sx={{ ml: '1em' }}>
                {value.map((entry, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={`${type.name}-entry-${entry}-${index}`}>
                        {createField(entry, index)}
                    </span>
                ))}
                <Button onClick={addChild}>Add Item``</Button>
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
                {type.children.map((child) => (
                    <span
                        key={`${type.name}-child-${child.name}-${child.type}`}
                    >
                        {
                            // eslint-disable-next-line no-use-before-define
                            fieldForType(child, value[child.name], syncChild)
                        }
                    </span>
                ))}
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
