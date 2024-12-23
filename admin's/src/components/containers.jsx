import { Box } from "@chakra-ui/react";

export function SiteBodyMaxWidth({ children }) {
  return (
    <Box
      maxW={1024}
      //   height="100vh"
      //   backgroundColor="darkmagenta"
      margin="auto 0"
    >
      {children}
    </Box>
  );
}
