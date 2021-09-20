import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Switch, Route, Link as RRLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
                            Skyward Sword Randomizer
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button component={RRLink} to="/builds" color="inherit">Builds</Button>
                        <Button component={RRLink} to="/asyncs" color="inherit">Asyncs</Button>
                        <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://tracker.ssrando.com">Tracker</Link></Button>
                        <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://tracker.ssrando.com">Dev Tracker</Link></Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Switch>
                <Route path="/builds">
                    <h1>Nightly Download Links</h1>
                    <a href="https://nightly.link/ssrando/ssrando/workflows/build.yaml/master">Master (mostly stable)</a>
                    <br />
                    <a href="https://nightly.link/ssrando/ssrando/workflows/build.yaml/gui-redesign">Dev</a>
                    <br />
                    <a href="https://nightly.link/battlecats59/sslib/workflows/build.yaml/gui-redesign">Closed AC and FS (Battlecats Dev Fork)</a>
                    <br />
                    <a href="https://nightly.link/battlecats59/sslib/workflows/build.yaml/temp-music-rando">Music Rando (Battlecats Dev Fork)</a>
                </Route>

                <Route path="/asyncs">
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
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
