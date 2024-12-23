import { Center } from "@chakra-ui/react";

export default function iconHolder({ bgColor, children, size }) {
  return (
    <Center
      backgroundColor={bgColor}
      height={size}
      width={size}
      borderRadius={48}
    >
      {children}
    </Center>
  );
}
