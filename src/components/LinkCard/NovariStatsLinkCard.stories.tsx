import type { Meta, StoryObj } from '@storybook/react-vite';
import NovariStatsLinkCard from './NovariStatsLinkCard';
import type { NovariStatsLinkCardCssVariables } from './NovariStatsLinkCard';

const burgundyVariables: NovariStatsLinkCardCssVariables = {
    '--novari-stats-link-card-error-border-color': '#ba3a26',
    '--novari-stats-link-card-error-color': '#ba3a26',
    '--novari-stats-link-card-link-background': '#f8ecdc',
    '--novari-stats-link-card-link-background-hover': '#ffe9e2',
    '--novari-stats-link-card-link-color': '#500f2d',
};

const errorVariables: NovariStatsLinkCardCssVariables = {
    '--novari-stats-link-card-error-border-color': '#bc002a',
    '--novari-stats-link-card-error-color': '#bc002a',
    // '--novari-stats-link-card-link-background': '#e22948',
    // '--novari-stats-link-card-link-background-hover': '#e22948',
    '--novari-stats-link-card-link-color': '#bc002a',
};

const meta = {
    title: 'Components/NovariStatsLinkCard',
    component: NovariStatsLinkCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Available CSS custom properties:\n\n' +
                    '- `--novari-stats-link-card-error-border-color`\n' +
                    '- `--novari-stats-link-card-error-color`\n' +
                    '- `--novari-stats-link-card-link-background`\n' +
                    '- `--novari-stats-link-card-link-background-hover`\n' +
                    '- `--novari-stats-link-card-link-color`\n\n' +
                    'NovariStatsLinkCard displays a numeric dashboard value, a short label, and an optional link footer. Use `loading` when the value is still being fetched, and `error` when the value could not be loaded.',
            },
        },
    },
    args: {
        id: 'open-cases',
        content: 'Åpne saker',
        value: 12,
        link: {
            href: '#',
            name: 'Se alle saker',
        },
        loading: false,
        error: false,
    },
    argTypes: {
        id: { control: 'text' },
        content: { control: 'text' },
        value: { control: 'number' },
        link: { control: 'object' },
        loading: { control: 'boolean' },
        loadingTitle: { control: 'text' },
        error: { control: 'boolean' },
        errorText: { control: 'text' },
        className: { control: 'text' },
        style: {
            control: false,
            description:
                'Can be used for inline CSS custom properties typed by `NovariStatsLinkCardCssVariables`.',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '320px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NovariStatsLinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ZeroValue: Story = {
    args: {
        id: 'zero-cases',
        value: 0,
    },
};

export const Loading: Story = {
    args: {
        id: 'loading-cases',
        value: undefined,
        loading: true,
    },
};

export const Error: Story = {
    args: {
        id: 'error-cases',
        value: undefined,
        error: true,
        style: errorVariables,
    },
};

export const WithoutLink: Story = {
    args: {
        id: 'without-link',
        link: undefined,
    },
};

export const CustomVariables: Story = {
    args: {
        id: 'custom-variables',
        style: burgundyVariables,
    },
};

export const Examples: Story = {
    render: (args) => (
        <div style={{ display: 'grid', gap: '1rem', width: '320px' }}>
            <NovariStatsLinkCard
                {...args}
                id="example-active"
                content="Aktive oppgaver"
                value={24}
            />
            <NovariStatsLinkCard
                {...args}
                id="example-waiting"
                content="Venter på svar"
                value={8}
                style={burgundyVariables}
            />
            <NovariStatsLinkCard
                {...args}
                id="example-completed"
                content="Fullført i dag"
                value={0}
                link={{
                    href: '#',
                    name: 'Se historikk',
                }}
            />
            <NovariStatsLinkCard
                {...args}
                id="example-error"
                content="Kunne ikke lastes"
                value={undefined}
                error
                link={{
                    href: '#',
                    name: 'Prøv igjen',
                }}
            />
        </div>
    ),
};
