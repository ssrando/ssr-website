import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Content, toJSONContent } from 'vanilla-jsoneditor';
import { DynamicData } from '../../../ApiTypes';
import JSONEditorComponent from '../../../components/JSONEditor';
import { saveData } from '../../../controller/DynamicData';
import { useGetApi } from '../../../controller/Hooks';
import {
    ServerActionError,
    ServerActionResult,
} from '../../../controller/ServerAction';

const EditData = () => {
    const { name } = useParams();

    const { data, error, isLoading } = useGetApi<DynamicData[]>(
        `/api/dynamicdata/${name}`,
    );

    const [content, setContent] = useState<Content>({ json: '' });
    const [showEditor, setShowEditor] = useState(false);
    const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(
        null,
    );

    const navigate = useNavigate();

    const discard = useCallback(() => {
        setShowEditor(false);
        setSelectedDataIndex(null);
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
    }, [setShowEditor, selectedDataIndex, data, content]);

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        toast('Unable to load data set');
    }

    if (!data) return <div />;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ position: 'absolute' }}>
                    <Button onClick={() => navigate('/admin/dynamicdata')}>
                        Back
                    </Button>
                </Box>
                <Typography sx={{ flexGrow: 1 }} variant="h4">
                    {name}
                </Typography>
            </Box>

            {data.map((item, index) => (
                <Button
                    key={item.id}
                    variant="contained"
                    onClick={() => loadEditor(index)}
                >
                    {name} {index}
                </Button>
            ))}
            {showEditor && (
                <JSONEditorComponent content={content} onChange={setContent} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Button variant="contained" onClick={discard}>
                Discard
            </Button>
            <Button variant="contained" onClick={save}>
                Save
            </Button>
        </>
    );
};

export default EditData;
