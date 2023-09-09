import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import { createAsync } from '../../controller/Async';
import DialogProps from './DialogProps';
import { UserContext } from '../../contexts/UserContext';
import { asyncGrant, hasGrant } from '../../util/SecurityUtils';

const CreateAsyncDialog = ({ open, handleClose }: DialogProps) => {
    const { state } = useContext(UserContext);
    const { loggedIn, user } = state;

    const [makeSubmission, setMakeSubmission] = useState<boolean>(
        user ? hasGrant(user, asyncGrant) : true,
    );
    const [name, setName] = useState<string>('');
    const [permalink, setPermalink] = useState<string>('');
    const [hash, setHash] = useState<string>('');
    const [version, setVersion] = useState<string>('');
    const [versionLink, setVersionLink] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const submit = () => {
        const timeSubmit = time === '' ? undefined : time;
        const commentSubmit = comment === '' ? undefined : comment;
        createAsync(
            name,
            permalink,
            hash,
            version,
            versionLink,
            timeSubmit,
            commentSubmit,
        );
        handleClose();
    };

    if (!loggedIn || !user) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Async</DialogTitle>
                <DialogContent>
                    You must be logged in to create an async.
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Async</DialogTitle>
            <DialogContent>
                {hasGrant(user, asyncGrant) && (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(event) =>
                                        setMakeSubmission(event.target.checked)
                                    }
                                />
                            }
                            label="Make Submission"
                        />
                    </FormGroup>
                )}
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
                <TextField
                    autoFocus
                    margin="dense"
                    id="version"
                    label="Version"
                    fullWidth
                    variant="standard"
                    required
                    value={version}
                    onChange={(event) => setVersion(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="versionLink"
                    label="Version Link"
                    fullWidth
                    variant="standard"
                    required
                    value={version}
                    onChange={(event) => setVersionLink(event.target.value)}
                />
                {makeSubmission && (
                    <>
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
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAsyncDialog;
