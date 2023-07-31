import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DynamicDataType } from '../../../ApiTypes';
import { deleteType } from '../../../controller/DynamicData';
import { useGetApi } from '../../../controller/Hooks';
import CreateDataTypeDialog from '../../../components/dialogs/CreateDataTypeDialog';

const TypeList = () => {
    const { data, error, isLoading, mutate } = useGetApi<DynamicDataType[]>(
        '/api/dynamicdata/types',
    );

    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleClose = () => {
        setDialogOpen(false);
        mutate();
    };

    const newDataTypeFlowStart = () => {
        setDialogOpen(true);
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
            <CreateDataTypeDialog open={dialogOpen} handleClose={handleClose} />
        </>
    );
};

export default TypeList;
