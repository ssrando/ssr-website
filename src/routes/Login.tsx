import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Button, Link } from '@mui/material';

const Login = () => {
    const style = {
        paddingTop: '1em',
    };
    return (
        <>
            <div>
                To gain access to the Skyward Sword Randomizer Community Portal,
                you must log in with one of the below methods.
            </div>
            <div style={style}>
                <Button
                    style={{ background: '#5865F2', color: '#FFFFFF' }}
                    component="a"
                    href="/api/auth/discord/doauth"
                >
                    <FontAwesomeIcon
                        icon={faDiscord}
                        style={{ paddingRight: '0.5em' }}
                    />
                    Log In with Discord
                </Button>
            </div>
        </>
    );
};

export default Login;
