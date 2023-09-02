import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useContext, useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { useFileGet } from '../../controller/Hooks';
import { deleteFile, editFile } from '../../controller/Files';
import { loadServerHeaderData } from '../../components/header/HeaderData';
import { UserContext } from '../../contexts/UserContext';

type EditorProps = {
    initialValue: string;
    close: () => void;
    fileId: string;
};

export const Editor = ({ initialValue, close, fileId }: EditorProps) => {
    const [content, setContent] = useState<string | undefined>(initialValue);

    const save = () => {
        if (content) {
            editFile(fileId, content);
        }

        close();
    };

    const cancel = () => {
        close();
    };

    const deletePage = () => {
        deleteFile(fileId);
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

const MarkdownPage = () => {
    const { file } = useParams();
    const { data, error, mutate } = useFileGet(`/files/${file}`);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    const { user, loggedIn } = useContext(UserContext).state;

    const editPermission =
        loggedIn &&
        (user?.isAdmin || user?.grants.includes('Manage Content Pages'));

    if (error) {
        return (
            <Typography>An error occurred while loading the file.</Typography>
        );
    }
    if (data === undefined || !file) {
        return <Typography>No file found.</Typography>;
    }

    const launchEditor = () => {
        if (!editPermission) return;
        setEdit(true);
    };
    const closeEditor = () => {
        if (!editPermission) return;
        setEdit(false);
        mutate();
    };

    const deletePage = () => {
        if (!editPermission) return;
        deleteFile(file);
        loadServerHeaderData();
        navigate('/');
    };

    return (
        <Box sx={{ textAlign: 'left', pl: '2em', pr: '2em' }}>
            {!edit && (
                <>
                    {editPermission && (
                        <Box sx={{ textAlign: 'right' }}>
                            <IconButton onClick={deletePage}>
                                <Delete />
                            </IconButton>
                            <IconButton onClick={launchEditor}>
                                <Edit />
                            </IconButton>
                        </Box>
                    )}
                    <ReactMarkdown>{data}</ReactMarkdown>
                </>
            )}
            {edit && (
                <Editor initialValue={data} close={closeEditor} fileId={file} />
            )}
            {/* <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
                Last edited by a person on a date
            </Typography> */}
        </Box>
    );
};

export default MarkdownPage;
