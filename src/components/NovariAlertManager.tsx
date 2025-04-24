import React, { useEffect, useState } from 'react';
import { Alert, BodyShort, VStack } from '@navikt/ds-react';

export interface AlertType {
    id: number;
    message: string;
    header?: string;
    variant: 'error' | 'info' | 'warning' | 'success';
}

export interface AlertManagerProps {
    alerts: AlertType[];
    maxAlerts?: number;
    autoRemoveDelay?: number;
    position?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
}

export const NovariAlertManager: React.FC<AlertManagerProps> = ({ 
    alerts,
    maxAlerts = 3,
    autoRemoveDelay = 10000,
    position = { top: '1rem', right: '1rem' }
}) => {
    const [displayAlerts, setDisplayAlerts] = useState<AlertType[]>([]);

    useEffect(() => {
        if (alerts.length) {
            // Process all new alerts that aren't already displayed
            const newAlerts = alerts.filter(alert => 
                !displayAlerts.some(displayAlert => displayAlert.id === alert.id)
            );

            newAlerts.forEach(newAlert => {
                setDisplayAlerts((prev) => {
                    const updatedAlerts = [...prev, newAlert];
                    return updatedAlerts.slice(-maxAlerts); // Keep only the last maxAlerts
                });

                setTimeout(() => {
                    setDisplayAlerts((prev) => 
                        prev.filter((alert) => alert.id !== newAlert.id)
                    );
                }, autoRemoveDelay);
            });
        }
    }, [alerts, maxAlerts, autoRemoveDelay]);

    return (
        <VStack
            gap="4"
            style={{
                position: 'fixed',
                zIndex: 1000,
                ...position
            }}>
            {displayAlerts.map((alert) => (
                <Alert
                    key={alert.id}
                    variant={alert.variant}
                    closeButton
                    size="small"
                    onClose={() =>
                        setDisplayAlerts((prev) => 
                            prev.filter((a) => a.id !== alert.id)
                        )
                    }>
                    {alert.header && (
                        <BodyShort size="small" style={{ fontWeight: 'bold' }}>
                            {alert.header}
                        </BodyShort>
                    )}
                    <BodyShort size="small">{alert.message}</BodyShort>
                </Alert>
            ))}
        </VStack>
    );
};

export default NovariAlertManager;