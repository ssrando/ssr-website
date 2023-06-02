import { Button, ButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
    to: string;
} & ButtonProps<typeof Link>;

const LinkButton = (props: PropsWithChildren<LinkButtonProps>) => (
    <Button component={Link} color="inherit" {...props} />
);

export default LinkButton;
