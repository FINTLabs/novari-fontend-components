/// <reference types="vite/client" />

import React from 'react';

import type { Preview } from '@storybook/react-vite';
import '../src/tailwind.css';
import '../src/index.css';
// import '../src/styles/novari-theme.css';
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
        viewport: {
            options: {
                largeDesktop: {
                    name: 'Large desktop',
                    styles: {
                        width: '1920px',
                        height: '1080px',
                    },
                    type: 'desktop',
                },
                smallDesktop: {
                    name: 'Small desktop',
                    styles: {
                        width: '1280px',
                        height: '800px',
                    },
                    type: 'desktop',
                },
                phone: {
                    name: 'Phone',
                    styles: {
                        width: '390px',
                        height: '844px',
                    },
                    type: 'mobile',
                },
            },
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
