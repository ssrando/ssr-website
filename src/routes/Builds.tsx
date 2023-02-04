import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { FormControlLabel, FormGroup, Paper, Skeleton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

type PR = {
    html_url: string,
    draft: boolean,
    state: string,
    title: string,
    body: string,
    user: {
        login: string
    },
    head: {
        ref: string,
        repo: {
            name: string
        },
    }
}

export const Builds = () => {
    const [prList, setPRList] = useState<PR[]>([]);
    const [shownPRs, setShownPRs] = useState<PR[]>([]);
    const [showDrafts, setShowDrafts] = useState<boolean>(false);

    const updateDraftFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setShowDrafts(event.target.checked);
    }, []);

    useEffect(() => {
        const loadPullRequests = async() => {
            const prs: PR[] = await (await fetch('https://api.github.com/repos/ssrando/ssrando/pulls')).json();
            setPRList(prs);
        }
       loadPullRequests()
    }, [setPRList]);

    useEffect(() => {
        let filteredList = prList;
        if (!showDrafts) {
            filteredList = filteredList.filter((pr) => !pr.draft);
        }
        setShownPRs(filteredList);
    }, [showDrafts, prList]);

    const buildComponents = _.map(shownPRs, (pr: PR) => (
        <TableRow>
            <TableCell component="th" scope="row"><a href={pr.html_url}>{pr.title}</a></TableCell>
            <TableCell style={{overflow: 'hidden'}}>{pr.body}</TableCell>
            {/* <a href={`https://nightly.link/${pr.user.login}/${pr.head.repo.name}/workflows/build.yaml/${pr.head.ref}`}>{pr.title}</a> */}
        </TableRow>
    ));

    return (
        <div>
            <Typography variant="h3" style={{marginTop: "1%", marginBottom: "1%"}}>Current Builds</Typography>
            <div>
                <a href="https://github.com/ssrando/ssrando/releases/latest"><Typography variant="h5">Stable Release</Typography></a>
            </div>
            <div>
                <a href="https://nightly.link/ssrando/ssrando/workflows/build.yaml/master"><Typography variant="h5">Latest Build</Typography></a>
            </div>
            <Typography variant="h3" style={{marginTop: "2%"}}>Beta Builds</Typography>
            <Typography variant="caption">Beta builds contain features that are currently under testing. These builds are not guaranteed to be stable.</Typography>
            <div>
                <FormGroup>
                    <FormControlLabel control={<Switch onChange={updateDraftFilter} /> } label="Include Drafts" />
                </FormGroup>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Feature Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {buildComponents}
                        </TableBody>
                </Table>
            </TableContainer>
            {
                prList.length === 0 && (
                    <Skeleton variant="rectangular" height={200}/>
                )
            }
        </div>
    )
}
