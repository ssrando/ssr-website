import {
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import InlineAvatar from '../../../../components/InlineAvatar';

const Admins = () => {
    const admins = [
        {
            username: 'cjs07',
            source: 'superuser',
        },
        {
            username: 'alkalineace',
            source: {
                server: 'Racing',
                role: 'Staff',
            },
        },
        {
            username: 'mario_runner',
            source: {
                server: 'Racing',
                role: 'Staff',
            },
        },
    ];
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
                        {admins.map((admin) => (
                            <TableRow key={admin.username}>
                                <TableCell>
                                    <Avatar />
                                </TableCell>
                                <TableCell>{admin.username}</TableCell>
                                <TableCell>
                                    {typeof admin.source === 'string' ? (
                                        admin.source
                                    ) : (
                                        <InlineAvatar
                                            src=""
                                            alt="avatar image"
                                            caption={admin.source.role}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Admins;
