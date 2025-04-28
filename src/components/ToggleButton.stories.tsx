import type {Meta, StoryObj} from '@storybook/react';
import {ToggleButton} from './ToggleButton';


const meta = {
    title: 'Experimental-Novari/ToggleButton',
    component: ToggleButton,
    tags: ["autodocs","experimental"],
    parameters: {
        layout: 'centered',
    },
    args: {
        label: 'Toggle Me',
    },
    argTypes: {
        onChange: { action: 'onChange' },
    },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Toggle Button
export const Default: Story = {};

// Initially Selected
export const Selected: Story = {
    args: {
        selected: true,
    },
};
