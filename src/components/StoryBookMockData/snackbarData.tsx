import { NovariSnackbarItem } from './NovariSnackbar';

export const sampleAlertsNoHeadings: NovariSnackbarItem[] = [
    {
        id: 'success-1',
        variant: 'success',
        message: 'Du kan nå legge til tilganger og komponenter.',
    },
    {
        id: 'info-1',
        variant: 'info',
        message: 'Det kan oppstå noe ustabilitet mellom 22:00 og 23:00.',
    },
    {
        id: 'warning-1',
        variant: 'warning',
        message: 'Noen felter er ikke fylt ut. Du må rette dette før innsending.',
    },
    {
        id: 'error-1',
        variant: 'error',
        message: 'Serveren svarte med en feil. Prøv igjen om noen minutter.',
    },
    {
        id: 'error-2',
        variant: 'error',
        message: 'Navnet må være unikt og følge riktig format.',
    },
];

export const sampleAlerts: NovariSnackbarItem[] = [
    {
        id: 'success-1',
        variant: 'success',
        header: 'Klienten ble opprettet',
        message: 'Du kan nå legge til tilganger og komponenter.',
    },
    {
        id: 'info-1',
        variant: 'info',
        header: 'Tjenesten oppdateres i kveld',
        message: 'Det kan oppstå noe ustabilitet mellom 22:00 og 23:00.',
    },
    {
        id: 'warning-1',
        variant: 'warning',
        header: 'Manglende metadata',
        message: 'Noen felter er ikke fylt ut. Du må rette dette før innsending.',
    },
    {
        id: 'error-1',
        variant: 'error',
        header: 'Feil ved lagring',
        message: 'Serveren svarte med en feil. Prøv igjen om noen minutter.',
    },
    {
        id: 'error-2',
        variant: 'error',
        header: 'Ugyldig klientnavn',
        message: 'Navnet må være unikt og følge riktig format.',
    },
];
