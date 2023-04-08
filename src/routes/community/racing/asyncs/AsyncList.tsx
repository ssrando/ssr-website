import {
    Box,
    Button,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import CreateAsyncDialog from '../../../../components/dialogs/CreateAsyncDialog';
import { useGetApi } from '../../../../controller/Hooks';

type Async = {
    name: string;
    entrants: number;
};

const AsyncList = () => {
    const { data, isLoading, error, mutate } =
        useGetApi<Async[]>('/api/asyncs');

    const [createDialogOen, setCreateDialogOpen] = useState<boolean>(false);

    const openCreateDialog = () => {
        setCreateDialogOpen(true);
    };

    const closeCreateDialog = () => {
        setCreateDialogOpen(false);
        mutate();
    };

    if (isLoading) return <Skeleton />;

    if (error) return <>Unable to load data</>;

    if (!data) return <>No data</>;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Asyncs
                </Typography>
                <Button
                    variant="contained"
                    sx={{ position: 'absolute', right: '1%' }}
                    onClick={openCreateDialog}
                >
                    Create Async
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Entrants</TableCell>
                            <TableCell>Best Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((async) => (
                            <TableRow>
                                <TableCell>{async.name}</TableCell>
                                <TableCell>{async.entrants}</TableCell>
                                <TableCell>Best Time</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateAsyncDialog
                open={createDialogOen}
                handleClose={closeCreateDialog}
            />
        </>
    );
};

export default AsyncList;
