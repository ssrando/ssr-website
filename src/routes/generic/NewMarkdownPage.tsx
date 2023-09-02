import { Box, Button, TextField, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFile } from '../../controller/Files';

const NewMarkdownPage = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [content, setContent] = useState<string>();
    const [blockSave, setBlockSave] = useState(true);
    const { path } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!content) {
            setBlockSave(true);
        } else if (!name) {
            setBlockSave(true);
        } else {
            setBlockSave(false);
        }
    }, [name, content]);

    if (!path) {
        toast.error('CRITICAL: No path specified.');
        navigate('/');
        return null;
    }

    const cancel = () => {
        // TODO unsaved changes prompt
        navigate('/');
    };

    const submit = async () => {
        if (!name) {
            setNameError('File name must be provided');
        }
        const result = await createFile(name, path, content);
        if (!result.success) {
            toast.error(result.error);
            return;
        }
        const { data } = result;
        navigate(`/files/${data}`);
    };

    return (
        <Box sx={{ pl: '1em', pr: '1em' }}>
            <Typography variant="h4">New File</Typography>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="File Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={nameError !== ''}
                helperText={nameError}
            />
            <MDEditor value={content} onChange={setContent} />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={submit} disabled={blockSave}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default NewMarkdownPage;
