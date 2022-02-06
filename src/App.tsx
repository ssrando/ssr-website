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
import Footer from './Footer';
import Rules from './routes/Rules';

function App() {
    return (
        <div className="App">
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
                                <Button component={RRLink} to="/" color="inherit">Skyward Sword Randomizer</Button>
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button component={RRLink} to="/builds" color="inherit">Builds</Button>
                            <Button component={RRLink} to="/asyncs" color="inherit">Asyncs</Button>
                            <Button component={RRLink} to="/rules" color="inherit">Rules</Button>
                            <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://tracker.ssrando.com">Tracker</Link></Button>
                            <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://devtracker.ssrando.com">Dev Tracker</Link></Button>
                            <Button color="inherit"><Link color="#FFFFFF" underline="none" href="https://discord.ssrando.com">Discord</Link></Button>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Switch>
                    <Route exact path="/">
                        <Typography variant="h4" component="div" sx= {{ display: "block", padding: "1%" }}>
                            Welcome to the Skyward Sword Randomizer!
                        </Typography>
                        <img src="./logo.png" alt="SSR logo" width="30%"/>
                        <Typography component="div" sx= {{ display: "block", padding: "1%" }}>
                            To get started, check out the latest builds on the <RRLink to="/builds">builds</RRLink> page.
                        </Typography>
                        <Typography component="div">
                            To get help, share seeds, join races, and more, join the Skyward Sword Randomizer <Link href="https://discord.ssrando.com">Discord Server</Link>.
                        </Typography>
                    </Route>
                    <Route path="/builds">
                        <Builds />
                    </Route>
                    <Route path="/asyncs">
                        <Asyncs />
                    </Route>
                    <Route>
                        <Rules />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
