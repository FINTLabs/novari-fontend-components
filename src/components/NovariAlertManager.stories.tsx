import type { Meta, StoryObj } from '@storybook/react';
import { NovariAlertManager } from './NovariAlertManager';

const meta = {
    title: 'Novari/AlertManager',
    component: NovariAlertManager,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        alerts: [
            {
                id: 1,
                message: 'This is a success message',
                header: 'Success',
                variant: 'success'
            },
            {
                id: 2,
                message: 'This is an error message',
                header: 'Error',
                variant: 'error'
            }
        ],
        maxAlerts: 3,
        autoRemoveDelay: 10000,
        position: { top: '5rem', right: '1rem' }
    }
} satisfies Meta<typeof NovariAlertManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleAlerts: Story = {
    args: {
        alerts: [
            {
                id: 1,
                message: 'Success message',
                header: 'Success',
                variant: 'success'
            },
            {
                id: 2,
                message: 'Warning message',
                header: 'Warning',
                variant: 'warning'
            },
            {
                id: 3,
                message: 'Error message',
                header: 'Error',
                variant: 'error'
            }
        ]
    }
};

export const CustomPosition: Story = {
    args: {
        alerts: [
            {
                id: 1,
                message: 'Alert with custom position',
                header: 'Info',
                variant: 'info'
            }
        ],
        position: { bottom: '2rem', left: '2rem' }
    }
};