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
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", "novari");
  // }, []);

  return (

      <Box
          style={{
            textAlign: "center",
            backgroundColor: "var(--a-bg-subtle)"

          }}
      >

        <HStack gap="2" >
          <HStack gap="2" className={"pl-2 pt-2 items-center"}>
            {!appName ? (
                <NovariIKS width="9em" />
            ) : (
                <HStack gap="2" className="pl-2 items-center">
                  {!appName ? (
                      <NovariIKS width="9em" />
                  ) : (
                      <HStack gap="2" className="items-center">
                        {showLogoWithTitle && <NovariIKS width="9em" />}
                        <Heading size="medium" className="!text-[#500F2D] pr-10">
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


            <HStack gap={"2"} >
                {displayName && <Box padding={"3"}>{displayName}</Box>}

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
      </Box>

  );
};

export default NovariHeader;
