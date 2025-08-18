import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, BodyShort, VStack } from '@navikt/ds-react';
import { AlertContext, AlertItem, AddAlertInput, AlertContextType } from './alert-context';

export type AlertProviderProps = {
    children: React.ReactNode;
    max?: number;
    autoDismissMs?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    containerStyle?: React.CSSProperties;
};

export function NovariAlertProvider({
    children,
    max = 3,
    autoDismissMs = 10000,
    position = 'top-right',
    containerStyle,
}: AlertProviderProps) {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const timersRef = useRef<Map<number, number>>(new Map());

    const removeAlert = useCallback((id: number) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
        const t = timersRef.current.get(id);
        if (t) {
            window.clearTimeout(t);
            timersRef.current.delete(id);
        }
    }, []);

    const addAlert = useCallback(
        (alert: AddAlertInput, opts?: { autoDismissMs?: number }) => {
            const id = Date.now() + Math.floor(Math.random() * 1000);
            setAlerts((prev) => {
                let next = [...prev, { id, ...alert }];
                if (next.length > max) next = next.slice(next.length - max);
                return next;
            });

            const ttl = opts?.autoDismissMs ?? autoDismissMs;
            if (ttl && ttl > 0) {
                const timer = window.setTimeout(() => removeAlert(id), ttl);
                timersRef.current.set(id, timer);
            }
            return id;
        },
        [autoDismissMs, max, removeAlert]
    );

    const clearAlerts = useCallback(() => {
        timersRef.current.forEach((t) => window.clearTimeout(t));
        timersRef.current.clear();
        setAlerts([]);
    }, []);

    useEffect(() => () => clearAlerts(), [clearAlerts]);

    const value: AlertContextType = useMemo(
        () => ({ alerts, addAlert, removeAlert, clearAlerts }),
        [alerts, addAlert, removeAlert, clearAlerts]
    );

    const posStyle: React.CSSProperties = useMemo(() => {
        const base: React.CSSProperties = { position: 'fixed', zIndex: 1000, margin: 0 };
        switch (position) {
            case 'top-right':
                return { ...base, top: '5rem', right: '1rem' };
            case 'top-left':
                return { ...base, top: '5rem', left: '1rem' };
            case 'bottom-right':
                return { ...base, bottom: '1rem', right: '1rem' };
            case 'bottom-left':
                return { ...base, bottom: '1rem', left: '1rem' };
            default:
                return base;
        }
    }, [position]);

    return (
        <AlertContext.Provider value={value}>
            {children}
            <VStack gap="4" style={{ ...posStyle, ...containerStyle }}>
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        variant={alert.variant}
                        closeButton
                        size="small"
                        onClose={() => removeAlert(alert.id)}>
                        {alert.header && (
                            <BodyShort size="small" style={{ fontWeight: 'bold' }}>
                                {alert.header}
                            </BodyShort>
                        )}
                        <BodyShort size="small">{alert.message}</BodyShort>
                    </Alert>
                ))}
            </VStack>
        </AlertContext.Provider>
    );
}
