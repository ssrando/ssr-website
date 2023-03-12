import React, { useContext, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Routes, Route, Link as RRLink, useLocation, useNavigate } from 'react-router-dom';
import Asyncs from './routes/Asyncs';
import { Builds } from './routes/Builds';
import Footer from './components/Footer';
import Rules from './routes/Rules';
import { CommunityHome } from './community/CommunityHome';
import Header from './components/Header';
import { UserContext, UserContextProvider } from './contexts/UserContext';
import Login from './routes/Login';

function App() {
    const { update } = useContext(UserContext);
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const hasSession = await fetch('/api/me');
            if (hasSession.ok) {
                const userData = await hasSession.json();
                update({ loggedIn: true, user: userData });
            } else {
                update({ loggedIn: false, user: undefined })
            }
        }
        const authorize = async (code: string) => {
            await fetch('/api/auth/discord/authorized', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code
                })
            });
            navigate('/', {replace: true})
        }
        const token = new URLSearchParams(location.search);
        const code = token.get('code');
        const scope = token.get('scope');
        const state = token.get('state');
        if (code) {
            authorize(code);
        } else {
            checkSession();
        }
    }, [location.search, navigate, update])
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/builds" element={<Builds />} />
                <Route path="/asyncs" element={<Asyncs />} />
                <Route path="community" element={<CommunityHome />} />
                <Route path="/login" element={<Login />} />c
                <Route element={<Rules />} />
            </Routes>
            <Footer />
        </div>
    );
}

const AppWrapper = () => (
    <UserContextProvider>
        <Router>
            <App />
        </Router>
    </UserContextProvider>
)

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

export default AppWrapper;
