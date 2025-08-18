import { useContext } from 'react';
import { AlertContext } from './alert-context';

export function useAlerts() {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error('useAlerts must be used within a <NovariAlertProvider>');
    return ctx;
}
