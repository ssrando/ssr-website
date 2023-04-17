import {
    Avatar,
    Box,
    Button,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate as mutateGlobal } from 'swr';
import { Async, AsyncSubmission } from '../../../../ApiTypes';
import AsyncSubmissionDialog from '../../../../components/dialogs/AsyncSubmissionDialog';
import CreateAsyncDialog from '../../../../components/dialogs/CreateAsyncDialog';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteAsync, deleteSubmission } from '../../../../controller/Async';
import { useGetApi } from '../../../../controller/Hooks';

import './AsyncList.css';

interface StandingsProps {
    async: Async;
}

const durationSort = (a: AsyncSubmission, b: AsyncSubmission) => {
    const aDur = a.time.split(':');
    const bDur = b.time.split(':');

    if (aDur.length > bDur.length) {
        return 1;
    }
    if (bDur.length > aDur.length) {
        return -1;
    }
    for (let i = 0; i < aDur.length; i++) {
        const aNum = Number(aDur[i]);
        const bNum = Number(bDur[i]);
        if (aNum !== bNum) return aNum - bNum;
    }
    return 0;
};

const Standings = ({ async }: StandingsProps) => {
    const { state } = useContext(UserContext);
    const { user } = state;

    const deleteHandler = (id: number) => {
        deleteSubmission(id);
        mutateGlobal('/api/asyncs');
    };

    if (async.submissions.length === 0) {
        return (
            <Typography variant="caption">
                No submissions for this async.
            </Typography>
        );
    }

    return (
        <>
            {async.submissions.sort(durationSort).map((submission, index) => (
                <Box
                    key={submission.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Box className="standingsRowItem">{index + 1}</Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        className="standingsRowItem"
                    >
                        <Avatar
                            alt={submission.user.username}
                            src={`https://cdn.discordapp.com/avatars/${submission.user.discordId}/${submission.user.avatar}.png`}
                            sx={{ marginRight: '15px' }}
                        />
                        {submission.user.username}
                    </Box>
                    <Box className="standingsRowItem">{submission.time}</Box>
                    <Box className="standingsRowItem" sx={{ flexGrow: 1 }}>
                        {submission.comment}
                    </Box>
                    {(user?.isAdmin ||
                        user?.id === submission.user.discordId) && (
                        <Box className="standingsRowItem">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => deleteHandler(submission.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </Box>
            ))}
        </>
    );
};

const AsyncList = () => {
    const { data, isLoading, error, mutate } =
        useGetApi<Async[]>('/api/asyncs');

    const { state } = useContext(UserContext);
    const { loggedIn, user } = state;

    const [createDialogOen, setCreateDialogOpen] = useState<boolean>(false);
    const [submitDialogOpen, setSubmitDialogOpen] = useState<boolean>(false);
    const [submissionAsync, setSubmissionAsync] = useState<number>(-1);
    const [activeStandings, setActiveStandings] = useState<number>(-1);

    const openCreateDialog = () => {
        setCreateDialogOpen(true);
    };

    const closeCreateDialog = () => {
        setCreateDialogOpen(false);
        mutate();
    };

    const openSubmitDialog = (async: number) => {
        setSubmitDialogOpen(true);
        setSubmissionAsync(async);
    };

    const closeSubmitDialog = () => {
        setSubmitDialogOpen(false);
        mutate();
    };

    const copySettings = (settings: string) => {
        navigator.clipboard.writeText(settings);
        toast.success('Copied to clipboard');
    };

    const openStandings = (id: number) => {
        setActiveStandings(id);
    };

    const closeStandings = () => {
        setActiveStandings(-1);
    };

    const handleDelete = (id: number) => {
        deleteAsync(id);
        mutate();
    };

    const hasSubmittedToAsync = (async: Async) => {
        if (!user) {
            return false;
        }

        if (!user.id) {
            return false;
        }

        return async.submissions
            .map((submission) => submission.user.discordId)
            .includes(user.id);
    };

    if (isLoading) return <Skeleton />;

    if (error) return <>Unable to load data</>;

    if (!data) return <>No data</>;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Asyncs
                </Typography>
                <Button
                    variant="contained"
                    sx={{ position: 'absolute', right: '1%' }}
                    onClick={openCreateDialog}
                >
                    Create Async
                </Button>
            </Box>
            <TableContainer
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Entrants</TableCell>
                            <TableCell>Best Time</TableCell>
                            <TableCell>Hash</TableCell>
                            <TableCell />
                            <TableCell />
                            {loggedIn && <TableCell />}
                            {user?.isAdmin && <TableCell />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((async, index) => (
                            <Fragment key={async.id}>
                                <TableRow>
                                    <TableCell>{async.name}</TableCell>
                                    <TableCell>
                                        {async.submissions.length}
                                    </TableCell>
                                    <TableCell>
                                        {async.submissions.length > 0
                                            ? async.submissions[0].time
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{async.hash}</TableCell>
                                    <TableCell>
                                        <Tooltip title={async.permalink}>
                                            <Button
                                                onClick={() =>
                                                    copySettings(
                                                        async.permalink,
                                                    )
                                                }
                                            >
                                                Copy Settings String
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {activeStandings === async.id && (
                                            <Button onClick={closeStandings}>
                                                Hide Standings
                                            </Button>
                                        )}
                                        {activeStandings !== async.id && (
                                            <Button
                                                onClick={() =>
                                                    openStandings(async.id)
                                                }
                                            >
                                                View Standings
                                            </Button>
                                        )}
                                    </TableCell>
                                    {loggedIn && (
                                        <TableCell>
                                            <Button
                                                color="success"
                                                onClick={() =>
                                                    openSubmitDialog(index)
                                                }
                                                disabled={hasSubmittedToAsync(
                                                    async,
                                                )}
                                            >
                                                Submit
                                            </Button>
                                        </TableCell>
                                    )}
                                    {user?.isAdmin && (
                                        <TableCell>
                                            <Button
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(async.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                                {activeStandings === async.id && (
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Standings async={async} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateAsyncDialog
                open={createDialogOen}
                handleClose={closeCreateDialog}
            />
            <AsyncSubmissionDialog
                open={submitDialogOpen}
                handleClose={closeSubmitDialog}
                async={data[submissionAsync]}
            />
        </>
    );
};

export default AsyncList;
