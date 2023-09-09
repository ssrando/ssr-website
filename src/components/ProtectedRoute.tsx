import { useContext } from 'react';
import { Link } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { hasGrant } from '../util/SecurityUtils';

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
    if (!user) {
        return <NotAuthorized />;
    }
    if (requiredGrant && !hasGrant(user, requiredGrant)) {
        return <NotAuthorized />;
    }

    if (adminOnly && !user.isAdmin) {
        return <NotAuthorized />;
    }

    return element;
};

export default ProtectedRoute;
