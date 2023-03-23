import React from 'react';
import _ from 'lodash';
import asyncs from '../data/asyncs.json';

type AsyncData = {
    month: string;
    build: string;
    sheet: string;
};

class Asyncs extends React.Component {
    render() {
        const asyncComponents = asyncs.map((async: AsyncData) => (
            <div>
                <h2>{async.month}</h2>
                <a href={async.build}>Randomizer Build</a>
                <br />
                <a href={async.sheet}>Async Sheet</a>
            </div>
        ));
        _.reverse(asyncComponents);
        return (
            <div>
                <h1>Asyncs</h1>
                {asyncComponents}
            </div>
        );
    }
}

export default Asyncs;
