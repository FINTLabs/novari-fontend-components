import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box, Button } from '@navikt/ds-react';
import { type NovariSnackbarPosition, type NovariSnackbarVariant } from './NovariSnackbar';
import NovariSnackbar from './NovariSnackbar';

const meta = {
    title: 'Novari/NovariSnackbar',
    component: NovariSnackbar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Transient notification built with Aksel Alert, with Snackbar-like behavior (positioning, auto-hide, close).',
            },
        },
    },
    args: {
        open: true,
        autoHideDuration: 4000,
        variant: 'info' as NovariSnackbarVariant,
        position: 'bottom-center' as NovariSnackbarPosition,
        message: 'This Snackbar will be dismissed automatically.',
        header: 'Info',
        onClose: () => console.log('onClose'),
    },
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['info', 'success', 'warning', 'error'],
        },
        position: {
            control: { type: 'select' },
            options: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'top-center',
                'bottom-center',
            ],
        },
        autoHideDuration: { control: { type: 'number', min: 0, step: 500 } },
        header: { control: 'text' },
        message: { control: 'text' },
        onClose: { action: 'onClose' },
    },
    decorators: [
        (Story) => (
            <Box>
                <Story />
                <div className="min-h-50" />
            </Box>
        ),
    ],
} satisfies Meta<typeof NovariSnackbar>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function DefaultStory(args) {
        const [open, setOpen] = React.useState(args.open);
        return (
            <>
                <Button className="px-3 py-2 rounded border m-4" onClick={() => setOpen(true)}>
                    Show Snackbar
                </Button>
                <NovariSnackbar {...args} open={open} onClose={() => setOpen(false)} />
            </>
        );
    },
};

export const Variants: Story = {
    args: { position: 'top-right', autoHideDuration: 5000 },
    render: (args) => (
        <>
            <NovariSnackbar {...args} variant="info" message="Info message" />
            <NovariSnackbar {...args} variant="success" message="Success message" />
            <NovariSnackbar {...args} variant="warning" message="Warning message" />
            <NovariSnackbar {...args} variant="error" message="Error message" />
        </>
    ),
};

export const Positions: Story = {
    args: { open: true, autoHideDuration: 0, message: 'Position demo' },
    render: (args) => (
        <>
            <NovariSnackbar {...args} position="top-left" />
            <NovariSnackbar {...args} position="top-right" />
            <NovariSnackbar {...args} position="bottom-left" />
            <NovariSnackbar {...args} position="bottom-right" />
            <NovariSnackbar {...args} position="top-center" />
            <NovariSnackbar {...args} position="bottom-center" />
        </>
    ),
};

export const WithHeader: Story = {
    args: {
        open: true,
        autoHideDuration: 0,
        variant: 'success',
        position: 'top-center',
        header: 'Lagret!',
        message: 'Dataen din ble lagret uten feil.',
    },
};

export const Persistent: Story = {
    args: {
        open: true,
        autoHideDuration: 0,
        variant: 'warning',
        position: 'bottom-center',
        header: 'Handling påkrevd',
        message: 'Du må fullføre denne oppgaven før du går videre.',
    },
};
