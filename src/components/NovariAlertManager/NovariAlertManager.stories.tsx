import type { Meta, StoryObj } from '@storybook/react';
import { Button, VStack } from '@navikt/ds-react';
import { NovariAlertProvider, useAlerts } from '.';
import type { AddAlertInput } from '.';

//TODO: make a sandbox
function AlertTester() {
    const { addAlert, clearAlerts } = useAlerts();
    const variants: AddAlertInput['variant'][] = ['success', 'error', 'warning', 'info'];

    return (
        <VStack gap="4" width="300px">
            {variants.map((v) => (
                <Button
                    key={v}
                    variant="secondary"
                    onClick={() =>
                        addAlert({
                            variant: v,
                            header: `Dette er en ${v}-melding`,
                            message: `Eksempel på en ${v}-alert. Skjules automatisk.`,
                        })
                    }>
                    Vis {v} alert
                </Button>
            ))}
            <Button variant="danger" onClick={clearAlerts}>
                Fjern alle varsler
            </Button>
        </VStack>
    );
}

const meta = {
    title: 'Novari/NovariAlertProvider',
    component: NovariAlertProvider,
    tags: ['autodocs'],
    args: { max: 3, autoDismissMs: 5000, position: 'bottom-right' },
    argTypes: {
        children: { table: { disable: true }, control: false },
        max: { control: 'number' },
        autoDismissMs: { control: 'number' },
        position: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
        },
    },
    parameters: { layout: 'fullscreen', controls: { exclude: ['children'] } },
} satisfies Meta<typeof NovariAlertProvider>;

export default meta;

type Story = StoryObj<typeof NovariAlertProvider>;

export const Default: Story = {
    render: (args) => (
        <NovariAlertProvider {...args}>
            <div style={{ padding: '2rem' }}>
                <AlertTester />
            </div>
        </NovariAlertProvider>
    ),
};
