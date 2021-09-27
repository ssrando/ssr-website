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
            </div>
        )
    }
}

export default Asyncs;
