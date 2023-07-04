import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Skeleton,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetApi } from '../../controller/Hooks';
import { DynamicDataTyped } from '../../ApiTypes';

type Question = {
    category: string;
    question: string;
    answer: string;
};

const FAQ = () => {
    const { data, error, isLoading } = useGetApi<DynamicDataTyped<Question>[]>(
        '/api/dynamicdata/faq',
    );
    if (isLoading) return <Skeleton />;

    if (error) {
        return (
            <Box>
                <Typography variant="h4">Frequently Asked Questions</Typography>
                <Typography sx={{ paddingTop: '1em' }}>
                    An error occurred while loading question data
                </Typography>
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box>
                <Typography variant="h4">Frequently Asked Questions</Typography>
                <Typography sx={{ paddingTop: '1em' }}>
                    No questions found
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4">Frequently Asked Questions</Typography>
            {data.map((dataItem) => (
                <Accordion key={dataItem.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${dataItem.id}a-content`}
                        id={`panel${dataItem.id}a-header`}
                    >
                        <Typography>{dataItem.data.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{dataItem.data.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FAQ;
