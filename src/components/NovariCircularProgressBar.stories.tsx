import type { Meta, StoryObj } from "@storybook/react";
import NovariCircularProgressBar from "./NovariCircularProgressBar";

const meta = {
    title: "Novari/NovariCircularProgressBar",
    component: NovariCircularProgressBar,
    tags: ["autodocs", "experimental"],
    parameters: {
        layout: 'centered',
    },
    args: {
        maxValue: 54,
        value: 24
    }
} satisfies Meta<typeof NovariCircularProgressBar>

export default meta;
type Story = StoryObj<typeof NovariCircularProgressBar>;

export const Default: Story = {};