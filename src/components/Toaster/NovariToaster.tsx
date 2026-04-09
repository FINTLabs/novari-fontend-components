import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button, InlineMessage } from '@navikt/ds-react';

export type NovariToasterStatus = 'info' | 'success' | 'warning' | 'error';
export type NovariToasterPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';

export interface NovariToasterItem {
    id: string;
    open?: boolean; // optional signal; if explicitly false on props it will be removed
    show?: boolean; // eligible to be queued (default true)
    message: string;
    status?: NovariToasterStatus;
    title?: string;
}

export interface NovariToasterProps {
    /** Auto-close duration in ms */
    autoHideDuration?: number;
    /** Screen position */
    position?: NovariToasterPosition;
    /** Wrapper class */
    className?: string;
    /** Size of each message */
    size?: 'small' | 'medium';
    /** New items to enqueue; the component owns lifecycle thereafter */
    items: NovariToasterItem[];
    /** Max concurrently visible messages (default 3) */
    maxVisible?: number;
    /** Live region role for dynamic updates */
    role?: 'status' | 'alert';
}

const positionStyles: Record<NovariToasterPosition, CSSProperties> = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
    'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
};

const statusBackgroundMap: Record<NovariToasterStatus, 'info-soft' | 'success-soft' | 'warning-soft' | 'danger-soft'> =
    {
        info: 'info-soft',
        success: 'success-soft',
        warning: 'warning-soft',
        error: 'danger-soft',
    };

const NovariToaster = ({
    autoHideDuration = 4000,
    position = 'top-right',
    className = '',
    size = 'small',
    items,
    maxVisible = 3,
    role = 'status',
}: NovariToasterProps) => {
    const [queue, setQueue] = useState<NovariToasterItem[]>([]);
    const [visibleItems, setVisibleItems] = useState<NovariToasterItem[]>([]);
    const dismissedIds = useRef<Set<string>>(new Set());

    const dismissItem = (id: string) => {
        dismissedIds.current.add(id);
        setVisibleItems((prev) => prev.filter((p) => p.id !== id));
        setQueue((prev) => prev.filter((p) => p.id !== id));
    };

    // Accept/merge incoming items without requiring parent cleanup
    useEffect(() => {
        setQueue((prev) => {
            if (!items?.length) {
                dismissedIds.current.clear();
                return [];
            }

            const byId = new Map(prev.map((p) => [p.id, p]));
            for (const incoming of items) {
                // If parent explicitly sends open === false, treat as remove request.
                if (incoming.open === false) {
                    byId.delete(incoming.id);
                    dismissedIds.current.delete(incoming.id);
                    continue;
                }

                // Don't re-add items that have already timed out in this lifecycle.
                if (dismissedIds.current.has(incoming.id)) {
                    continue;
                }

                const existing = byId.get(incoming.id);
                const next = existing ? { ...existing, ...incoming } : { ...incoming, open: true };
                byId.set(incoming.id, next);
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
            const stillVisible = prev.filter((p) => eligible.some((e) => e.id === p.id));
            const deficit = Math.max(maxVisible - stillVisible.length, 0);
            if (deficit <= 0) return stillVisible;

            const stillVisibleIds = new Set(stillVisible.map((s) => s.id));
            const next = eligible.filter((e) => !stillVisibleIds.has(e.id)).slice(0, deficit);
            return [...stillVisible, ...next];
        });
    }, [eligible, maxVisible]);

    // Auto-hide each visible item
    useEffect(() => {
        if (!visibleItems.length) return;

        const timers = visibleItems.map((item) =>
            setTimeout(() => {
                dismissItem(item.id);
            }, autoHideDuration)
        );

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [visibleItems, autoHideDuration]);

    const moreCount = Math.max(eligible.length - visibleItems.length, 0);

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 50,
                transition: 'all 0.2s ease-in-out',
                animation: 'fadeIn 0.3s',
                width: 'min(28rem, calc(100vw - 2rem))',
                ...positionStyles[position],
            }}
            className={className}
            aria-live={role === 'alert' ? 'assertive' : 'polite'}
            aria-atomic="false"
            role={role}>
            {visibleItems.map((item) => (
                <div key={item.id} style={{ marginBottom: '0.5rem' }}>
                    <Box
                        background={statusBackgroundMap[item.status ?? 'info']}
                        borderWidth="1"
                        borderColor="neutral-subtle"
                        borderRadius="8"
                        padding="space-12">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <InlineMessage status={item.status ?? 'info'} size={size}>
                                    {item.title ? (
                                        <>
                                            <strong>{item.title}</strong> {item.message}
                                        </>
                                    ) : (
                                        item.message
                                    )}
                                </InlineMessage>
                            </div>
                            <Button
                                size="xsmall"
                                variant="tertiary-neutral"
                                icon={<XMarkIcon aria-hidden fontSize="1.1rem" />}
                                onClick={() => dismissItem(item.id)}
                                aria-label="Lukk melding"
                            />
                        </div>
                    </Box>
                </div>
            ))}

            {moreCount > 0 && (
                <div
                    style={{
                        marginTop: '0.5rem',
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        textAlign: 'center',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '0.5rem',
                        padding: '0.5rem',
                    }}>
                    +{moreCount} more
                </div>
            )}
        </div>
    );
};

export default NovariToaster;
