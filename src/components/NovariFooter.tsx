import React from "react";
import { Box, Heading, HStack, Link } from "@navikt/ds-react";
// import { NovariIKS } from "../logo/NovariIKS";

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
      }}
      className={"bg-[#6B133D] "}
    >
      <HStack gap="4" align="center">
        <Heading level="2" size="medium" spacing>
          {/*<Link href="http://novari.no">*/}
          {/*  /!*<NovariIKS width={"9em"} />*!/*/}
          {/*</Link>*/}
            logo
        </Heading>

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
