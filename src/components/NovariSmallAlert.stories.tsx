import type { Meta, StoryObj } from "@storybook/react";
import { NovariSmallAlert } from "./NovariSmallAlert.tsx";

const meta = {
  title: "Novari/Small Alert",
  component: NovariSmallAlert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    id: "1",
    message: "This is an example alert!",
    header: "Notification",
    variant: "info",
  },
} satisfies Meta<typeof NovariSmallAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Alert
export const Default: Story = {};

// Error Alert
export const ErrorAlert: Story = {
  args: {
    variant: "error",
    message: "Something went wrong!",
    header: "Error",
  },
};

// Success Alert
export const SuccessAlert: Story = {
  args: {
    variant: "success",
    message: "Your action was successful!",
    header: "Success",
  },
};
