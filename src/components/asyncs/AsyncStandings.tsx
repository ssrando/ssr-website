import {
    Avatar,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    styled,
} from '@mui/material';
import { useContext } from 'react';
import { mutate } from 'swr';
import { Async } from '../../ApiTypes';
import { UserContext } from '../../contexts/UserContext';
import { deleteSubmission } from '../../controller/Async';
import { durationSort } from '../../util/Sort';
import SpoilerBlock from '../SpoilerBlock';
import { hasSubmittedToAsync } from '../../util/AsyncUtils';
import { asyncGrant, hasGrant } from '../../util/SecurityUtils';

const StyledTableRow = styled(TableRow)`
    &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;

interface AsyncStandingsProps {
    async: Async;
}

const AsyncStandings = ({ async }: AsyncStandingsProps) => {
    const { state } = useContext(UserContext);
    const { user } = state;

    const deleteHandler = (id: number) => {
        deleteSubmission(id);
        mutate('/api/asyncs');
    };

    if (async.submissions.length === 0) {
        return (
            <Typography variant="caption">
                No submissions for this async.
            </Typography>
        );
    }

    const showSpoilers = hasSubmittedToAsync(async, user);

    const canDelete = user && hasGrant(user, asyncGrant);

    return (
        <Table size="small">
            <TableBody sx={{ 'tr:last-child > *': { borderBottom: 'unset' } }}>
                {async.submissions
                    .sort((a, b) => durationSort(a.time, b.time))
                    .map((submission, index) => (
                        <StyledTableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        alt={submission.user.username}
                                        src={`https://cdn.discordapp.com/avatars/${submission.user.discordId}/${submission.user.avatar}.png`}
                                        sx={{ marginRight: '10px' }}
                                    />
                                    {submission.user.username}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <SpoilerBlock
                                    text={submission.time}
                                    alwaysShow={showSpoilers}
                                />
                            </TableCell>
                            <TableCell sx={{ wordBreak: 'break-word' }}>
                                <SpoilerBlock
                                    text={submission.comment}
                                    alwaysShow={
                                        showSpoilers || !submission.comment
                                    }
                                />
                            </TableCell>
                            {canDelete ||
                                (user?.id === submission.user.discordId && (
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                deleteHandler(submission.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                ))}
                        </StyledTableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default AsyncStandings;
