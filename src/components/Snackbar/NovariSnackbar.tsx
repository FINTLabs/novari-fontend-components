import { useEffect, useMemo, useRef, useState } from 'react';
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
    open?: boolean; // optional signal; if explicitly false on props it will be removed
    show?: boolean; // eligible to be queued (default true)
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
    /** New items to enqueue; the component owns lifecycle thereafter */
    items: NovariSnackbarItem[];
    /** Max concurrently visible alerts (default 3) */
    maxVisible?: number;
}

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
    position = 'top-right',
    className = '',
    size = 'small',
    items,
    maxVisible = 3,
}: NovariSnackbarProps) => {
    /**
     * Internal queue is the single source of truth after items are accepted.
     * We only append/update from props; we never require the parent to remove.
     */
    const [queue, setQueue] = useState<NovariSnackbarItem[]>([]);
    const [visibleItems, setVisibleItems] = useState<NovariSnackbarItem[]>([]);
    const seenIds = useRef<Set<string>>(new Set());
    const closedByUserIds = useRef<Set<string>>(new Set()); // Track items explicitly closed by user

    // Accept/merge incoming items without requiring parent cleanup
    useEffect(() => {
        setQueue((prev) => {
            // If items is empty, clear the queue and reset tracking
            if (!items?.length) {
                seenIds.current.clear();
                closedByUserIds.current.clear();
                return [];
            }

            const byId = new Map(prev.map((p) => [p.id, p]));
            for (const incoming of items) {
                // Skip items that were explicitly closed by the user
                if (closedByUserIds.current.has(incoming.id)) {
                    continue;
                }

                // If parent explicitly sends open === false, treat as a cancel/remove request.
                if (incoming.open === false) {
                    byId.delete(incoming.id);
                    seenIds.current.delete(incoming.id);
                    closedByUserIds.current.delete(incoming.id);
                    continue;
                }
                // Upsert (merge) so later prop updates can refresh text/variant/header
                const existing = byId.get(incoming.id);
                const next = existing ? { ...existing, ...incoming } : { ...incoming, open: true };
                byId.set(incoming.id, next);
                seenIds.current.add(incoming.id);
            }
            return Array.from(byId.values());
        });
    }, [items]);

    // Eligible = internal queue where show !== false and open !== false
    const eligible = useMemo(
        () => queue.filter((i) => (i.show ?? true) && (i.open ?? true)),
        [queue]
    );

    // Maintain up to maxVisible visible items; refill from eligible
    useEffect(() => {
        setVisibleItems((prev) => {
            // Keep items that still exist and are eligible
            const stillVisible = prev.filter((p) => eligible.some((e) => e.id === p.id));
            const deficit = Math.max(maxVisible - stillVisible.length, 0);
            if (deficit <= 0) return stillVisible;

            // Pull next eligible in insertion order (queue order)
            const stillVisibleIds = new Set(stillVisible.map((s) => s.id));
            const next = eligible.filter((e) => !stillVisibleIds.has(e.id)).slice(0, deficit);
            return [...stillVisible, ...next];
        });
    }, [eligible, maxVisible]);

    const handleInternalClose = (id: string) => {
        // 1) Mark as closed by user to prevent re-adding
        closedByUserIds.current.add(id);

        // 2) Remove from visible immediately to make room
        setVisibleItems((prev) => prev.filter((i) => i.id !== id));

        // 3) Remove from queue entirely (ownership is internal now)
        setQueue((prev) => prev.filter((i) => i.id !== id));
        seenIds.current.delete(id);

        // 4) Refill visible from remaining eligible handled in next effect tick,
        //    but we can proactively try to top up now for snappier UX:
        setVisibleItems((prev) => {
            const afterRemove = prev.filter((i) => i.id !== id);
            const deficit = Math.max(maxVisible - afterRemove.length, 0);
            if (deficit <= 0) return afterRemove;

            const afterRemoveIds = new Set(afterRemove.map((v) => v.id));
            const nextFromQueue = eligible
                .filter((e) => !afterRemoveIds.has(e.id) && e.id !== id)
                .slice(0, deficit);
            return [...afterRemove, ...nextFromQueue];
        });
    };

    const moreCount = Math.max(eligible.length - visibleItems.length, 0);

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 50,
                transition: 'all 0.2s ease-in-out',
                animation: 'fadeIn 0.3s',
                ...positionStyles[position],
            }}
            className={className}
            aria-live="polite"
            aria-atomic="false"
            role="region">
            {visibleItems.map((item) => (
                <SnackbarAlertItem
                    key={item.id}
                    item={{ ...item, open: true }}
                    autoHideDuration={autoHideDuration}
                    onCloseItem={handleInternalClose}
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
                    }}>
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
    onCloseItem: (id: string) => void;
    size?: 'small' | 'medium';
}

const SnackbarAlertItem = ({ item, autoHideDuration, onCloseItem, size }: SnackbarItemProps) => {
    // Auto-hide per item
    useEffect(() => {
        if (!item.open) return;
        const timer = setTimeout(() => onCloseItem(item.id), autoHideDuration);
        return () => clearTimeout(timer);
    }, [item.id, item.open, autoHideDuration, onCloseItem]);

    if (!item.open) return null;

    //TODO: Rewrite to use NovariSnackbarItem component

    return (
        <Alert
            variant={item.variant ?? 'info'}
            size={size || 'small'}
            style={{ position: 'relative', marginBottom: '0.5rem' }}
            closeButton
            onClose={() => onCloseItem(item.id)}>
            {item.header && (
                <Heading spacing size="small" level="3">
                    {item.header}
                </Heading>
            )}
            {item.message}
        </Alert>
    );
};
