import React from 'react';

import type { Preview } from '@storybook/react';
import '@navikt/ds-css';
import '../src/index.css';
import '../src/tailwind.css';
import '../src/styles/novari-theme.css';

const preview: Preview = {
    decorators: [
        (Story) => (
            <React.StrictMode>
                <div data-theme="novari">
                    <Story />
                </div>
            </React.StrictMode>
        ),
    ],
    parameters: {
        codesandbox: {
            apiToken: 'csb_v1_lHgbDdAUuZvCPwSNTdoqOsYbz4sljCHCAbJ3Wf7Gs_s',
            fallbackImport: '@radix-ui/themes',
            template: 'react-ts',

            // everything the sandbox must install from npm (no local paths)
            dependencies: {
                react: 'latest',
                'react-dom': 'latest',

                // Aksel (NAV)
                '@navikt/ds-react': 'latest',
                '@navikt/ds-css': 'latest',
                '@navikt/aksel-icons': 'latest',

                // optional: router if your story needs it
                'react-router-dom': 'latest',
            },

            // a tiny wrapper to load global CSS, theme providers, etc.
            // this runs inside the sandbox
            provider: `
        import React from 'react';
        import '@navikt/ds-css';
        export default function Provider({ children }) {
          return <>{children}</>;
        }
      `,
        },
        options: {
            storySort: {
                order: ['Home', 'Novari', 'Experimental', '*'],
            },
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
