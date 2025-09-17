import { Alert, Heading } from '@navikt/ds-react';

export type NovariSnackbarVariant = 'info' | 'success' | 'warning' | 'error';

// *** This code is never actually used, this is just a -hack- to
// *** make the storybook more useful. You're welcome.

export interface NovariSnackbarItemProps {
    id: string;
    /** Message  */
    message: string;
    /** Visual style one of : 'info' | 'success' | 'warning' | 'error' */
    variant?: NovariSnackbarVariant;
    /** Optional header */
    header?: string;
    /** @ignore */
    size?: 'small' | 'medium';
    /** @ignore */
    onCloseItem: (id: string) => void;
}

const NovariSnackbarItem = ({
    id,
    message,
    variant,
    header,
    size,
    onCloseItem,
}: NovariSnackbarItemProps) => {
    return (
        <Alert
            variant={variant ?? 'info'}
            size={size || 'small'}
            style={{ position: 'relative', marginBottom: '0.5rem' }}
            closeButton
            onClose={() => onCloseItem(id)}>
            {header && (
                <Heading spacing size="small" level="3">
                    {header}
                </Heading>
            )}
            {message}
        </Alert>
    );
};

export default NovariSnackbarItem;
