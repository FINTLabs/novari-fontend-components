import { ThemeIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { useTheme } from './useTheme';

/**
 * Icon-only theme switcher that toggles between light and dark theme.
 * Follows the Aksel pattern: https://aksel.nav.no/monster-maler/stotte/temabytte
 *
 * Must be used within a ThemeProvider.
 */
function NovariThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <Tooltip
            content={
                theme === 'dark' ? 'Endre til lyst tema' : 'Endre til mørkt tema'
            }
            placement="bottom"
        >
            <Button
                variant="secondary-neutral"
                data-color="neutral"
                icon={<ThemeIcon aria-hidden />}
                onClick={() =>
                    setTheme(theme === 'dark' ? 'light' : 'dark')
                }
            />
        </Tooltip>
    );
}

export default NovariThemeSwitcher;
