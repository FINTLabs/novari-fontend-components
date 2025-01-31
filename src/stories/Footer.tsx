import React from 'react';
import {Box, Heading, HStack, Link} from '@navikt/ds-react';
import {NovariIKS} from "../logo/NovariIKS";

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterProps {
    backgroundColor?: string;
    links: FooterLink[];
}

export const Footer = ({ backgroundColor = '#282c34', links }: FooterProps) => {
    return (
        <Box
            style={{
                padding: '2rem',
                marginTop: '2rem',
                backgroundColor,
                textAlign: 'center',
            }}>
            <HStack gap="4" align="center">
            <Heading level="2" size="medium" spacing>
                <Link href="http://novari.no" >
                    <NovariIKS width={"9em"}/>
                </Link>
            </Heading>


                    {links.map((link, index) => (
                        <React.Fragment key={index}>
                            <Link href={link.href} style={{ color: '#FCF5ED' }}>
                                {link.label}
                            </Link>
                            {index < links.length - 1 && <p style={{ color: '#FCF5ED' }}>|</p>}
                        </React.Fragment>
                    ))}
                </HStack>

        </Box>
    );
};
