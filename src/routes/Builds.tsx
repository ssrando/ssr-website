import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import builds from '../data/builds.json';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type BuildData = {
    name: string,
    owner: string,
    repo: string,
    branch: string,
}

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
    const [prList, setPRList] = useState<PR[]>([])
    useEffect(() => {
        const loadPullRequests = async() => {
            const prs: PR[] = await (await fetch('https://api.github.com/repos/ssrando/ssrando/pulls')).json();
            setPRList(prs);
            console.log(prs)
        }
       loadPullRequests()
    }, [setPRList])
    const buildComponents = _.map(prList, (pr: PR) => (
        <TableRow>
            <TableCell component="th" scope="row"><a href={pr.html_url}>{pr.title}</a></TableCell>
            <TableCell style={{overflow: 'hidden'}}>{pr.body}</TableCell>
            {/* <a href={`https://nightly.link/${pr.user.login}/${pr.head.repo.name}/workflows/build.yaml/${pr.head.ref}`}>{pr.title}</a> */}
        </TableRow>
    ))
    return (
        <div>
            <h1>Current Builds</h1>
            <div>
                <a href="https://github.com/ssrando/ssrando/releases/latest">Stable Release</a>
            </div>
            <div>
                <a href="https://nightly.link/ssrando/ssrando/workflows/build.yaml/master">Latest Build</a>
            </div>
            <h1>Beta Builds</h1>
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
        </div>
    )
}
