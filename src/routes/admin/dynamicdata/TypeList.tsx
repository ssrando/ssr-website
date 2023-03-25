import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DynamicDataType } from '../../../ApiTypes';
import { deleteType, newType } from '../../../controller/DynamicData';
import { useGetApi } from '../../../controller/Hooks';

const TypeList = () => {
    const { data, error, isLoading, mutate } = useGetApi<DynamicDataType[]>(
        '/api/dynamicdata/types',
    );

    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newTypeName, setNewTypeName] = useState<string>('');
    const [typeError, setTypeError] = useState<string>('');

    const handleClose = () => {
        setDialogOpen(false);
        setNewTypeName('');
        setTypeError('');
    };

    const newDataTypeFlowStart = () => {
        setDialogOpen(true);
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
        newType(newTypeName);
        handleClose();
        mutate();
    };

    const handleDeleteType = async (type: string) => {
        const result = await deleteType(type);
        if (!result.success) {
            toast.error(`Failed to delete - Error ${result.error}`);
        }
        mutate();
    };

    if (isLoading) return <>Loading</>;

    if (error) return <>Unable to load data</>;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{ position: 'absolute', right: 0, paddingRight: '1em' }}
                >
                    <Button variant="contained" onClick={newDataTypeFlowStart}>
                        New Data Type
                    </Button>
                </Box>
                <Typography sx={{ flexGrow: 1 }} variant="h4">
                    Dynamic Data
                </Typography>
            </Box>
            <TableContainer
                sx={{
                    width: 'max-content',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Table>
                    <TableBody>
                        {data?.map((type) => (
                            <TableRow key={type.name}>
                                <TableCell>{type.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            navigate(
                                                `/admin/dynamicdata/${type.name}`,
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleDeleteType(type.name)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={dialogOpen} onClose={handleClose}>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submitNewDataType}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TypeList;
