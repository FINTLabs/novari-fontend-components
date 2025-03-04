import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { Box } from "@navikt/ds-react";

const meta = {
  title: "Novari/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    appName: "FINTApp",
    menu: [
      ["Home", "/"],
      {
        label: "Main Sections",
        items: [
          ["About", "/about"],
          ["Team", "/team"],
          ["Careers", "/careers"],
        ],
      },
      ["Contact", "/contact"],
      {
        label: "Settings",
        items: [
          ["Profile", "/profile"],
          ["Security", "/security"],
        ],
      },
    ],
    loggedIn: true,
    displayName: "John Doe",
    showLogo: false, // Default to false
  },
  argTypes: {
    onLogout: { action: "onLogout" },
    showLogo: { control: "boolean", description: "Show or hide the logo" },
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <div className="min-h-50"></div>
      </Box>
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
    menu: [["Login", "/login"]],
  },
};

// Header with Custom Menu
export const CustomMenu: Story = {
  args: {
    menu: [
      ["Home", "/"],
      {
        label: "Main Sections",
        items: [
          ["About", "/about"],
          ["Team", "/team"],
          ["Careers", "/careers"],
        ],
      },
      ["Contact", "/contact"],
      {
        label: "Settings",
        items: [
          ["Profile", "/profile"],
          ["Security", "/security"],
        ],
      },
    ],
  },
};

// Header with Logo
export const WithLogo: Story = {
  args: {
    showLogo: true,
  },
};
