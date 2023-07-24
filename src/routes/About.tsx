import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import { useGetApi } from '../controller/Hooks';
import { DynamicDataTyped } from '../ApiTypes';

// const randoDevs = [
//     'lepelog',
//     'cjs07',
//     'CovenEsme',
//     'Muzugalium',
//     'YourAverageLink',
//     'peppernicus',
//     'azer67',
//     'NULL',
// ];

type SocialLink = {
    name: string;
    link: string;
};

type Contributor = {
    name: string;
    links: SocialLink[];
    details?: string[];
};

const SocialIcon = ({ name, link }: { name: string; link: string }) => (
    <IconButton
        size="small"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
    >
        <FontAwesomeIcon icon={['fab', name as IconName]} />
    </IconButton>
);

const About = () => {
    const [gatewayVersion, setGatewayVersion] = useState('');
    useEffect(() => {
        const getVersion = async () => {
            const res = await fetch('/api/version');
            const version = await res.text();
            setGatewayVersion(version);
        };

        getVersion();
    });
    const { data: siteDevs } = useGetApi<DynamicDataTyped<Contributor>[]>(
        '/api/dynamicdata/contributors',
    );

    const { data: randoDevs } = useGetApi<DynamicDataTyped<Contributor>[]>(
        '/api/dynamicdata/randodevs',
    );

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold' }}>
                Website Development
            </Typography>
            {(!siteDevs || siteDevs.length === 0) && (
                <Typography>No contributors defined.</Typography>
            )}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    gap: '2em',
                }}
            >
                <Box sx={{ flexGrow: 1 }} />
                {siteDevs &&
                    siteDevs.map((dataItem) => (
                        <Box sx={{ diplay: 'block' }}>
                            <Typography key={dataItem.id}>
                                {dataItem.data.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {dataItem.data.links.map((link) => (
                                    <SocialIcon
                                        key={`${dataItem.id}-${link.name}`}
                                        name={link.name}
                                        link={link.link}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
                <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Typography sx={{ fontWeight: 'bold', pt: '1em' }}>
                Rando Developers
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}
            >
                {(!randoDevs || randoDevs.length === 0) && (
                    <Typography>No contributors defined.</Typography>
                )}
                {randoDevs &&
                    randoDevs.map((dataItem) => (
                        <Box sx={{ diplay: 'block' }}>
                            <Typography key={dataItem.id}>
                                {dataItem.data.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {dataItem.data.links.map((link) => (
                                    <SocialIcon
                                        key={`${dataItem.id}-${link.name}`}
                                        name={link.name}
                                        link={link.link}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
            </Box>
            <Typography sx={{ pt: '1em' }}>
                Powered by{' '}
                <Link
                    href="https://github.com/cjs8487/CommunityGateway"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CommunityGateway
                </Link>{' '}
                version {gatewayVersion}
            </Typography>
        </Box>
    );
};

export default About;
