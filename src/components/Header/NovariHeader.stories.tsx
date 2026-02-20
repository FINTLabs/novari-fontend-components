import type { Meta, StoryObj } from '@storybook/react-vite';
import './NovariHeader.css';
import NovariHeader from './NovariHeader';
import NovariMenuItem from './NovariMenuItem.tsx';
import { extraChild, menuData, simpleMenu } from '../StoryBookMockData/menuData.tsx';
import { fn } from 'storybook/test';



//TODO: Remove onMenuClick from args in header items
const meta = {
    title: 'Components/NovariHeader',
    component: NovariHeader,
    subcomponents: { NovariMenuItem },
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Standardized header for Novari IKS / Fintlabs applications with built-in functionality for ' +
                    'navigating your application. For this to work best, you have to hook it up to useNavigate from your ' +
                    'native React library, and implement it, for example like in the code snippet of this preview. ' +
                    'The header menu can be built using a combination of individual links and dropdown menus ' +
                    'containing several links. The links in the menu links can have Icons and can also be dynamically disabled ' +
                    'with javascript. ' +
                    '\n\n**CSS options**\n\n' +
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
} satisfies Meta<typeof NovariHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        appName: 'FINTApp',
        menu: menuData,
        onMenuClick: fn(),
        displayName: 'John Doe',
        isLoggedIn: true,
        onLogin: fn(),
        onLogout: fn(),
        showLogoWithTitle: false,
        className: 'novari-header',
    },
};

export const WithLogoAndName: Story = {
    args: {
        appName: 'FINTApp',
        menu: menuData,
        onMenuClick: fn(),
        displayName: 'John Doe',
        isLoggedIn: true,
        showLogoWithTitle: true,
        onLogin: fn(),
        onLogout: fn(),
    },
};

export const WithSimpleMenu: Story = {
    args: {
        appName: 'FINTApp',
        menu: simpleMenu,
        onMenuClick: fn(),
        displayName: 'John Doe',
        isLoggedIn: true,
        showLogoWithTitle: true,
        onLogin: fn(),
        onLogout: fn(),
    },
};

export const NotLoggedIn: Story = {
    args: {
        appName: 'FINTApp',
        menu: simpleMenu,
        displayName: 'John Doe',
        isLoggedIn: false,
        showLogoWithTitle: false,
        onMenuClick: fn(),
        onLogin: fn(),
        onLogout: fn(),
    },
};

export const WithChildComponent: Story = {
    args: {
        appName: 'FINTApp',
        menu: simpleMenu,
        displayName: 'John Doe',
        isLoggedIn: true,
        showLogoWithTitle: false,
        onMenuClick: fn(),
        onLogin: fn(),
        onLogout: fn(),
        children: extraChild,
    },
};
