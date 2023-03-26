import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    Skeleton,
    Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Content, toJSONContent } from 'vanilla-jsoneditor';
import { DynamicData } from '../../../ApiTypes';
import JSONEditorComponent from '../../../components/JSONEditor';
import { deleteData, newData, saveData } from '../../../controller/DynamicData';
import { useGetApi } from '../../../controller/Hooks';
import {
    ServerActionError,
    ServerActionResult,
} from '../../../controller/ServerAction';

const EditData = () => {
    const { name } = useParams();

    const { data, error, isLoading, mutate } = useGetApi<DynamicData[]>(
        `/api/dynamicdata/${name}`,
    );

    const [content, setContent] = useState<Content>({ json: '' });
    const [showEditor, setShowEditor] = useState(false);
    const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(
        null,
    );
    const [isNew, setIsNew] = useState<boolean>(false);

    const navigate = useNavigate();

    const discard = useCallback(() => {
        setShowEditor(false);
        setSelectedDataIndex(null);
        setIsNew(false);
        setContent({ json: '' });
    }, []);

    const loadEditor = useCallback(
        (dataIndex: number) => {
            if (showEditor) discard();
            if (!data) {
                toast.error('Data not loaded yet');
                return;
            }
            setContent({ json: data[dataIndex].data });
            setSelectedDataIndex(dataIndex);
            setShowEditor(true);
        },
        [showEditor, discard, data],
    );

    const save = useCallback(() => {
        if (isNew) {
            toast.promise<ServerActionResult, ServerActionError>(
                newData(name, toJSONContent(content).json),
                {
                    pending: 'Creating...',
                    success: 'Created',
                    error: {
                        render({ data: errorData }) {
                            if (!errorData) {
                                return 'Failed to create due to an unknown error.';
                            }
                            return `Failed to create: ${errorData.error}`;
                        },
                    },
                },
            );
            setShowEditor(false);
            setSelectedDataIndex(null);
            setIsNew(false);
            setContent({ json: '' });
            mutate();
            return;
        }
        if (selectedDataIndex === null) {
            toast.error('No data selected');
            return;
        }
        if (!data) {
            toast.error('Data not loaded yet');
            return;
        }
        toast.promise<ServerActionResult, ServerActionError>(
            saveData(data[selectedDataIndex].id, toJSONContent(content).json),
            {
                pending: 'Saving...',
                success: 'Saved',
                error: {
                    render({ data: errorData }) {
                        if (!errorData) {
                            return 'Failed to save due to an unknown error.';
                        }
                        return `Failed to save: ${errorData.error}`;
                    },
                },
            },
        );
        setShowEditor(false);
        setSelectedDataIndex(null);
        setContent({ json: '' });
        mutate();
    }, [setShowEditor, selectedDataIndex, data, content]);

    const setupNew = () => {
        setShowEditor(true);
        setIsNew(true);
        setContent({ json: '' });
    };

    const doDelete = () => {
        if (selectedDataIndex === null) {
            toast.error('No data selected');
            return;
        }
        if (!data) {
            toast.error('Data not loaded yet');
            return;
        }
        toast.promise<ServerActionResult, ServerActionError>(
            deleteData(data[selectedDataIndex].id),
            {
                pending: 'Deleting...',
                success: 'Deleted',
                error: {
                    render({ data: errorData }) {
                        if (!errorData) {
                            return 'Failed to delete due to an unknown error.';
                        }
                        return `Failed to delete: ${errorData.error}`;
                    },
                },
            },
        );
        setShowEditor(false);
        setSelectedDataIndex(null);
        setContent({ json: '' });
        mutate();
    };

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        toast('Unable to load data set');
    }

    if (!data) return <div />;

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ flexGrow: 3 }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                        <Button onClick={() => navigate('/admin/dynamicdata')}>
                            Back
                        </Button>
                    </Box>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        {name}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            textAlign: 'right',
                            paddingRight: '0.5em',
                        }}
                    >
                        <Button variant="contained" onClick={setupNew}>
                            New
                        </Button>
                    </Box>
                </Box>
                <List>
                    {data.map((item, index) => (
                        <ListItemButton
                            key={item.id}
                            onClick={() => loadEditor(index)}
                        >
                            {name} {index}
                        </ListItemButton>
                    ))}
                </List>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flexGrow: 8 }}>
                <Typography variant="h4">Edit</Typography>
                {showEditor && (
                    <Box sx={{ padding: '1%' }}>
                        <JSONEditorComponent
                            content={content}
                            onChange={setContent}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                paddingTop: '2%',
                            }}
                        >
                            <Button variant="contained" onClick={doDelete}>
                                Delete
                            </Button>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button
                                variant="contained"
                                onClick={discard}
                                sx={{ marginRight: '1%' }}
                            >
                                Discard
                            </Button>
                            <Button variant="contained" onClick={save}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EditData;