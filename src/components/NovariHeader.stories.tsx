import type { Meta, StoryObj } from "@storybook/react";
import NovariHeader from "./NovariHeader";
import { Box } from "@navikt/ds-react";

const meta = {
  title: "Novari/NovariHeader",
  component: NovariHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    appName: "FINTApp",
    onLogout: () => console.log("Logged out"),
    onMenuClick: (action: string) => console.log("Menu clicked:", action),
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
    showLogo: false,
  },
  argTypes: {
    onLogout: { action: "onLogout" },
    showLogo: { control: "boolean", description: "Show or hide the logo" },
    onMenuClick: { action: "onMenuClick" },
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <div className="min-h-50"></div>
      </Box>
    ),
  ],
} satisfies Meta<typeof NovariHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default NovariHeader Story
export const Default: Story = {};

// NovariHeader with Logged Out State
export const LoggedOut: Story = {
  args: {
    loggedIn: false,
    menu: [["Login", "/login"]],
  },
};

// NovariHeader with Custom Menu
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

// NovariHeader with Logo
export const WithLogo: Story = {
  args: {
    showLogo: true,
  },
};
