import { useEffect } from 'react';
import { Alert, Heading } from '@navikt/ds-react';

export type NovariSnackbarVariant = 'info' | 'success' | 'warning' | 'error';
export type NovariSnackbarPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';

export interface NovariSnackbarItem {
    id: string;
    open?: boolean;
    message: string;
    variant?: NovariSnackbarVariant;
    header?: string;
}

export interface NovariSnackbar {
    autoHideDuration?: number;
    position?: NovariSnackbarPosition;
    className?: string;
    items: NovariSnackbarItem[];
    onCloseItem?: (id: string) => void;
}

// const positionClasses: Record<NovariSnackbarPosition, string> = {
//     'top-left': 'top-4 left-4',
//     'top-right': 'top-4 right-4',
//     'bottom-left': 'bottom-4 left-4',
//     'bottom-right': 'bottom-4 right-4',
//     'top-center': 'top-4 left-1/2 -translate-x-1/2',
//     'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
// };
const positionStyles: Record<NovariSnackbarPosition, React.CSSProperties> = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
    'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
};

const NovariSnackbar = ({
    autoHideDuration = 4000,
    position = 'top-left',
    className = '',
    items,
    onCloseItem,
}: NovariSnackbar) => {
    return (
        // <div
        //     className={`fixed z-50 transition-all animate-fadeIn ${
        //         positionClasses[position]
        //     }  ${className}`}>
        <div
            style={{
                position: 'fixed',
                zIndex: 50,
                transition: 'all 0.2s ease-in-out',
                animation: 'fadeIn 0.3s',
                ...positionStyles[position],
            }}
            className={className}>
            {items.map(
                (item) =>
                    (item.open ?? true) && (
                        <SnackbarAlertItem
                            key={item.id}
                            item={{ ...item, open: true }}
                            autoHideDuration={autoHideDuration}
                            onCloseItem={onCloseItem}
                        />
                    )
            )}
        </div>
    );
};

export default NovariSnackbar;

interface SnackbarItemProps {
    item: NovariSnackbarItem;
    autoHideDuration: number;
    onCloseItem?: (id: string) => void;
}

const SnackbarAlertItem = ({ item, autoHideDuration, onCloseItem }: SnackbarItemProps) => {
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
