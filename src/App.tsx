import React from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Routes, Route, Link as RRLink } from 'react-router-dom';
import Asyncs from './routes/Asyncs';
import { Builds } from './routes/Builds';
import Footer from './components/Footer';
import Rules from './routes/Rules';
import { CommunityHome } from './community/CommunityHome';
import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/builds" element={<Builds />} />
                    <Route path="/asyncs" element={<Asyncs />} />
                    <Route path="community" element={<CommunityHome />} />
                    <Route element={<Rules />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

const Home = () => (
    <>
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
    </>
)

export default App;
