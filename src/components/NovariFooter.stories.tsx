import type { Meta, StoryObj } from '@storybook/react';
import { NovariFooter } from './NovariFooter.tsx';

const meta = {
    title: 'Novari/NovariFooter',
    component: NovariFooter,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        codesandbox: {
            /**
             * To import all components used within each story in
             * CodeSandbox, provide all necessary packages and modules.
             *
             * Given the following story:
             * ```js
             * import Provider from "@myscope/mypackage";
             * import { Button } from "@radix-ui/themes";
             * import "@radix-ui/themes/styles.css";
             * ```
             *
             * You need to map all imports to the following:
             */
            mapComponent: {
                // Example of default imports
                '@myscope/mypackage': 'Provider',

                // Example of named functions
                '@radix-ui/themes': ['Button'],

                // Example of static imports
                '@radix-ui/themes/styles.css': true,
            },

            /**
             * @note You cannot use local modules or packages since
             * this story runs in an isolated environment (sandbox)
             * inside CodeSandbox. As such, the sandbox doesn't have
             * access to your file system.
             */
        },
    },
    args: {
        links: [
            { label: 'Driftsmeldinger', href: 'https://novari.no/driftsmeldinger/' },
            { label: 'Opprett supportsak', href: 'http://support.novari.no' },
        ],
    },
    decorators: [
        (Story) => (
            // <Page footer={<Story />}>
            //     test
            // </Page>
            <Story />
        ),
    ],
} satisfies Meta<typeof NovariFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default NovariFooter Story
export const Default: Story = {};

// // NovariFooter with Light Background
// export const LightBackground: Story = {
//     args: {
//         backgroundColor: '#ffffff',
//     },
// };

// NovariFooter with Custom Links
export const CustomLinks: Story = {
    args: {
        links: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Brukerhjelp', href: 'http://fintlabs.no' },
            { label: 'Ordliste', href: '/help' },
        ],
    },
};
