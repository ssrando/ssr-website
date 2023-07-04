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
import { DynamicData, DynamicDataTyped } from '../../ApiTypes';

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

    if (!data) {
        return (
            <Box>
                <Typography variant="h4">Frequently Asked Questions</Typography>
                No questions found.
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
