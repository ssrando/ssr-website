import {
    Avatar,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import InlineAvatar from '../../../../components/InlineAvatar';

const Admins = () => {
    const x = 7;
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
                        <TableRow>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>cjs07</TableCell>
                            <TableCell>superuser</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>alkalineace</TableCell>
                            <TableCell>
                                <InlineAvatar />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>mario_runner</TableCell>
                            <TableCell>
                                <InlineAvatar />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Admins;
