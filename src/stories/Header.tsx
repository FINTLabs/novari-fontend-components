import {Button, HStack, ActionMenu, Box} from '@navikt/ds-react';
import { LeaveIcon,ChevronDownIcon } from '@navikt/aksel-icons';

export interface MenuItem {
    title: string;
    path: string;
    subItems?: { title: string; path: string }[];
}

export interface HeaderProps {
    isLoggedIn: boolean;
    userName?: string;
    menuItems: MenuItem[];
    onLogin?: () => void;
    onLogout?: () => void;
}

export const Header = ({ isLoggedIn, userName, menuItems, onLogin, onLogout }: HeaderProps) => {
    return (
        <Box as="header" style={{backgroundColor:"#FCF5ED"}}>
            {/* Left: Logo & Menu */}
            <HStack gap="4">
                Name Here

                    <HStack gap="2">
                        <ActionMenu>
                            <ActionMenu.Trigger>
                                <Button
                                    size={"small"}
                                    variant="secondary-neutral"
                                    icon={<ChevronDownIcon aria-hidden />}
                                    iconPosition="right"
                                >
                                    Meny
                                </Button>
                            </ActionMenu.Trigger>
                            <ActionMenu.Content>
                                <ActionMenu.Group label="Systemer og oppslagsverk">
                                    <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
                                    <ActionMenu.Item onSelect={console.info}>
                                        Aa-registeret
                                    </ActionMenu.Item>
                                    <ActionMenu.Item onSelect={console.info}>Gosys</ActionMenu.Item>
                                    <ActionMenu.Item onSelect={console.info}>
                                        Modia Sykefraværsoppfølging
                                    </ActionMenu.Item>
                                    <ActionMenu.Item onSelect={console.info}>
                                        Modia Personoversikt
                                    </ActionMenu.Item>
                                </ActionMenu.Group>
                            </ActionMenu.Content>
                        </ActionMenu>
                    </HStack>

            </HStack>

            {/* Right: User Info & Login/Logout */}
            <HStack gap="4">
                {isLoggedIn ? (
                    <>
                        <span className="text-sm font-semibold">{userName}</span>
                        <Button onClick={onLogout} variant="tertiary" icon={<LeaveIcon />} />
                    </>
                ) : (
                    <Button onClick={onLogin} variant="primary">
                        Login
                    </Button>
                )}
            </HStack>
        </Box>
    );
};
