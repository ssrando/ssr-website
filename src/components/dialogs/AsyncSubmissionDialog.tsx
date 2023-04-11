import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Async } from '../../ApiTypes';
import { UserContext } from '../../contexts/UserContext';
import { createSubmission } from '../../controller/Async';
import DialogProps from './DialogProps';

type AsyncSubmissionProps = DialogProps & {
    async: Async;
};

const AsyncSubmissionDialog = ({
    open,
    handleClose,
    async,
}: AsyncSubmissionProps) => {
    const { state } = useContext(UserContext);
    const { loggedIn, user } = state;

    const [time, setTime] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const submit = () => {
        createSubmission(async.id, time, comment);
        handleClose();
    };

    if (!loggedIn || !user) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You must be logged in to submit an async result.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    if (!async) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Async context not properly set. Please report this error
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Submit Async Result</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        Submit your result for {async.name}
                    </Box>
                    <Box sx={{ paddingLeft: '50px' }}>
                        Submitting as {user?.username}
                    </Box>
                </Box>
                <TextField
                    autoFocus
                    margin="dense"
                    id="time"
                    label="Time"
                    fullWidth
                    variant="standard"
                    required
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comment"
                    fullWidth
                    variant="standard"
                    required
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AsyncSubmissionDialog;
