import React from "react";
import { Box, HStack, Link } from "@navikt/ds-react";
import { NovariIKS } from "../logo/NovariIKS";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  links: FooterLink[];
}

export const NovariFooter = ({ links }: FooterProps) => {
  return (
    <Box
      style={{
        padding: "2rem",
        marginTop: "2rem",
        textAlign: "center",
          backgroundColor: "var(--a-surface-alt-3-moderate)"
      }}

    >
      <HStack gap="4" align="center">

          <Link href="http://novari.no">
            <NovariIKS width={"9em"} aria-label="Novari logo" />
          </Link>

        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.href} style={{ color: "#FCF5ED" }}>
              {link.label}
            </Link>
            {index < links.length - 1 && <p style={{ color: "#FCF5ED" }}>|</p>}
          </React.Fragment>
        ))}
      </HStack>
    </Box>
  );
};

export default NovariFooter;
