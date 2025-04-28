import type { Meta, StoryObj } from "@storybook/react";
import NovariLinkBox from "./NovariLinkBox.tsx";

const meta: Meta<typeof NovariLinkBox> = {
  title: "Experimental-Novari/NovariLinkBox",
  component: NovariLinkBox,
  tags: ["autodocs","experimental"],
  parameters: {
    layout: "padded",
  },
  args: {
    title: "Organisering",
    description: "Novari IKS",
    href: "#",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    href: { control: "text" },
  },
} satisfies Meta<typeof NovariLinkBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
