import { useContext } from 'react';
import { Link } from '@mui/material';
import { UserContext } from '../contexts/UserContext';

interface ProtectedRouteProps {
    element: JSX.Element;
    adminOnly?: boolean;
    requiredGrant?: string;
}

const NotLoggedIn = () => (
    <>
        You are not logged in. You must have a valid account in good standing to
        access this page. Click <Link href="/login">here to login</Link>
    </>
);

const NotAuthorized = () => (
    <>
        You are not authorized to access this page. If you have recently been
        granted permission, your new permission level may have not yet been
        applied. Try again later. If you believe this to be an error, contact
        the site administrator.
    </>
);

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { element, adminOnly, requiredGrant } = props;

    const { state } = useContext(UserContext);
    const { user, loggedIn } = state;

    if (!loggedIn) {
        return <NotLoggedIn />;
    }

    console.log(requiredGrant);
    console.log(adminOnly);
    if (requiredGrant) {
        console.log('required grant');
        if (!user || !user.grants.includes(requiredGrant)) {
            console.log(requiredGrant);
            console.log(user?.grants);
            return <NotAuthorized />;
        }
    }

    if (adminOnly) {
        if (!user || !user.isAdmin) {
            return <NotAuthorized />;
        }
    }

    return element;
};

export default ProtectedRoute;
