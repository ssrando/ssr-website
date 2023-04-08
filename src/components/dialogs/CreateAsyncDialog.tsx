import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { createAsync } from '../../controller/Async';
import DialogProps from './DialogProps';

const CreateAsyncDialog = ({ open, handleClose }: DialogProps) => {
    const [name, setName] = useState<string>('');
    const [permalink, setPermalink] = useState<string>('');
    const [hash, setHash] = useState<string>('');

    const submit = () => {
        createAsync(name, permalink, hash);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Async</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="permalink"
                    label="Settings String"
                    fullWidth
                    variant="standard"
                    required
                    value={permalink}
                    onChange={(event) => setPermalink(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="hash"
                    label="Hash"
                    fullWidth
                    variant="standard"
                    required
                    value={hash}
                    onChange={(event) => setHash(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAsyncDialog;
