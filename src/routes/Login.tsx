import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Button, Link } from '@mui/material';

const Login = () => {
    const style = {
        paddingTop: '1em',
    }
    return (
        <>
            <div style={style}>
                To gain access to the Skyward Sword Randomizer Community Portal, you must log in with one of the below methods.
            </div>
            <div style={style}>
                <Button style={{ background: '#5865F2' }}>
                    <Link color="#FFFFFF" underline="none" href="https://discord.com/api/oauth2/authorize?client_id=1078513836224692274&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20guilds.members.read">
                        <FontAwesomeIcon icon={faDiscord} style={{ paddingRight: '0.5em' }}/>
                        Log In with Discord
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default Login;
