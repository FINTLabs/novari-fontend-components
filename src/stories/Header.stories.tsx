import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
  title: "Novari/Header",
  component: Header,
  tags: ["autodocs"], // Enables automatic documentation in Storybook
  parameters: {
    layout: "fullscreen",
  },
  args: {
    appName: "FINTApp",
    menu: [
      ["Dashboard", "/dashboard"],
      ["Settings", "/settings"],
    ],
    loggedIn: true,
    displayName: "John Doe",
  },
  argTypes: {
    onLogout: { action: "onChange" },
  },
  decorators: [
    (Story) => (
      // <Page header={<Story />}>
      //     test
      // </Page>
      <Story />
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Header Story
export const Default: Story = {};

// Header with Logged Out State
export const LoggedOut: Story = {
  args: {
    loggedIn: false,
    menu: ["Login", "/login"],
  },
};

// Header with Custom Menu
export const CustomMenu: Story = {
  args: {
    menu: [
      ["Home", "/"],
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Support", "http://fintlabs.no"],
      ["Glossary", "/help"],
    ],
  },
};
