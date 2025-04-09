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
    onLogin: () => console.log("Logged in"),
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
    isLoggedIn: true,
    displayName: "John Doe",
  },
  argTypes: {
    onLogout: { action: "onLogout" },
    onLogin: { action: "onLogin" },
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
    isLoggedIn: false,
    displayName: undefined,
  },argTypes: {
    onLogin: { action: "onLogin" },
  },
};

export const NoLoginRequired: Story = {
  args: {
    isLoggedIn: true,
    displayName: "John Doe",
    onLogin: undefined,
    onLogout: undefined,
  },
};

export const NoLoginRequiredAndNoName: Story = {
  args: {
    isLoggedIn: true,
    displayName: undefined,
    onLogin: undefined,
    onLogout: undefined,
    menu: [
      ["Home", "/"],
      ["Contact", "/contact"],
    ],
  },
};

// NovariHeader with Custom Menu
export const CustomMenuOnlyButtons: Story = {
  args: {
    menu: [
      ["Home", "/"],
      ["Contact", "/contact"],
    ],
  },
};

// NovariHeader with Logo
export const WithLogo: Story = {
  args: {
    appName: undefined,
  },
};
