import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { useFileGet } from '../../controller/Hooks';

type MarkdownPageProps = {
    pathPrefix: string;
};

type EditorProps = {
    initialValue: string;
    close: () => void;
};

const Editor = ({ initialValue, close }: EditorProps) => {
    const [content, setContent] = useState<string | undefined>(initialValue);

    const save = () => {
        close();
    };

    const cancel = () => {
        close();
    };

    const deletePage = () => {
        close();
    };

    return (
        <>
            <MDEditor value={content} onChange={setContent} />
            <Box sx={{ display: 'flex' }}>
                <Button onClick={deletePage}>Delete</Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={save}>Save</Button>
            </Box>
        </>
    );
};

const MarkdownPage = ({ pathPrefix }: MarkdownPageProps) => {
    const { file } = useParams();
    const { data, error } = useFileGet(`/files/${pathPrefix}/${file}`);
    const [edit, setEdit] = useState(false);
    if (error) {
        return (
            <Typography>An error occurred while loading the file.</Typography>
        );
    }
    if (!data) {
        return <Typography>No file found.</Typography>;
    }

    const launchEditor = () => {
        setEdit(true);
    };
    const closeEditor = () => {
        setEdit(false);
    };

    return (
        <Box sx={{ textAlign: 'left', pl: '2em', pr: '2em' }}>
            {!edit && (
                <>
                    <Box sx={{ textAlign: 'right' }}>
                        <IconButton onClick={launchEditor}>
                            <Delete />
                        </IconButton>
                        <IconButton onClick={launchEditor}>
                            <Edit />
                        </IconButton>
                    </Box>
                    <ReactMarkdown>{data}</ReactMarkdown>
                </>
            )}
            {edit && <Editor initialValue={data} close={closeEditor} />}
            <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
                Last edited by a person on a date
            </Typography>
        </Box>
    );
};

export default MarkdownPage;
