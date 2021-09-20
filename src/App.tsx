import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Switch, Route, Link as RRLink } from 'react-router-dom';
import Asyncs from './routes/Asyncs';
import Builds from './routes/Builds';

function App() {
  return (
    <div className="App">
        <Router>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button component={RRLink} to="/" color="inherit">Skyward Sword Randomizer</Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button component={RRLink} to="/builds" color="inherit">Builds</Button>
                        <Button component={RRLink} to="/asyncs" color="inherit">Asyncs</Button>
                        <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://tracker.ssrando.com">Tracker</Link></Button>
                        <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://devtracker.ssrando.com">Dev Tracker</Link></Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Switch>
                <Route path="/builds">
                    <Builds />
                </Route>

                <Route path="/asyncs">
                    <Asyncs />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
