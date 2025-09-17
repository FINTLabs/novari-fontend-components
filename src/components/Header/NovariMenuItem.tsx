import React from 'react';
import { Button, ActionMenu } from '@navikt/ds-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';

export type MenuAction = {
    label: string;
    action: string;
    icon?: React.ReactNode;
    disabled?: boolean;
};

export type MenuItemType =
    | [string, string]
    | {
          label?: string;
          items: MenuAction[];
      };

interface MenuItemProps {
    item: MenuItemType;
    index: number;
    onMenuClick?: (action: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, index, onMenuClick }) => {
    if (Array.isArray(item)) {
        const [label, action] = item;
        return (
            <Button
                key={index}
                size="small"
                variant="tertiary-neutral"
                onClick={() => onMenuClick?.(action)}>
                {label}
            </Button>
        );
    }

    return (
        <ActionMenu key={index}>
            <ActionMenu.Trigger>
                <Button
                    size="small"
                    variant="tertiary-neutral"
                    icon={<ChevronDownIcon aria-hidden />}
                    iconPosition="right">
                    {item.label ?? `Meny ${index + 1}`}
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                {item.items.map(({ label, action, icon, disabled }, i) => (
                    <ActionMenu.Item
                        key={i}
                        onSelect={() => !disabled && onMenuClick?.(action)}
                        disabled={disabled}
                        icon={icon}>
                        {label}
                    </ActionMenu.Item>
                ))}
            </ActionMenu.Content>
        </ActionMenu>
    );
};

export default MenuItem;
