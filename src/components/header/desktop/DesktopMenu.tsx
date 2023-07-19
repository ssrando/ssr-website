import { Box } from '@mui/material';
import HeaderMenu from './HeaderMenu';
import { fullMenu } from '../HeaderData';
import UserMenu from '../UserMenu';
import logo from '../icon.ico';
import LinkButton from '../../LinkButton';

const DesktopMenu = () => (
    <>
        <LinkButton to="/">
            <img src={logo} alt="icon" height={32} />
            <Box sx={{ pl: '0.8em' }}>Skyward Sword Randomizer</Box>
        </LinkButton>
        <Box sx={{ flexGrow: 1 }} />
        {fullMenu.map((menu) => (
            <HeaderMenu
                menuText={menu.itemText}
                items={menu.subitems ?? []}
                to={menu.to}
                external={menu.external}
            />
        ))}
        <UserMenu />
    </>
);

export default DesktopMenu;
