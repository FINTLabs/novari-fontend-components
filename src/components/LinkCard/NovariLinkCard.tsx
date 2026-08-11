import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { cloneElement } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import './NovariLinkCard.css';

type NovariLinkCardIcon = ReactElement<{
    'aria-hidden'?: boolean;
    color?: string;
    fontSize?: string;
    title?: string;
}>;

export type NovariLinkCardCssVariables = {
    '--novari-link-card-icon-color'?: string;
    '--novari-link-card-icon-foreground-color'?: string;
    '--novari-link-card-arrow-color'?: string;
    '--novari-link-card-hover-color'?: string;
};

export type NovariLinkCardProps = {
    title: string;
    description?: string;
    link: string;
    Icon?: NovariLinkCardIcon;
    hover?: boolean;
    border?: boolean;
    className?: string;
    style?: CSSProperties & NovariLinkCardCssVariables;
};

export const NovariLinkCard = ({
    title,
    description,
    link,
    Icon,
    hover,
    border,
    className,
    style,
}: NovariLinkCardProps) => {
    const iconColor =
        'var(--novari-link-card-icon-color, var(--link-card-icon-color, var(--ax-bg-accent-soft)))';
    const iconForegroundColor =
        'var(--novari-link-card-icon-foreground-color, var(--link-card-icon-foreground-color, var(--ax-text-default)))';
    const arrowColor =
        'var(--novari-link-card-arrow-color, var(--link-card-arrow-color, var(--ax-text-accent-subtle)))';
    const classes = ['novari-link-card', hover ? 'novari-link-card--hover-color' : '', className]
        .filter(Boolean)
        .join(' ');

    return (
        <Box
            as="a"
            padding="space-28"
            borderRadius="8"
            href={link}
            className={classes}
            borderWidth={border ? '1' : undefined}
            style={style}>
            <VStack gap="space-12" height="100%">
                <HStack wrap={false} gap="space-12" width="100%" align="center">
                    {Icon && (
                        <Box
                            className="circle"
                            borderRadius="full"
                            padding="space-8"
                            style={{ backgroundColor: iconColor }}
                            width="3.5rem"
                            height="3.5rem">
                            {cloneElement(Icon, {
                                'aria-hidden': true,
                                fontSize: '2.5rem',
                                color: iconForegroundColor,
                            })}
                        </Box>
                    )}
                    <Heading level="2" size="small">
                        {title}
                    </Heading>
                    {!description && (
                        <VStack marginInline="auto space-0" align="center">
                            <ArrowRightIcon
                                aria-hidden
                                color={arrowColor}
                                className="arrow-icon"
                                fontSize="2rem"
                            />
                        </VStack>
                    )}
                </HStack>
                {description && (
                    <VStack gap="space-4" height="100%">
                        <hr style={{ backgroundColor: arrowColor }} />
                        <HStack wrap={false} gap="space-8" height="100%" justify="space-between">
                            <BodyShort size="small">{description}</BodyShort>
                            <HStack height="100%" align="center">
                                <ArrowRightIcon
                                    aria-hidden
                                    color={arrowColor}
                                    className="arrow-icon"
                                    fontSize="2rem"
                                />
                            </HStack>
                        </HStack>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

export default NovariLinkCard;
