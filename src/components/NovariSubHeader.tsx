import { ActionMenu, Box, Button, Heading, HStack } from '@navikt/ds-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import React from 'react';

export interface SubHeaderProps {
    appName?: string;
    width?: string;
    noSpacer?: boolean;
    menu: (
        | [string, string]
        | {
              label?: string;
              items: {
                  label: string;
                  action: string;
                  icon?: React.ReactNode;
                  disabled?: boolean;
              }[];
          }
    )[];
    onMenuClick?: (action: string) => void;
    children?: React.ReactNode;
}

const NovariSubHeader: React.FC<SubHeaderProps> = ({
    appName,
    width,
    noSpacer,
    menu,
    onMenuClick,
    children,
}) => {
    const headerWidth: string = width || '1140px';

    return (
        <>
            {noSpacer ? null : (
                <div
                    style={{
                        width: '100%',
                        borderBottom: '1px solid rgba(107, 19, 61, 0.3)',
                    }}
                />
            )}
            <HStack
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'var(--novari-bg-subtle)',
                    height: '42px',
                    width: '100%',
                    textAlign: 'center',
                }}>
                <HStack
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%',
                        width: headerWidth,
                    }}>
                    {appName ? (
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Heading
                                size="medium"
                                style={{
                                    color: 'var(--novari-magenta)',
                                }}>
                                {appName}
                            </Heading>
                        </Box>
                    ) : null}
                    {
                        <HStack gap="space-2">
                            {menu.map((menuItem, index) => {
                                if (Array.isArray(menuItem)) {
                                    const [label, action] = menuItem;
                                    return (
                                        <Button
                                            key={index}
                                            size="small"
                                            variant="tertiary-neutral"
                                            onClick={() => onMenuClick?.(action)}>
                                            {label}
                                        </Button>
                                    );
                                } else {
                                    return (
                                        <ActionMenu key={index}>
                                            <ActionMenu.Trigger>
                                                <Button
                                                    size="small"
                                                    variant="tertiary-neutral"
                                                    icon={<ChevronDownIcon aria-hidden />}
                                                    iconPosition="right">
                                                    {menuItem.label ?? `Meny ${index + 1}`}
                                                </Button>
                                            </ActionMenu.Trigger>
                                            <ActionMenu.Content>
                                                {menuItem.items.map(
                                                    ({ label, action, icon, disabled }, i) => (
                                                        <ActionMenu.Item
                                                            key={i}
                                                            onSelect={() =>
                                                                !disabled && onMenuClick?.(action)
                                                            }
                                                            disabled={disabled}
                                                            icon={icon}>
                                                            {label}
                                                        </ActionMenu.Item>
                                                    )
                                                )}
                                            </ActionMenu.Content>
                                        </ActionMenu>
                                    );
                                }
                            })}
                        </HStack>
                    }
                    {children}
                </HStack>
            </HStack>
            <div
                style={{
                    width: '100%',
                    borderBottom: '1px solid rgba(107, 19, 61, 0.1)',
                }}
            />
        </>
    );
};

export default NovariSubHeader;
