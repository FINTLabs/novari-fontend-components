import { useEffect, useState } from 'react';
import { NovariSnackbarItem } from '../components/NovariSnackbar';
import { ApiResponse } from '../api/NovariApiManager';

export function useAlerts<T>(initialAlerts: NovariSnackbarItem[], actionData?: ApiResponse<T>) {
    const [alertState, setAlertState] = useState<NovariSnackbarItem[]>(initialAlerts);

    useEffect(() => {
        if (actionData) {
            const newAlert: NovariSnackbarItem = {
                id: Date.now().toString(),
                variant: actionData.variant || 'success',
                message: actionData.message || 'Handlingen fullført.',
            };
            setAlertState((prevAlerts) => [...prevAlerts, newAlert]);
        }
    }, [actionData]);

    const handleCloseItem = (id: string) => {
        setAlertState((prev) =>
            prev.map((item) => (item.id === id ? { ...item, open: false } : item))
        );
    };

    return {
        alertState,
        handleCloseItem,
        setAlertState,
    };
}
