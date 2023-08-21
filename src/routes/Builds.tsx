import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import {
    FormControlLabel,
    FormGroup,
    Paper,
    Skeleton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useGetApi } from '../controller/Hooks';
import { DynamicDataTyped } from '../ApiTypes';

type PR = {
    html_url: string;
    draft: boolean;
    state: string;
    title: string;
    body: string;
    user: {
        login: string;
    };
    head: {
        ref: string;
        repo: {
            name: string;
        };
    };
};

type BuildData = {
    name: string;
    link: string;
};

const Builds = () => {
    const [prList, setPRList] = useState<PR[]>([]);
    const [shownPRs, setShownPRs] = useState<PR[]>([]);
    const [showDrafts, setShowDrafts] = useState<boolean>(false);

    const updateDraftFilter = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setShowDrafts(event.target.checked);
        },
        [],
    );

    const { data, error } = useGetApi<DynamicDataTyped<BuildData>[]>(
        '/api/dynamicdata/builds',
    );

    useEffect(() => {
        const loadPullRequests = async () => {
            const prs: PR[] = await (
                await fetch(
                    'https://api.github.com/repos/ssrando/ssrando/pulls',
                )
            ).json();
            setPRList(prs);
        };
        loadPullRequests();
    }, [setPRList]);

    useEffect(() => {
        let filteredList = prList;
        if (!showDrafts) {
            filteredList = filteredList.filter((pr) => !pr.draft);
        }
        setShownPRs(filteredList);
    }, [showDrafts, prList]);

    const buildComponents = _.map(shownPRs, (pr: PR) => (
        <TableRow key={pr.title}>
            <TableCell component="th" scope="row">
                <a href={pr.html_url}>{pr.title}</a>
            </TableCell>
            <TableCell style={{ overflow: 'hidden' }}>{pr.body}</TableCell>
            {/* <a href={`https://nightly.link/${pr.user.login}/${pr.head.repo.name}/workflows/build.yaml/${pr.head.ref}`}>{pr.title}</a> */}
        </TableRow>
    ));

    let staticBuildData;
    if (error) {
        staticBuildData = (
            <Typography sx={{ paddingTop: '1em' }}>
                An error occurred while loading data for current builds.
            </Typography>
        );
    } else if (!data || data.length === 0) {
        staticBuildData = (
            <Typography sx={{ paddingTop: '1em' }}>
                No current builds available.
            </Typography>
        );
    } else {
        staticBuildData = data.map((build) => (
            <div key={build.id}>
                <a href={build.data.link}>
                    <Typography variant="h5">{build.data.name}</Typography>
                </a>
            </div>
        ));
    }

    return (
        <div>
            <Typography
                variant="h3"
                style={{ marginTop: '1%', marginBottom: '1%' }}
            >
                Current
            </Typography>
            {staticBuildData}
            <Typography variant="h3" style={{ marginTop: '2%' }}>
                Beta
            </Typography>
            <Typography variant="caption">
                Beta downloads below contain features that are currently under
                testing. These builds are not guaranteed to be stable. Drafts
                are generally semi-complete, but not quite ready for review one
                reason or another.
            </Typography>
            <div>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch onChange={updateDraftFilter} />}
                        label="Include Drafts"
                    />
                </FormGroup>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>
                                Feature Name
                            </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{buildComponents}</TableBody>
                </Table>
            </TableContainer>
            {prList.length === 0 && (
                <Skeleton variant="rectangular" height={200} />
            )}
        </div>
    );
};

export default Builds;
