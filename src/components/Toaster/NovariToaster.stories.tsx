import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading } from '@navikt/ds-react';
import NovariToaster, { NovariToasterItem, NovariToasterPosition } from './NovariToaster';

const meta = {
    title: 'Components/NovariToaster',
    component: NovariToaster,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
Queue-based toast notifications built with Aksel InlineMessage.

- Uses \`InlineMessage\` status variants (\`info\`, \`success\`, \`warning\`, \`error\`)
- Supports fixed positioning and auto-hide
- Keeps at most \`maxVisible\` messages on screen at a time
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '2rem', minHeight: '100vh' }}>
                <Heading size="small" style={{ marginBottom: '1rem' }}>
                    NovariToaster examples
                </Heading>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NovariToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundStory = () => {
    const [items, setItems] = useState<NovariToasterItem[]>([]);

    const addToast = (status: NovariToasterItem['status'], title: string, message: string) => {
        setItems((prev) => [
            ...prev,
            {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                status,
                title,
                message,
            },
        ]);
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button onClick={() => addToast('success', 'Lagret', 'Endringene ble lagret.')}>
                    Success
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => addToast('info', 'Informasjon', 'Systemet oppdateres i kveld kl. 22:00.')}>
                    Info
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => addToast('warning', 'Advarsel', 'Du mangler noen obligatoriske felter.')}>
                    Warning
                </Button>
                <Button
                    variant="danger"
                    onClick={() => addToast('error', 'Feilet', 'Kunne ikke lagre. Prøv igjen om et øyeblikk.')}>
                    Error
                </Button>
                <Button variant="tertiary" onClick={() => setItems([])}>
                    Clear
                </Button>
            </div>

            <NovariToaster items={items} />
        </>
    );
};

export const Playground: Story = {
    args: {
        items: [],
        autoHideDuration: 4000,
        position: 'top-right',
        maxVisible: 3,
        size: 'small',
    },
    render: () => <PlaygroundStory />,
};

const PositionsStory = () => {
    const [items, setItems] = useState<NovariToasterItem[]>([]);
    const [position, setPosition] = useState<NovariToasterPosition>('top-right');

    const positions: NovariToasterPosition[] = [
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center',
    ];

    return (
        <>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <label htmlFor="toaster-position">Position</label>
                <select
                    id="toaster-position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value as NovariToasterPosition)}>
                    {positions.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <Button
                    onClick={() =>
                        setItems((prev) => [
                            ...prev,
                            {
                                id: `${Date.now()}`,
                                status: 'info',
                                title: 'Posisjon',
                                message: `Toast vises i ${position}.`,
                            },
                        ])
                    }>
                    Add message
                </Button>
            </div>

            <NovariToaster items={items} position={position} />
        </>
    );
};

export const Positions: Story = {
    args: {
        items: [],
    },
    render: () => <PositionsStory />,
};
