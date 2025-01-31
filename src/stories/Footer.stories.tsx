import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';



const meta = {
    title: 'Novari/Footer',
    component: Footer,
    tags: ['autodocs'], // Enables automatic documentation in Storybook
    parameters: {
        layout: 'fullscreen',
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Footer Story
export const Default: Story = {};

// // Footer with Light Background
// export const LightBackground: Story = {
//     args: {
//         backgroundColor: '#ffffff',
//     },
// };

// Footer with Custom Links
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
