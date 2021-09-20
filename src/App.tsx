import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Nightly Download Links</h1>
        <a href="https://nightly.link/ssrando/ssrando/workflows/build.yaml/master">Master (mostly stable)</a>
        <br />
        <a href="https://nightly.link/ssrando/ssrando/workflows/build.yaml/gui-redesign">Dev</a>
        <br />
        <a href="https://nightly.link/battlecats59/sslib/workflows/build.yaml/gui-redesign">Closed AC and FS (Battlecats Dev Fork)</a>
        <br />
        <a href="https://nightly.link/battlecats59/sslib/workflows/build.yaml/temp-music-rando">Music Rando (Battlecats Dev Fork)</a>

        <h1>Asyncs</h1>
        <h2>June 2021</h2>
        <a href="https://nightly.link/ssrando/ssrando/actions/runs/896836207">Randomizer Build</a>
        <br />
        <a href="http://bombch.us/DQt-">Async Sheet</a>
        <h2>July 2021</h2>
        <a href="https://nightly.link/ssrando/ssrando/actions/runs/981921528">Randomizer Build</a>
        <br />
        <a href="http://bombch.us/DQ8J">Async Sheet</a>
        <h2>August 2021</h2>
        <a href="https://nightly.link/lepelog/sslib/actions/runs/1086121520">Randomizer Build</a>
        <br />
        <a href="http://bombch.us/DRF-">Async Sheet</a>
        <h2>September 2021</h2>
        <a href="#">Randomizer Build (TBA)</a>
        <br />
        <a href="http://bombch.us/DROk">Async Sheet</a>
    </div>
  );
}

export default App;
