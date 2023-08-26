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
import { useGetApi } from '../../../controller/Hooks';
import CreateFileDialog from '../../../components/dialogs/CreateFileDialog';

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
                            <TableRow>
                                <TableCell>{file.name}</TableCell>
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
