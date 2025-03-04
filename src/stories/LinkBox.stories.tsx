import type { Meta, StoryObj } from "@storybook/react";
import LinkBox from "./LinkBox";

const meta: Meta<typeof LinkBox> = {
  title: "Novari/LinkBox",
  component: LinkBox,
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
} satisfies Meta<typeof LinkBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
