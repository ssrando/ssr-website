import {
    Box,
    Button,
    Collapse,
    IconButton,
    Link,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate as mutateGlobal } from 'swr';
import { Async } from '../../../../ApiTypes';
import AsyncSubmissionDialog from '../../../../components/dialogs/AsyncSubmissionDialog';
import CreateAsyncDialog from '../../../../components/dialogs/CreateAsyncDialog';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteAsync } from '../../../../controller/Async';
import { useGetApi } from '../../../../controller/Hooks';
import AsyncStandings from '../../../../components/asyncs/AsyncStandings';
import SpoilerBlock from '../../../../components/SpoilerBlock';
import { hasSubmittedToAsync } from '../../../../util/AsyncUtils';
import { asyncGrant, hasGrant } from '../../../../util/SecurityUtils';

const StyledTableRow = styled(TableRow)`
    &:nth-child(4n + 1) {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;

interface AsyncListRowProps {
    async: Async;
    index: number;
    openSubmitDialog: (index: number) => void;
}

const AsyncListRow = ({
    async,
    index,
    openSubmitDialog,
}: AsyncListRowProps) => {
    const { state } = useContext(UserContext);
    const { loggedIn, user } = state;

    const [expanded, setExpanded] = useState<boolean>(false);

    const asyncPermissions = loggedIn && user && hasGrant(user, asyncGrant);

    const copySettings = (settings: string) => {
        navigator.clipboard.writeText(settings);
        toast.success('Copied to clipboard');
    };

    const handleDelete = (id: number) => {
        deleteAsync(id);
        mutateGlobal('/api/asyncs');
    };

    const showSpoilers = hasSubmittedToAsync(async, user);

    return (
        <>
            <StyledTableRow
                className=""
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{async.name}</TableCell>
                <TableCell>{async.submissions.length}</TableCell>
                <TableCell>
                    <SpoilerBlock
                        text={
                            async.submissions.length > 0
                                ? async.submissions[0].time
                                : 'N/A'
                        }
                        alwaysShow={
                            showSpoilers || async.submissions.length === 0
                        }
                    />
                </TableCell>
                <TableCell>{async.version}</TableCell>
                <TableCell>{async.hash}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                    colSpan={6}
                >
                    <Collapse in={expanded} timeout="auto">
                        <Box sx={{ margin: 1 }}>
                            <Box
                                sx={{
                                    borderBottom:
                                        '1px solid rgba(224, 224, 224, 1)',
                                    paddingTop: '4px',
                                    paddingBottom: '4px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Box>
                                        Settings String: {async.permalink}
                                        <Button
                                            onClick={() =>
                                                copySettings(async.permalink)
                                            }
                                        >
                                            Copy
                                        </Button>
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box>
                                        {loggedIn && (
                                            <Button
                                                color="success"
                                                onClick={() =>
                                                    openSubmitDialog(index)
                                                }
                                                disabled={hasSubmittedToAsync(
                                                    async,
                                                    user,
                                                )}
                                            >
                                                Submit
                                            </Button>
                                        )}
                                        {asyncPermissions && (
                                            <Button
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(async.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                                <Box>
                                    Version{' '}
                                    <Link
                                        href={async.versionLink}
                                        target="_blank"
                                    >
                                        {async.version}
                                    </Link>
                                </Box>
                            </Box>
                            <AsyncStandings async={async} />
                        </Box>
                    </Collapse>
                </TableCell>
            </StyledTableRow>
        </>
    );
};

const AsyncList = () => {
    const {
        state: { loggedIn },
    } = useContext(UserContext);

    const { data, isLoading, error, mutate } =
        useGetApi<Async[]>('/api/asyncs');

    const [createDialogOen, setCreateDialogOpen] = useState<boolean>(false);
    const [submitDialogOpen, setSubmitDialogOpen] = useState<boolean>(false);
    const [submissionAsync, setSubmissionAsync] = useState<number>(-1);

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

    if (isLoading) return <Skeleton />;

    if (error) return <>Unable to load data</>;

    if (!data) return <>No data</>;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Asyncs
                </Typography>
                {loggedIn && (
                    <Button
                        variant="contained"
                        sx={{ position: 'absolute', right: '1%' }}
                        onClick={openCreateDialog}
                    >
                        Create Async
                    </Button>
                )}
            </Box>
            <TableContainer
                sx={{
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell>Entrants</TableCell>
                            <TableCell>Best Time</TableCell>
                            <TableCell>Version</TableCell>
                            <TableCell>Hash</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((async, index) => (
                            <AsyncListRow
                                key={async.id}
                                async={async}
                                index={index}
                                openSubmitDialog={openSubmitDialog}
                            />
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
