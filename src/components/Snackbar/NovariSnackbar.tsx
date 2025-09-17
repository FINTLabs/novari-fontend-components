import { useEffect, useMemo, useState } from 'react';
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
    open?: boolean; // for lifecycle (auto-hide / parent close)
    show?: boolean; // NEW: explicitly eligible to be shown in the queue
    message: string;
    variant?: NovariSnackbarVariant;
    header?: string;
}

export interface NovariSnackbarProps {
    /** Auto-close duration in ms */
    autoHideDuration?: number;
    /** Screen position */
    position?: NovariSnackbarPosition;
    /** Wrapper class */
    className?: string;
    /** Size of each alert */
    size?: 'small' | 'medium';
    /** Queue of items */
    items: NovariSnackbarItem[];
    /** Called when an alert closes */
    onCloseItem?: (id: string) => void;
}

const positionStyles: Record<NovariSnackbarPosition, React.CSSProperties> = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
    'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
};

const VISIBLE_MAX = 3;

const NovariSnackbar = ({
    autoHideDuration = 4000,
    position = 'top-left',
    className = '',
    size = 'small',
    items,
    onCloseItem,
}: NovariSnackbarProps) => {
    const [visibleItems, setVisibleItems] = useState<NovariSnackbarItem[]>([]);

    // Only count/queue items with show === true (default true) and open !== false
    const eligible = useMemo(
        () => items.filter((i) => (i.show ?? true) && (i.open ?? true)),
        [items]
    );

    // Keep up to 3 visible; refill from the eligible queue in order
    useEffect(() => {
        setVisibleItems((prev) => {
            const stillVisible = prev.filter((p) => eligible.some((e) => e.id === p.id));
            const deficit = Math.max(VISIBLE_MAX - stillVisible.length, 0);
            const next = eligible
                .filter((e) => !stillVisible.some((s) => s.id === e.id))
                .slice(0, deficit);
            return [...stillVisible, ...next];
        });
    }, [eligible]);

    const handleClose = (id: string) => {
        // Remove from local visible set and pull next eligible
        setVisibleItems((prev) => {
            const afterRemove = prev.filter((i) => i.id !== id);
            const deficit = Math.max(VISIBLE_MAX - afterRemove.length, 0);
            const nextFromQueue = eligible
                .filter((e) => !afterRemove.some((v) => v.id === e.id))
                .slice(0, deficit);
            return [...afterRemove, ...nextFromQueue];
        });

        // Let parent know so it can set open=false or remove the item
        onCloseItem?.(id);
    };

    const moreCount = Math.max(eligible.length - visibleItems.length, 0); // counts ONLY show===true

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 50,
                transition: 'all 0.2s ease-in-out',
                animation: 'fadeIn 0.3s',
                ...positionStyles[position],
            }}
            className={className}>
            {visibleItems.map((item) => (
                <SnackbarAlertItem
                    key={item.id}
                    item={{ ...item, open: true }}
                    autoHideDuration={autoHideDuration}
                    onCloseItem={handleClose}
                    size={size}
                />
            ))}

            {moreCount > 0 && (
                <div
                    style={{
                        marginTop: '0.5rem',
                        fontSize: '0.85rem',
                        color: '#6b7280', // gray-500
                        textAlign: 'center',
                        backgroundColor: '#f3f4f6', // gray-100
                        borderRadius: '0.5rem',
                        padding: '0.5rem',
                    }}
                    aria-live="polite">
                    +{moreCount} more
                </div>
            )}
        </div>
    );
};

export default NovariSnackbar;

interface SnackbarItemProps {
    item: NovariSnackbarItem;
    autoHideDuration: number;
    onCloseItem?: (id: string) => void;
    size?: 'small' | 'medium';
}

const SnackbarAlertItem = ({ item, autoHideDuration, onCloseItem, size }: SnackbarItemProps) => {
    useEffect(() => {
        if (!item.open) return;
        const timer = setTimeout(() => onCloseItem?.(item.id), autoHideDuration);
        return () => clearTimeout(timer);
    }, [item.id, item.open, autoHideDuration, onCloseItem]);

    if (!item.open) return null;

    return (
        <Alert
            variant={item.variant ?? 'info'}
            size={size || 'small'}
            style={{ position: 'relative', marginBottom: '0.5rem' }}
            closeButton
            onClose={() => onCloseItem?.(item.id)}>
            {item.header && (
                <Heading spacing size="small" level="3">
                    {item.header}
                </Heading>
            )}
            {item.message}
        </Alert>
    );
};
