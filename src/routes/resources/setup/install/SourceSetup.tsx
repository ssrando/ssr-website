import { Box, Typography, styled } from '@mui/material';

const Code = styled('code')`
    & {
        display: block;
        background: rgb(22, 27, 34);
        color: white;
        text-align: left;
        padding: 15px;
        border-radius: 10px;
        margin: 10px;
    }
    &.inline {
        display: inline;
        padding: 3px;
        border-radius: 2px;
        margin: 0;
    }
`;

const SourceSetup = () => (
    <Box sx={{ paddingTop: '35px' }}>
        <Typography variant="h6">Installing From Source</Typography>
        <Typography variant="body2">
            Running from source requires Python (version 3.9 or higher) and pip,
            which should be installed along with Python.
        </Typography>
        <Typography variant="body2" component="ol">
            <li>Install git</li>
            <li>
                Navigate to the directory you want to install the randomizer in.
                It is recommended that you install the randomizer it&aposs own
                folder.
            </li>
            <li>
                Clone the repository and enter the new directorry
                <Code>
                    {' '}
                    git clone https://github.com/ssrando/ssrando
                    <br />
                    cd ssrando
                </Code>
            </li>
            <li>
                Choose a version to run. <Code className="inline">main</Code>{' '}
                and <Code className="inline">beta-features</Code> are generally
                recommended for most users. If you want a specific release,
                there are tags (<Code className="inline">vx.x.x</Code>) for each
                one. Async versions are also tagged (
                <Code className="inline">async-[month]-[yy]</Code>).
            </li>
            <li>Install poetry</li>
            <li>Install dependencies</li>
            <li>Run the randomizer</li>
        </Typography>
    </Box>
);

export default SourceSetup;
