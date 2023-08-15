import {
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Skeleton,
    Typography,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { DynamicDataList } from '../../../ApiTypes';
import {
    changeOrder,
    deleteData,
    newData,
    saveData,
} from '../../../controller/DynamicData';
import { useGetApi } from '../../../controller/Hooks';
import {
    ServerActionError,
    ServerActionResult,
} from '../../../controller/ServerAction';
import {
    defaultValueForType,
    fieldForType,
} from '../../../components/DynamicDataFields';

const EditData = () => {
    const { name } = useParams();

    const { data, error, isLoading, mutate } = useGetApi<DynamicDataList>(
        `/api/dynamicdata/${name}`,
    );

    const [showEditor, setShowEditor] = useState(false);
    const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(
        null,
    );
    const [isNew, setIsNew] = useState<boolean>(false);
    const [formData, setFormData] = useState<Record<string, unknown>>(() => {
        const initialData: Record<string, unknown> = {};
        data?.shape.forEach((type) => {
            initialData[type.name] = defaultValueForType(
                type.type,
                type.type === 'select' ? type.choices : undefined,
                type.type === 'object' ? type.children : undefined,
            );
        });
        return initialData;
    });
    const syncFormData = (key: string, value: unknown) => {
        setFormData((curr) => ({ ...curr, [key]: value }));
    };
    const navigate = useNavigate();

    const discard = useCallback(() => {
        setShowEditor(false);
        setSelectedDataIndex(null);
        setIsNew(false);
        setFormData({});
    }, []);

    const loadEditor = useCallback(
        (dataIndex: number) => {
            if (showEditor) discard();
            if (!data) {
                toast.error('Data not loaded yet');
                return;
            }
            setFormData(data.data[dataIndex].data);
            setSelectedDataIndex(dataIndex);
            setShowEditor(true);
        },
        [showEditor, discard, data],
    );

    const save = useCallback(() => {
        if (isNew) {
            toast.promise<ServerActionResult, ServerActionError>(
                newData(name, formData),
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
            setFormData({});
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
            saveData(data.data[selectedDataIndex].id, formData),
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
        setFormData({});
        mutate();
    }, [setShowEditor, selectedDataIndex, data, formData, isNew, mutate, name]);

    const setupNew = () => {
        setShowEditor(true);
        setIsNew(true);
        setFormData({});
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
            deleteData(data.data[selectedDataIndex].id),
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
        setFormData({});
        mutate();
    };

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        toast('Unable to load data set');
    }

    if (!data) return <div />;

    const moveUp = (index: number) => {
        if (index === 0) return;
        const order = data?.data.map((item) => item.id);
        [order[index - 1], order[index]] = [order[index], order[index - 1]];
        changeOrder(name, order);
        mutate();
    };

    const moveDown = (index: number) => {
        if (index === data.data.length - 1) return;
        const order = data?.data.map((item) => item.id);
        [order[index + 1], order[index]] = [order[index], order[index + 1]];
        changeOrder(name, order);
        mutate();
    };

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
                    {data.data.map((item, index) => (
                        <ListItem component="div" sx={{ display: 'flex' }}>
                            <ListItemButton
                                sx={{ flexGrow: 1 }}
                                key={item.id}
                                onClick={() => loadEditor(index)}
                            >
                                {name} {index} ({item.id})
                            </ListItemButton>
                            <IconButton
                                disabled={index === 0}
                                onClick={() => moveUp(index)}
                            >
                                <ArrowUpward />
                            </IconButton>
                            <IconButton
                                disabled={index === data.data.length - 1}
                                onClick={() => moveDown(index)}
                            >
                                <ArrowDownward />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flexGrow: 8 }}>
                <Typography variant="h4">Edit</Typography>
                {showEditor && (
                    <Box sx={{ padding: '1%' }}>
                        <Box sx={{ textAlign: 'left' }}>
                            {data.shape.map((type) => (
                                <span key={type.name}>
                                    {fieldForType(
                                        type,
                                        formData[type.name],
                                        syncFormData,
                                    )}
                                </span>
                            ))}
                        </Box>
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
