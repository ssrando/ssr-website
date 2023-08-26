import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import DialogProps from './DialogProps';
import { createFile } from '../../controller/Files';

const CreateFileDialog = ({ open, handleClose }: DialogProps) => {
    const [fileName, setFileName] = useState('');
    const [filePath, setFilePath] = useState('');
    const [nameError, setNameError] = useState('');
    const [pathError, setPathError] = useState('');

    const close = () => {
        handleClose();
    };

    const submit = () => {
        if (!fileName) {
            setNameError('File name is required');
            return;
        }
        if (!filePath) {
            setPathError('File path is required');
            return;
        }
        createFile(fileName, filePath);
        close();
    };

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>New File</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="File Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={fileName}
                    onChange={(event) => setFileName(event.target.value)}
                    error={nameError !== ''}
                    helperText={nameError}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="File Path"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={filePath}
                    onChange={(event) => setFilePath(event.target.value)}
                    error={pathError !== ''}
                    helperText={pathError}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={submit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateFileDialog;
