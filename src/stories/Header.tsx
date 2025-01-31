// Header.tsx
import React from "react";

import { Button, HStack } from "@navikt/ds-react";
// import { ActionMenu } from "@navikt/ds-react";
import { EnterIcon, LeaveIcon } from "@navikt/aksel-icons";

export interface HeaderProps {
  appName: string;
  menu: [string, string][] | [string, string];
  loggedIn: boolean;
  displayName?: string;
  onLogout?: (selected: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  appName,
  menu,
  loggedIn,
  displayName,
  onLogout,
}) => {
  return (
    <div className="flex justify-between bg-[#FCF5ED] pl-3 items-center">
      <HStack gap={"2"}>
        <h1 className={"text-[#500F2D]"}>{appName}</h1>
      </HStack>
      <HStack gap={"1"} className={"items-center"}>
        {displayName && loggedIn && (
          <>
            <span>{displayName}</span>
            <Button
              variant="tertiary"
              title="logg ut"
              icon={<LeaveIcon title="logg ut" fontSize="1.5rem" />}
              onClick={onLogout}
            ></Button>
          </>
        )}
        {!loggedIn && (
          <Button
            variant="tertiary"
            title="logg ut"
            icon={<EnterIcon title="logg ut" fontSize="1.5rem" />}
            onClick={onLogout}
            iconPosition="right"
          >
            Login
          </Button>
        )}
      </HStack>
    </div>
  );
};

export default Header;
