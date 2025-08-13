import type { Meta, StoryObj } from "@storybook/react";
import NovariHeader from "./NovariHeader";
import {Box, Select} from "@navikt/ds-react";
import { PersonGroupIcon, PadlockLockedIcon, QuestionmarkCircleIcon, BriefcaseIcon, PersonCircleIcon } from '@navikt/aksel-icons';




const meta = {
  title: "Novari/NovariHeader",
  component: NovariHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Standardized header for Novari IKS / Fintlabs applications with built-in functionality for " +
            "navigating your application. For this to work best, you have to hook it up to useNavigate from your " +
            "native React library, and implement it, for example like in the code snippet of this preview. " +
            "The header menu can be built using a combination of individual links and dropdown menus " +
            "containing several links. The links in the menu links can have Icons and can also be dynamically disabled " +
            "with javascript. "
      }
    }
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
          { label: "About", action: "/about", icon: <QuestionmarkCircleIcon title="a11y-title" fontSize="1.5rem" />
            ,
            disabled:true },
          { label: "Team", action: "/team", icon: <PersonGroupIcon title="a11y-title" fontSize="1.5rem" />
          },
          { label: "Careers", action: "/careers", icon: <BriefcaseIcon title="a11y-title" fontSize="1.5rem" />
          },
        ],
      },
      ["Contact", "/contact"],
      {
        label: "Settings",
        items: [
          { label: "Profile", action: "/profile" , icon: <PersonCircleIcon title="a11y-title" fontSize="1.5rem" />
          },
          { label: "Security", action: "/security", icon: <PadlockLockedIcon title="a11y-title" fontSize="1.5rem" />
          },
        ],
      },
    ],
    isLoggedIn: true,
    displayName: "John Doe",
    showLogoWithTitle: false,
    children: <Select label="Velg bostedsland" hideLabel size="small" className="p-2">
      <option value="">- Velg land -</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>,
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

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
    export default function pageheader() {
        const navigate = useNavigate();
        
        return (
          <NovariHeader
          onMenuClick={(action) => navigate(action)}
          // Your menues and stuff various other stuff here //
          />
        )
    }
        `
      }
    }
  }
};

export const MenuStructure: Story = {
  parameters: {
    docs: {
      description: {
        story: "The structure of the menu is pretty simple and intuitive. It's an array that can hold both menu" +
            " items and sections of several menu items. The items themselves are arrays with two strings, one is the" +
            " title and the other is the path. For menu sections you make an object that has a label and objects." +
            " The label is just a string, and the items is an array of menuItem objects. Click show code on the box" +
            " below to see the structure of how the menu is implimented here. "
      }
    }
  }
}

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
export const WithLogoOnly: Story = {
  args: {
    appName: undefined,
  },
};

// Add a new story for showing logo with title
export const WithLogoAndTitle: Story = {
  args: {
    appName: "FINTApp",
    showLogoWithTitle: true,
  },
};
