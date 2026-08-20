import { Buildings3Icon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import NovariLinkCard from './NovariLinkCard';
import type { NovariLinkCardCssVariables } from './NovariLinkCard';

const burgundyVariables: NovariLinkCardCssVariables = {
    '--novari-link-card-icon-color': '#f8ecdc',
    '--novari-link-card-icon-foreground-color': '#500f2d',
    '--novari-link-card-arrow-color': '#500f2d',
    '--novari-link-card-hover-color': '#ffe9e2',
};

const meta = {
    title: 'Components/NovariLinkCard',
    component: NovariLinkCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Available CSS custom properties:\n\n' +
                    '- `--novari-link-card-icon-color`\n' +
                    '- `--novari-link-card-icon-foreground-color`\n' +
                    '- `--novari-link-card-arrow-color`\n' +
                    '- `--novari-link-card-hover-color`\n\n' +
                    'NovariLinkCard colors are controlled with CSS custom properties. Set them on a wrapper, a class passed through `className`, or inline through `style`.',
            },
        },
    },
    args: {
        title: 'Organisering',
        description: 'Les mer om organisering i Novari IKS.',
        link: '#',
        Icon: <Buildings3Icon />,
        hover: true,
        border: true,
    },
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        link: { control: 'text' },
        Icon: { control: false },
        hover: { control: 'boolean' },
        border: { control: 'boolean' },
        className: {
            control: 'text',
            description:
                'Use this to attach a consumer CSS class that defines NovariLinkCard custom properties.',
        },
        style: {
            control: false,
            description:
                'Can be used for inline CSS custom properties typed by `NovariLinkCardCssVariables`.',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '320px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NovariLinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDescription: Story = {
    args: {
        description: undefined,
    },
};

export const WithoutIcon: Story = {
    args: {
        Icon: undefined,
    },
};

export const CustomVariables: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story sets the custom properties inline. In an app, prefer setting the same variables in your consumer CSS file and pass that class through `className`.',
            },
        },
    },
    args: {
        style: burgundyVariables,
    },
};

export const VariableExamples: Story = {
    render: (args) => (
        <div style={{ display: 'grid', gap: '1rem', width: '320px' }}>
            {[
                {
                    title: 'Burgundy link card',
                    style: burgundyVariables,
                },
                {
                    title: 'Blue link card',
                    style: {
                        '--novari-link-card-icon-color': '#cce1ff',
                        '--novari-link-card-arrow-color': '#0067c5',
                        '--novari-link-card-hover-color': '#e6f0ff',
                    } satisfies NovariLinkCardCssVariables,
                },
                {
                    title: 'Orange link card',
                    style: {
                        '--novari-link-card-icon-color': '#ffeccc',
                        '--novari-link-card-arrow-color': '#c77300',
                        '--novari-link-card-hover-color': '#fff4e0',
                    } satisfies NovariLinkCardCssVariables,
                },
            ].map((example) => (
                <NovariLinkCard
                    {...args}
                    key={example.title}
                    title={example.title}
                    style={example.style}
                />
            ))}
        </div>
    ),
};
