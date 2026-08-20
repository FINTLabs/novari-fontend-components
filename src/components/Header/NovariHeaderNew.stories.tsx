import type { Meta, StoryObj } from '@storybook/react-vite';
import './NovariHeader.css';
import NovariHeader from './NovariHeader';
import NovariMenuItem from './NovariMenuItem';
import { extraChild, menuData, simpleMenu } from '../StoryBookMockData/menuData';
import { fn } from 'storybook/test';

const meta = {
    title: 'Components/NovariHeaderNew',
    component: NovariHeader,
    subcomponents: { NovariMenuItem },
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Standardized header for Novari IKS / Fintlabs applications with built-in functionality for navigating your application. ' +
                    'For this to work best, hook it up to your routing solution (for example React Router useNavigate). ' +
                    'The menu supports individual links and dropdown menus with icons and dynamically disabled items.\n\n' +
                    '**CSS options**\n\n' +
                    '- `className` – Pass a custom class (e.g. `novari-header`) to theme the header root\n' +
                    '- `style` – Pass inline styles for one-off overrides\n' +
                    '- `.novari-header` – Root wrapper class for background and text color\n' +
                    '- `.novari-header-title` – Targets the app name heading\n' +
                    '- `.novari-header-user` – Targets the display name text\n' +
                    '- `.novari-header-menu` – Targets the menu container',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="novari-header-bg">
                <Story />
            </div>
        ),
    ],
    args: {
        appName: 'FINTApp',
        displayName: 'John Doe',
        menu: menuData,
        isLoggedIn: true,
        showLogoWithTitle: false,
        className: 'novari-header',
        onMenuClick: fn(),
        onLogin: fn(),
        onLogout: fn(),
    },
} satisfies Meta<typeof NovariHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLogoAndName: Story = {
    args: {
        showLogoWithTitle: true,
    },
};

export const WithSimpleMenu: Story = {
    args: {
        menu: simpleMenu,
        showLogoWithTitle: true,
    },
};

export const NotLoggedIn: Story = {
    args: {
        menu: simpleMenu,
        isLoggedIn: false,
    },
};

export const WithChildComponent: Story = {
    args: {
        menu: simpleMenu,
        children: extraChild,
    },
};

export const WithNoCss: Story = {
    args: {
        menu: simpleMenu,
        className: undefined,
    },
};
