import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header.tsx';

const menuItems = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Reports', path: '/reports' },
    {
        title: 'Settings',
        path: '/settings',
        subItems: [
            { title: 'Profile', path: '/profile' },
            { title: 'Security', path: '/security' },
        ],
    },
];

const meta = {
    title: 'Novari/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        isLoggedIn: true,
        userName: 'John Doe',
        menuItems,
    },
    argTypes: {
        onLogin: { action: 'onLogin' },
        onLogout: { action: 'onLogout' },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Logged In Header
export const LoggedIn: Story = {};

// Logged Out Header
export const LoggedOut: Story = {
    args: {
        isLoggedIn: false,
        userName: '',
    },
};
