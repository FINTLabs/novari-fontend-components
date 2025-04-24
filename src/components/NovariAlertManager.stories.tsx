import type { Meta, StoryObj } from '@storybook/react';
import { NovariAlertManager } from './NovariAlertManager';

const meta = {
    title: 'Novari/AlertManager',
    component: NovariAlertManager,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            story: {
                height: '400px',
            },
            description: {
                component: 'An alert manager component that displays notifications. Alerts will automatically disappear after 10 seconds (default autoRemoveDelay). Alerts can also be manually dismissed using the close button.'
            }
        },
    },
    decorators: [
        (Story) => (
            <div>
                <div style={{ 
                    padding: '10px', 
                    background: '#f0f0f0', 
                    marginBottom: '10px',
                    borderRadius: '4px'
                }}>
                    Note: Alerts will automatically disappear after 10 seconds
                </div>
                <div style={{ 
                    padding: '20px',
                    minHeight: '400px',
                    position: 'relative',
                    border: '1px dashed #ccc',
                    margin: '20px'
                }}>
                    <Story />
                </div>
            </div>
        ),
    ],
    args: {
        alerts: [
            {
                id: 1,
                message: 'This is a success message',
                header: 'Success',
                variant: 'success'
            }
        ],
        maxAlerts: 3,
        autoRemoveDelay: 10000,
        position: { top: '1rem', right: '1rem' }
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

export const InfoAlert: Story = {
    args: {
        alerts: [
            {
                id: 1,
                message: 'This is an information message',
                header: 'Information',
                variant: 'info'
            }
        ]
    }
};

export const WarningAlert: Story = {
    args: {
        alerts: [
            {
                id: 1,
                message: 'This is a warning message',
                header: 'Warning',
                variant: 'warning'
            }
        ]
    }
};

export const ErrorAlert: Story = {
    args: {
        alerts: [
            {
                id: 1,
                message: 'This is an error message',
                header: 'Error',
                variant: 'error'
            }
        ]
    }
};