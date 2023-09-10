import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import DialogProps from './DialogProps';
import { newType } from '../../controller/DynamicData';
import {
    ArrayElement,
    ObjectArray,
    ObjectElement,
    SelectElement,
    ShapeElement,
    arrayTypeNames,
    typeNames,
} from '../DynamicDataFields';
import NumberEntryField from '../NumberField';

type ShapeEditorProps = {
    shape: ShapeElement[];
    update: (newDef: ShapeElement[]) => void;
};

const ShapeEditor = ({ shape, update }: ShapeEditorProps) => {
    const addShapeItem = () => {
        const newShape = [...shape];
        newShape.push({ name: '', type: 'string' });
        update(newShape);
    };

    const deleteShapeItem = (index: number) => {
        const newShape = [...shape];
        newShape.splice(index, 1);
        update(newShape);
    };

    const updateShapeName = (index: number, name: string) => {
        const newShape = [...shape];
        newShape[index] = { ...newShape[index], name };
        update(newShape);
    };

    const updateShapeExtra = (
        index: number,
        extraKey: string,
        extraVal: any,
    ) => {
        const newShape = [...shape];
        // there assignments are technically unsafe, but given the setup we
        // can pretend that it is safe for the sake of not writing extremely
        // repetitive code for every optional parameter for every type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newShape[index][extraKey] = extraVal;
        update(newShape);
    };

    const updateArrayType = (index: number, type: string) => {
        const newShape = [...shape];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (newShape[index] as ArrayElement).elementType = type;
        if ((newShape[index] as ArrayElement).elementType === 'object') {
            (newShape[index] as ObjectArray).children = [];
        }
        update(newShape);
    };

    const addChoice = (index: number) => {
        const newShape = [...shape];
        (newShape[index] as SelectElement).choices.push('');
        update(newShape);
    };

    const deleteChoice = (index: number, choiceIndex: number) => {
        const newShape = [...shape];
        (newShape[index] as SelectElement).choices.splice(choiceIndex, 1);
        update(newShape);
    };

    const updateChoice = (
        index: number,
        choiceIndex: number,
        choice: string,
    ) => {
        const newShape = [...shape];
        (newShape[index] as SelectElement).choices[choiceIndex] = choice;
        update(newShape);
    };

    const updateShapeType = (index: number, type: string) => {
        const newShape = [...shape];
        // because of the way typecript handles type definitions, there's no way
        // to safely type this line. We know contextually that the types will always
        // be correct unless something gets altered, so we just ignore typechicking
        // for the line
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newShape[index] = { name: newShape[index].name, type };
        if (type === 'select') {
            (newShape[index] as SelectElement).choices = [];
        } else if (type === 'array') {
            (newShape[index] as ArrayElement).elementType = 'string';
        } else if (type === 'object') {
            (newShape[index] as ObjectElement).children = [];
        }
        update(newShape);
    };

    const updateObjectChildTypes = (index: number, newDef: ShapeElement[]) => {
        const newShape = [...shape];
        (newShape[index] as ObjectElement).children = newDef;
        update(newShape);
    };

    return (
        <>
            {shape.map((element, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box sx={{ pb: '30px', display: 'block' }} key={index}>
                    <Box sx={{ display: 'flex', gap: '15px', pb: '15px' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Property Key"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={element.name}
                            onChange={(event) =>
                                updateShapeName(index, event.target.value)
                            }
                        />
                        <Autocomplete
                            disableClearable
                            options={typeNames}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Data Type" />
                            )}
                            value={element.type}
                            onChange={(event, newValue) =>
                                updateShapeType(index, newValue)
                            }
                        />
                        <IconButton onClick={() => deleteShapeItem(index)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', pl: '1em', gap: '15px' }}>
                        {element.type === 'string' && (
                            <>
                                <NumberEntryField
                                    label="Minimum Length"
                                    min={0}
                                    max={
                                        element.maxLength
                                            ? element.maxLength
                                            : undefined
                                    }
                                    value={element.minLength ?? 0}
                                    onChange={(newValue) =>
                                        updateShapeExtra(
                                            index,
                                            'minLength',
                                            newValue,
                                        )
                                    }
                                />
                                <NumberEntryField
                                    label="Maximum Length"
                                    min={element.minLength ?? 0 + 1}
                                    value={element.maxLength ?? 0}
                                    onChange={(newValue) =>
                                        updateShapeExtra(
                                            index,
                                            'maxLength',
                                            newValue,
                                        )
                                    }
                                />
                            </>
                        )}
                        {element.type === 'number' && (
                            <>
                                <NumberEntryField
                                    label="Minimum"
                                    value={element.min ?? 0}
                                    max={element.max ? element.max : undefined}
                                    onChange={(newValue) =>
                                        updateShapeExtra(index, 'min', newValue)
                                    }
                                />
                                <NumberEntryField
                                    label="Maximum"
                                    min={
                                        element.min
                                            ? element.min + 1
                                            : undefined
                                    }
                                    value={element.max ?? 0}
                                    onChange={(newValue) =>
                                        updateShapeExtra(index, 'max', newValue)
                                    }
                                />
                            </>
                        )}
                        {element.type === 'select' && (
                            <Box sx={{ display: 'block' }}>
                                {element.choices?.map((choice, choiceIndex) => (
                                    <Box sx={{ display: 'flex' }}>
                                        <TextField
                                            margin="dense"
                                            id="versionLink"
                                            label="Choice Name"
                                            fullWidth
                                            variant="standard"
                                            required
                                            value={choice}
                                            onChange={(event) =>
                                                updateChoice(
                                                    index,
                                                    choiceIndex,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <IconButton
                                            onClick={() =>
                                                deleteChoice(index, choiceIndex)
                                            }
                                        >
                                            <Close />
                                        </IconButton>
                                    </Box>
                                ))}
                                <Button onClick={() => addChoice(index)}>
                                    New Choice
                                </Button>
                            </Box>
                        )}
                        {element.type === 'array' && (
                            <Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Autocomplete
                                        disableClearable
                                        options={arrayTypeNames}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Data Type"
                                            />
                                        )}
                                        value={element.elementType}
                                        onChange={(event, newValue) =>
                                            updateArrayType(index, newValue)
                                        }
                                    />
                                    <NumberEntryField
                                        label="Minimum Size"
                                        value={element.minSize ?? 2}
                                        min={2}
                                        max={
                                            element.maxSize
                                                ? element.maxSize
                                                : undefined
                                        }
                                        onChange={(newValue) =>
                                            updateShapeExtra(
                                                index,
                                                'minSize',
                                                newValue,
                                            )
                                        }
                                    />
                                    <NumberEntryField
                                        label="Maximum Size"
                                        min={
                                            element.minSize
                                                ? element.minSize + 1
                                                : undefined
                                        }
                                        value={element.maxSize ?? 0}
                                        onChange={(newValue) =>
                                            updateShapeExtra(
                                                index,
                                                'maxSize',
                                                newValue,
                                            )
                                        }
                                    />
                                </Box>
                                {element.elementType === 'object' && (
                                    <Box sx={{ display: 'block' }}>
                                        <ShapeEditor
                                            shape={element.children}
                                            // eslint-disable-next-line react/jsx-no-bind
                                            update={updateObjectChildTypes.bind(
                                                this,
                                                index,
                                            )}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                        {element.type === 'object' && (
                            <Box sx={{ display: 'block' }}>
                                <ShapeEditor
                                    shape={element.children}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    update={updateObjectChildTypes.bind(
                                        this,
                                        index,
                                    )}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            ))}
            <Button onClick={addShapeItem}>New Property</Button>
        </>
    );
};

const CreateDataTypeDialog = ({ open, handleClose }: DialogProps) => {
    const [newTypeName, setNewTypeName] = useState<string>('');
    const [typeError, setTypeError] = useState<string>('');
    const [shape, setShape] = useState<ShapeElement[]>([]);

    const close = () => {
        setNewTypeName('');
        setTypeError('');
        setShape([]);
        handleClose();
    };

    const submitNewDataType = () => {
        if (!newTypeName) {
            setTypeError('Type cannot be empty');
            return;
        }
        if (newTypeName === 'types') {
            setTypeError('"types" is a reserved name');
            return;
        }
        newType(newTypeName, shape);
        close();
    };

    const update = (newDef: ShapeElement[]) => {
        setShape(newDef);
    };

    return (
        <Dialog open={open} onClose={close} fullScreen>
            <DialogTitle>New Data Type</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Type Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newTypeName}
                    onChange={(event) => setNewTypeName(event.target.value)}
                    error={typeError !== ''}
                    helperText={typeError}
                />
                <Box sx={{ mt: '2em' }} />
                <Typography>Data Shape</Typography>
                <ShapeEditor shape={shape} update={update} />
                {JSON.stringify(shape)}
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={submitNewDataType}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateDataTypeDialog;
