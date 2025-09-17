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
        docs: {
            toc: true,
        },

        options: {
            storySort: {
                order: ['Home', 'Components', 'Experimental', '*'],
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
