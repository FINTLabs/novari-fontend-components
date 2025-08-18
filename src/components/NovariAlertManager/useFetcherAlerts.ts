import { useEffect } from 'react';
import { useAlerts } from './useAlerts';

export function useFetcherAlerts(
    fetcherData: any,
    fetcherState: string,
    deleteName?: string | null
) {
    const { addAlert } = useAlerts();

    useEffect(() => {
        if (deleteName) {
            addAlert({
                variant: 'warning',
                message: `Element '${deleteName}' er slettet`,
                header: 'Slettingsvarsel',
            });
        }
    }, [deleteName, addAlert]);

    useEffect(() => {
        if (fetcherState === 'idle' && fetcherData?.message) {
            addAlert({
                variant: fetcherData.variant ?? 'success',
                message: fetcherData.message ?? 'Handlingen fullført.',
                header: fetcherData.header ?? undefined,
            });
        }
    }, [fetcherData, fetcherState, addAlert]);
}
