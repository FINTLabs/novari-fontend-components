// src/hooks/useAlertManager.ts
import { useEffect, useState, useCallback } from 'react';
import type { AlertType } from '../components/NovariAlertManager';

export interface UseAlertManagerConfig {
    maxAlerts?: number;        // default 3
    autoRemoveDelay?: number;  // default 10000ms
}

export function useAlertManager(
    initialAlerts: AlertType[] = [],
    config: UseAlertManagerConfig = {}
) {
    const { maxAlerts = 3, autoRemoveDelay = 10000 } = config;
    const [alerts, setAlerts] = useState<AlertType[]>(() =>
        initialAlerts.slice(-maxAlerts)
    );

    // whenever initialAlerts changes we reset and re-schedule removals
    useEffect(() => {
        setAlerts(initialAlerts.slice(-maxAlerts));
        initialAlerts.forEach(alert => {
            setTimeout(() => {
                setAlerts(prev => prev.filter(a => a.id !== alert.id));
            }, autoRemoveDelay);
        });
    }, [initialAlerts, maxAlerts, autoRemoveDelay]);

    // programmatic add
    const addAlert = useCallback((a: Omit<AlertType,'id'>) => {
        const withId: AlertType = { ...a, id: Date.now() };
        setAlerts(prev => [...prev.slice(-(maxAlerts - 1)), withId]);
        setTimeout(() => {
            setAlerts(prev => prev.filter(x => x.id !== withId.id));
        }, autoRemoveDelay);
    }, [maxAlerts, autoRemoveDelay]);

    // manual remove
    const removeAlert = useCallback((id: number) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, []);

    return { alerts, addAlert, removeAlert } as const;
}
