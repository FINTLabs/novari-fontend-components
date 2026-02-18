import React from 'react';

import type { Preview } from '@storybook/react-vite';
import '../src/tailwind.css';
import '../src/index.css';
import '../src/styles/novari-theme.css';
import '@navikt/ds-css';
import { ThemeProvider } from '../src';

const preview: Preview = {
    decorators: [
        (Story) => (
            <React.StrictMode>
                <ThemeProvider>
                    <div data-theme="novari">
                        <Story />
                    </div>
                </ThemeProvider>
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
        // actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
