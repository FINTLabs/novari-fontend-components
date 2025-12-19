import { Meta, StoryObj } from "@storybook/react-vite";
import NovariInternalHeader from "./NovariInternalHeader.tsx";


const meta: Meta<typeof NovariInternalHeader> = {
    title: "Experimental-Novari/InternalHeader",
    component: NovariInternalHeader,
    tags: ["autodocs","experimental"],

};
export default meta;

type Story = StoryObj<typeof NovariInternalHeader>;

export const Default: Story = {}

