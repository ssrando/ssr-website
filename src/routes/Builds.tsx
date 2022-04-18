import React from 'react';
import _ from 'lodash';
import builds from '../data/builds.json';

type BuildData = {
    name: string,
    owner: string,
    repo: string,
    branch: string,
}

class Asyncs extends React.Component {
    render() {
        const buildComponents = _.map(builds, (build: BuildData) => (
            <div>
                <a href={`https://nightly.link/${build.owner}/${build.repo}/workflows/build.yaml/${build.branch}`}>{build.name}</a>
            </div>
        ))
        return (
            <div>
                <h1>Current Builds</h1>
                {buildComponents}
                <h1>Co-op S1 Tournament Build</h1>
                <a href="https://dl.ssrando.com/coop-s1/windows" download>Windows</a>
                <br />
                <a href="https://dl.ssrando.com/coop-s1/ubuntu" download>Ubuntu</a>
            </div>
        )
    }
}

export default Asyncs;
