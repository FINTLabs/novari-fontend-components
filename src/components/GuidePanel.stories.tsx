import { Meta, StoryObj } from "@storybook/react-vite";
import GuidePanel from "./GuidePanel";

// Illustration options
const illustrations = {
  Default: "/images/default-illustration.png",
  Success: "/images/success-illustration.png",
  Warning: "/images/warning-illustration.png",
};

const meta: Meta<typeof GuidePanel> = {
  title: "Experimental-Novari/GuidePanel",
  component: GuidePanel,
  tags: ["autodocs","experimental"],
  argTypes: {
    children: {
      control: "text",
      description: "The content inside the GuidePanel",
    },
    imageSrc: {
      control: { type: "select" },
      options: Object.keys(illustrations),
      description: "Select an illustration",
      mapping: illustrations,
    },
    altText: { control: "text", description: "Alt text for the illustration" },
  },
};
export default meta;

type Story = StoryObj<typeof GuidePanel>;

export const Default: Story = {
  tags: ["experimental"],
  args: {
    children: "Welcome to Novari! This panel guides you through the process.",
    imageSrc: illustrations.Default,
    altText: "Default illustration",
  },
};

export const SecondIllustration: Story = {
  args: {
    children: "Welcome to Novari! This panel guides you through the process.",
    imageSrc: illustrations.Success,
    altText: "Success illustration",
  },
};
