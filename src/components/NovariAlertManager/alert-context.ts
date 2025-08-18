import { createContext } from 'react';

export type AlertVariant = 'error' | 'info' | 'warning' | 'success';

export interface AlertItem {
    id: number;
    message: string;
    header?: string;
    variant: AlertVariant;
}

export type AddAlertInput = Omit<AlertItem, 'id'>;

export type AlertContextType = {
    alerts: AlertItem[];
    addAlert: (alert: AddAlertInput, opts?: { autoDismissMs?: number }) => number;
    removeAlert: (id: number) => void;
    clearAlerts: () => void;
};

export const AlertContext = createContext<AlertContextType | null>(null);
