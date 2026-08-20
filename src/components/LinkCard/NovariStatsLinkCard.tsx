import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, HStack, Loader, VStack } from '@navikt/ds-react';
import { useId } from 'react';
import type { AnchorHTMLAttributes, CSSProperties } from 'react';
import './NovariLinkCard.css';

export type NovariStatsLinkCardLink = {
    href: string;
    name: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    rel?: string;
};

export type NovariStatsLinkCardCssVariables = {
    '--novari-stats-link-card-error-border-color'?: string;
    '--novari-stats-link-card-error-color'?: string;
    '--novari-stats-link-card-link-background'?: string;
    '--novari-stats-link-card-link-background-hover'?: string;
    '--novari-stats-link-card-link-color'?: string;
};

export type NovariStatsLinkCardProps = {
    content: string;
    value?: number;
    link?: NovariStatsLinkCardLink;
    id?: string;
    loading?: boolean;
    loadingTitle?: string;
    error?: boolean;
    errorText?: string;
    className?: string;
    style?: CSSProperties & NovariStatsLinkCardCssVariables;
};

export const NovariStatsLinkCard = ({
    content,
    value,
    link,
    id,
    loading = false,
    loadingTitle = 'Venter...',
    error = false,
    errorText = 'Kunne ikke hente tall',
    className,
    style,
}: NovariStatsLinkCardProps) => {
    const generatedId = useId();
    const cardId = id ?? generatedId;
    const classes = [
        'novari-stats-link-card',
        error ? 'novari-stats-link-card--error' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const linkRel = link?.rel ?? (link?.target === '_blank' ? 'noopener noreferrer' : undefined);
    const hasValue = value !== undefined && value !== 0;

    return (
        <Box
            id={cardId}
            as="div"
            borderRadius="8"
            borderWidth="1"
            className={classes}
            style={style}>
            <VStack gap="space-0" justify="space-between" height="100%">
                <VStack
                    className="novari-stats-link-card__content"
                    height="100%"
                    justify="center"
                    align="center"
                    gap="space-8">
                    {error ? (
                        <BodyShort
                            id={`${cardId}-error`}
                            className="novari-stats-link-card__error"
                            size="small"
                            weight="semibold"
                            role="alert">
                            {errorText}
                        </BodyShort>
                    ) : loading ? (
                        <Box paddingBlock="space-4">
                            <Loader size="large" title={loadingTitle} transparent />
                        </Box>
                    ) : (
                        <Heading
                            level="2"
                            size="large"
                            id={`${cardId}-value`}
                            textColor={hasValue ? 'default' : 'subtle'}>
                            {value ?? 0}
                        </Heading>
                    )}
                    <Heading level="3" size="small" id={`${cardId}-description`}>
                        {content}
                    </Heading>
                </VStack>
                {link && (
                    <Box
                        className="novari-stats-link-card__link"
                        as="a"
                        href={link.href}
                        target={link.target}
                        rel={linkRel}
                        paddingInline="space-16">
                        <HStack
                            justify="center"
                            align="center"
                            height="100%"
                            width="100%"
                            wrap={false}
                            gap="space-16">
                            <BodyShort id={`${cardId}-btn`}>{link.name}</BodyShort>
                            <ArrowRightIcon className="arrow-icon" aria-hidden />
                        </HStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default NovariStatsLinkCard;
