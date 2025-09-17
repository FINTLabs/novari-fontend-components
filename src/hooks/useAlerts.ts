import { useEffect, useState } from 'react';
import { NovariSnackbarItem } from '../components/Snackbar/NovariSnackbar';
import { ApiResponse } from '../api/NovariApiManager';

//TODO: DELETE THIS HOOK!
export function useAlerts<T>(
    initialAlerts: NovariSnackbarItem[],
    fetcherData?: ApiResponse<T>,
    fetcherState?: string
) {
    const [alertState, setAlertState] = useState<NovariSnackbarItem[]>(initialAlerts);

    useEffect(() => {
        if (fetcherData && fetcherState === 'idle') {
            const newAlert: NovariSnackbarItem = {
                id: Date.now().toString(),
                variant: fetcherData.variant || 'success',
                message: fetcherData.message || 'Handlingen fullført.',
            };
            setAlertState((prevAlerts) => [...prevAlerts, newAlert]);
        }
    }, [fetcherData, fetcherState]);

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
