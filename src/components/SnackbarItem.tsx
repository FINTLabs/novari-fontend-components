import { useEffect } from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import type { NovariSnackbarItem } from './NovariSnackbar';

interface SnackbarItemProps {
    item: NovariSnackbarItem;
    autoHideDuration: number;
    onCloseItem?: (id: string) => void;
}

const SnackbarItem = ({ item, autoHideDuration, onCloseItem }: SnackbarItemProps) => {
    useEffect(() => {
        if (!item.open) return;

        const timer = setTimeout(() => {
            onCloseItem?.(item.id);
        }, autoHideDuration);

        return () => clearTimeout(timer);
    }, [item.id, item.open, autoHideDuration, onCloseItem]);

    if (!item.open) return null;

    return (
        <Alert
            key={item.id}
            variant={item.variant ?? 'info'}
            className="relative mb-2"
            closeButton
            onClose={() => onCloseItem?.(item.id)}>
            <div>
                {item.header && (
                    <Heading spacing size="small" level="3">
                        {item.header}
                    </Heading>
                )}
                {item.message}
            </div>
        </Alert>
    );
};

export default SnackbarItem;
