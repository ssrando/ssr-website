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
import { toast } from 'react-toastify';
import { useGetApi } from '../../../controller/Hooks';
import CreateFileDialog from '../../../components/dialogs/CreateFileDialog';
import { File } from '../../../ApiTypes';
import { deleteFile } from '../../../controller/Files';

const FileList = () => {
    const { data, error, mutate } = useGetApi<File[]>('/api/files');

    const [dialogOpen, setDialogOpen] = useState(false);

    const newFile = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        mutate();
    };

    const handleDeleteFile = async (id: number) => {
        const result = await deleteFile(id);
        if (!result.success) {
            toast.error('An error ocurred while deleting the file.');
        }
        mutate();
    };

    if (error) {
        return (
            <Typography>
                An error ocurred while loading the file list.
            </Typography>
        );
    }

    if (!data) {
        return <Typography>No files found</Typography>;
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{ position: 'absolute', right: 0, paddingRight: '1em' }}
                >
                    <Button variant="contained" onClick={newFile}>
                        New File
                    </Button>
                </Box>
                <Typography sx={{ flexGrow: 1 }} variant="h4">
                    Files
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
                        {data.map((file) => (
                            <TableRow key={file.id}>
                                <TableCell>{file.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleDeleteFile(file.id)
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
            <CreateFileDialog open={dialogOpen} handleClose={handleClose} />
        </>
    );
};

export default FileList;
