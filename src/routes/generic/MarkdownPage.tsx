import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useFileGet } from '../../controller/Hooks';

type MarkdownPageProps = {
    pathPrefix: string;
};

const MarkdownPage = ({ pathPrefix }: MarkdownPageProps) => {
    const { file } = useParams();
    const { data, error } = useFileGet(`/files/${pathPrefix}/${file}`);
    if (error) {
        return (
            <Typography>An error occurred while loading the file.</Typography>
        );
    }
    if (!data) {
        return <Typography>No file found.</Typography>;
    }
    return <ReactMarkdown>{data}</ReactMarkdown>;
};

export default MarkdownPage;
