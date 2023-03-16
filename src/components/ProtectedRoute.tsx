import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

interface ProtectedRouteProps {
    element: JSX.Element;
    adminOnly?: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { element, adminOnly } = props;

    const { state } = useContext(UserContext);
    const { user, loggedIn } = state;

    if (!loggedIn) {
        return <NotLoggedIn />
    }

    if (adminOnly) {
        if (!user || !user.isAdmin) {
            return <NotAuthorized />
        }
    }

    return element
}

const NotLoggedIn = () => (
    <>
        You are not logged in. You must have a valid account in good standing to access this page. Click <a href="/login">here to login</a>
    </>
)

const NotAuthorized = () => (
    <>
        You are not authorized to access this page. If you have recently been granted permission, your new permission level may have not
        yet been applied. Try again later. If you believe this to be an error, contact the site administrator.
    </>
)

export default ProtectedRoute;
