import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, fn, userEvent, within} from 'storybook/test';
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
        // 👇 Provide a mock function to spy on
        onChange: fn(),
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

// Test with play function
export const Interactive: Story = {
    args: {
        label: 'Click Me',
    },
    play: async ({args, canvasElement, step}) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', {name: /click me/i});

        await step('Click the button to toggle', async () => {
            await userEvent.click(button);
        });

        await step('Verify onChange was called', async () => {
            await expect(args.onChange).toHaveBeenCalled();
        });

        await step('Click again to toggle back', async () => {
            await userEvent.click(button);
        });

        await step('Verify onChange was called twice', async () => {
            await expect(args.onChange).toHaveBeenCalledTimes(2);
        });
    },
};

// Test interaction with assertions
export const ToggleBehavior: Story = {
    args: {
        label: 'Toggle Me',
        selected: false,
    },
    play: async ({args, canvasElement, step}) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', {name: /toggle me/i});

        await step('Verify button is clickable', async () => {
            await expect(button).not.toBeDisabled();
        });

        await step('Click the button', async () => {
            await userEvent.click(button);
        });

        await step('Verify onChange was called with true', async () => {
            await expect(args.onChange).toHaveBeenCalledWith(true);
        });

        await step('Click again to toggle back', async () => {
            await userEvent.click(button);
        });

        await step('Verify onChange was called with false', async () => {
            await expect(args.onChange).toHaveBeenCalledWith(false);
        });
    },
};
