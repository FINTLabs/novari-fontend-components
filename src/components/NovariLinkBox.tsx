import React from "react";
import { BodyLong, Box, Heading } from "@navikt/ds-react";
import { ArrowRightIcon } from "@navikt/aksel-icons";

export interface LinkBoxProps {
  title: string;
  description: string;
  href?: string;
}

//TODO: this is coming soon in nav aksel, so delete here
const NovariLinkBox: React.FC<LinkBoxProps> = ({
  title,
  description,
  href,
}) => {
  return (
    <Box
      as="a"
      href={href}
      padding="space-6"
      // background="surface-subtle"
      borderRadius="full"
      width="auto"
      maxWidth="400px"
      className="block no-underline hover:bg-gray-200 transition-all "
    >
      <Heading size="medium" className="text-[#500F2D]">
        {title}
      </Heading>
      <BodyLong spacing>{description}</BodyLong>
      <div className="flex justify-end mt-4">
        <ArrowRightIcon fontSize="1.5rem" className="text-purple-600" />
      </div>
    </Box>
  );
};

export default NovariLinkBox;
