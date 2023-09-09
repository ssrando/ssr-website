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
import { Button, CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import AsyncList from './routes/community/racing/asyncs/AsyncList';
import Builds from './routes/Builds';
import Footer from './components/Footer';
import Rules from './routes/Rules';
import Header from './components/header/Header';
import { UserContext, UserContextProvider } from './contexts/UserContext';
import Login from './routes/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TypeList from './routes/admin/dynamicdata/TypeList';
import EditData from './routes/admin/dynamicdata/EditData';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext, ThemeContextProvider } from './contexts/ThemeContext';
import SetupGuide from './routes/resources/setup/SetupGuide';
import FAQ from './routes/resources/FAQ';
import About from './routes/About';
import MarkdownPage from './routes/generic/MarkdownPage';
import FileList from './routes/admin/files/FileList';
import Security from './routes/admin/security/Security';
import NewMarkdownPage from './routes/generic/NewMarkdownPage';
import { useGlobalInterceptors } from './controller/Hooks';

library.add(fab);

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
    const { theme } = useContext(ThemeContext);
    useGlobalInterceptors();

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
                    <Route path="/resources" element={<Outlet />}>
                        <Route path="guides" element={<Outlet />}>
                            <Route path=":file" element={<MarkdownPage />} />
                        </Route>
                        <Route path="setup" element={<SetupGuide />} />
                        <Route path="faq" element={<FAQ />} />
                    </Route>
                    <Route path="/community" element={<Outlet />}>
                        <Route path="races" element={<Outlet />}>
                            <Route path="asyncs" element={<AsyncList />}>
                                <Route path="new" />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<Outlet />}>
                        <Route
                            path="dynamicdata"
                            element={
                                <ProtectedRoute
                                    element={<TypeList />}
                                    requiredGrant="Manage Dynamic Data"
                                />
                            }
                        />
                        <Route
                            path="dynamicdata/:name"
                            element={
                                <ProtectedRoute
                                    element={<EditData />}
                                    requiredGrant="Manage Dynamic Data"
                                />
                            }
                        />
                        <Route
                            path="files"
                            element={
                                <ProtectedRoute
                                    element={<FileList />}
                                    adminOnly
                                />
                            }
                        />
                        <Route
                            path="security"
                            element={
                                <ProtectedRoute
                                    element={<Security />}
                                    adminOnly
                                />
                            }
                        />
                    </Route>
                    <Route
                        path="newFile/:path"
                        element={
                            <ProtectedRoute
                                element={<NewMarkdownPage />}
                                adminOnly
                            />
                        }
                    />
                    <Route path="/files/:file" element={<MarkdownPage />} />
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

const AppWrapper = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserContextProvider>
                <Router>
                    <App />
                </Router>
            </UserContextProvider>
        </ThemeProvider>
    );
};

const ThemeWrapper = () => (
    <ThemeContextProvider>
        <AppWrapper />
    </ThemeContextProvider>
);

export default ThemeWrapper;
