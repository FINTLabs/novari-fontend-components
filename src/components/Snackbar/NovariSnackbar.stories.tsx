import type { Meta, StoryObj } from '@storybook/react';

import NovariSnackbar from './NovariSnackbar';
import { sampleAlerts } from './snackbarData.tsx';
import { fn } from '@storybook/test';

const meta = {
    component: NovariSnackbar,
    // subcomponents: { SnackbarAlertItem: NovariSnackbarItem },
    tags: ['autodocs'],
} satisfies Meta<typeof NovariSnackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: sampleAlerts,
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
        onCloseItem: fn(),
    },
    parameters: {
        docs: {
            story: {
                height: '40vh',
            },
        },
    },
};
