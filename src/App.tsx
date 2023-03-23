import { useContext, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link as RRLink,
    Outlet,
} from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Asyncs from './routes/Asyncs';
import Builds from './routes/Builds';
import Footer from './components/Footer';
import Rules from './routes/Rules';
import Header from './components/Header';
import { UserContext, UserContextProvider } from './contexts/UserContext';
import Login from './routes/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TypeList from './routes/admin/dynamicdata/TypeList';
import EditData from './routes/admin/dynamicdata/EditData';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const Home = () => (
    <>
        <Typography
            variant="h4"
            component="div"
            sx={{ display: 'block', padding: '1%' }}
        >
            Welcome to the Skyward Sword Randomizer!
        </Typography>
        <img src="./logo.png" alt="SSR logo" width="30%" />
        <Typography component="div" sx={{ display: 'block', padding: '1%' }}>
            To get started, check out the latest builds on the{' '}
            <RRLink to="/builds">builds</RRLink> page.
        </Typography>
        <Typography component="div">
            To get help, share seeds, join races, and more, join the Skyward
            Sword Randomizer{' '}
            <Link href="https://discord.ssrando.com">Discord Server</Link>.
        </Typography>
    </>
);

function App() {
    const { update } = useContext(UserContext);

    useEffect(() => {
        const checkSession = async () => {
            const hasSession = await fetch('/api/me');
            if (hasSession.ok) {
                const userData = await hasSession.json();
                update({ loggedIn: true, user: userData });
            } else {
                update({ loggedIn: false, user: undefined });
            }
        };
        checkSession();
    }, [update]);
    return (
        <div className="App">
            <ToastContainer hideProgressBar theme="dark" />
            <Header />
            <div style={{ paddingTop: '1em' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/builds" element={<Builds />} />
                    <Route path="/asyncs" element={<Asyncs />} />
                    <Route path="/community" />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute element={<Outlet />} adminOnly />
                        }
                    >
                        <Route
                            path="dynamicdata"
                            element={
                                <ProtectedRoute
                                    element={<TypeList />}
                                    adminOnly
                                />
                            }
                        />
                        <Route
                            path="dynamicdata/:name"
                            element={
                                <ProtectedRoute
                                    element={<EditData />}
                                    adminOnly
                                />
                            }
                        />
                    </Route>
                    <Route element={<Rules />} />
                </Routes>
            </div>
            <CookieConsent
                style={{ zIndex: 1200 }}
                ButtonComponent={Button}
                buttonStyle={{
                    background: theme.palette.primary.main,
                    color: 'white',
                }}
            >
                This site uses cookies to provide basic functionality.
            </CookieConsent>
            <Footer />
        </div>
    );
}

const AppWrapper = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContextProvider>
            <Router>
                <App />
            </Router>
        </UserContextProvider>
    </ThemeProvider>
);

export default AppWrapper;
