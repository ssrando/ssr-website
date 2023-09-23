import {
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { useGetApi } from '../../../../controller/Hooks';
import { User } from '../../../../ApiTypes';

type RowProps = {
    user: User;
};
const Row = ({ user }: RowProps) => (
    <TableRow>
        <TableCell>
            <Avatar />
        </TableCell>
        <TableCell>{user.displayName}</TableCell>
    </TableRow>
);

const Admins = () => {
    const { data } = useGetApi<{ admins: User[]; superusers: User[] }>(
        '/api/superuser/admins/list',
    );
    if (!data) {
        return <div />;
    }
    return (
        <>
            <Typography>Admins</Typography>
            <TableContainer
                sx={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Table>
                    <TableBody>
                        {data.superusers.map((user) => (
                            <Row user={user} key={user.internalId} />
                        ))}
                        {data.admins.map((user) => (
                            <Row user={user} key={user.internalId} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Admins;
