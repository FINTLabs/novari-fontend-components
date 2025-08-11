import {ActionMenu, Box, Button, Heading, HStack, Spacer,} from "@navikt/ds-react";
import {ChevronDownIcon, EnterIcon, LeaveIcon} from "@navikt/aksel-icons";
import {NovariIKS} from "./assets/NovariIKS";

export interface HeaderProps {
  appName?: string;
  menu: ({ label?: string; items: [string, string][] } | [string, string])[];
  isLoggedIn: boolean;
  displayName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
  onMenuClick?: (action: string) => void;
  showLogoWithTitle?: boolean; // New prop to show logo alongside title
}

const NovariHeader: React.FC<HeaderProps> = ({
  appName,
  menu,
  isLoggedIn,
  displayName,
  onLogout,
  onLogin,
  onMenuClick,
  showLogoWithTitle = false, // Default to false for backward compatibility
}) => {

  return (
      <HStack gap="2" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "var(--a-bg-subtle)",
        height: "52px",
        textAlign: "center",
      }}>
        <HStack gap="2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "32px",
                }}>
            {!appName ? (
                <NovariIKS width="9em" />
            ) : (
                <HStack gap="2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                  {!appName ? (
                      <NovariIKS width="9em" />
                  ) : (
                      <HStack gap="2"
                              style={{
                                display: "flex",
                                alignItems: "center"
                              }}>
                        {showLogoWithTitle && <NovariIKS width="9em" />}
                        <Heading size="medium"
                                 style={{
                                   color: 'var(--a-surface-alt-3-moderate)',
                                   paddingRight: "28px"
                                 }}>
                          {appName}
                        </Heading>
                      </HStack>
                  )}
                </HStack>
            )}
          </HStack>
          {isLoggedIn && (
            <HStack gap="2">
              {menu.map((menuItem, index) => {
                if (Array.isArray(menuItem)) {
                  // If menuItem is a single [label, action], render a Button
                  const [label, action] = menuItem;
                  return (
                    <Button
                      key={index}
                      size="small"
                      variant="tertiary-neutral"
                      onClick={() => onMenuClick?.(action)}
                    >
                      {label}
                    </Button>
                  );
                } else {
                  // If menuItem is an object with a dropdown label, render an ActionMenu
                  return (
                    <ActionMenu key={index}>
                      <ActionMenu.Trigger>
                        <Button
                          size="small"
                          variant="tertiary-neutral"
                          icon={<ChevronDownIcon aria-hidden />}
                          iconPosition="right"
                        >
                          {menuItem.label ?? `Meny ${index + 1}`}
                        </Button>
                      </ActionMenu.Trigger>
                      <ActionMenu.Content>
                        {menuItem.items.map(([label, action], i) => (
                          <ActionMenu.Item
                            key={i}
                            onSelect={() => onMenuClick?.(action)}
                          >
                            {label}
                          </ActionMenu.Item>
                        ))}
                      </ActionMenu.Content>
                    </ActionMenu>
                  );
                }
              })}
            </HStack>
          )}
          <Spacer />
        <HStack gap={"2"} style={{textAlign: "center"}}>
                {displayName && <Box style={{
                  position: "absolute",
                  right: "46px",
                  height: "52px",
                  lineHeight: "52px",
                  textAlign: "center"
                }}>{displayName}</Box>}
                {isLoggedIn && onLogout &&  (<Button
                variant="tertiary"
                title="logg ut"
                icon={<LeaveIcon title="logg ut" fontSize="1.5rem" />}
                onClick={onLogout}
              />)}
            </HStack>
          {!isLoggedIn && onLogin && (
            <Button
              variant="tertiary"
              title="logg inn"
              icon={<EnterIcon title="logg inn" fontSize="1.5rem" />}
              onClick={onLogin}
              iconPosition="right"
            >
              Login
            </Button>
          )}
        </HStack>
  );
};

export default NovariHeader;
