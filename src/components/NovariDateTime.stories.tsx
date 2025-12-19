import type { Meta, StoryObj } from '@storybook/react-vite';
import { NovariDateTime } from './NovariDateTime';

const meta = {
    title: 'Experimental-Novari/NovariDateTime',
    component: NovariDateTime,
    tags: ['autodocs', 'experimental'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A combined date and time picker component using NAV Aksel design system components.'
            }
        }
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '450px', padding: '20px' }}>
                <Story />
            </div>
        )
    ],
    args: {
        dateLabel: 'Dato',
        timeLabel: 'Tidspunkt',
        required: false,
        disabled: false
    },
    argTypes: {
        onChange: { action: 'changed' },
        initialDate: { control: 'date' }
    }
} satisfies Meta<typeof NovariDateTime>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {};

// With initial value
export const WithInitialValue: Story = {
    args: {
        initialDate: new Date('2024-01-01T13:30:00')
    }
};

// Required fields
export const Required: Story = {
    args: {
        required: true
    }
};

// With error state
export const WithError: Story = {
    args: {
        error: 'Vennligst velg en gyldig dato og tid'
    }
};

// Disabled state
export const Disabled: Story = {
    args: {
        disabled: true,
        initialDate: new Date('2024-01-01T13:30:00')
    }
};