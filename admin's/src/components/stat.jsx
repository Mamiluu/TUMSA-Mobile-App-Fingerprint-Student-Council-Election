import { Text, Box, Flex } from "@chakra-ui/react";
import IconHolder from "./iconHolder";
import { format } from "date-fns";

export default function Stat({
  color,
  textColor,
  bgColor,
  children,
  title,
  number,
  date,
}) {
  // console.log(format(new Date(electionDate), "do, MMMM yyyy"));
  return (
    <Box
      display="flex"
      alignItems="center"
      backgroundColor={color}
      borderRadius={8}
      px="24px"
      py="12px"
    >
      <IconHolder bgColor={bgColor} size={16}>
        {children}
      </IconHolder>
      <Flex direction="column" ml="24px" alignItems="center">
        <Text fontSize="16px" display="flex" color={textColor} mb="8px">
          {title}
        </Text>
        <Text fontSize="24px" display="flex" color={textColor}>
          {date === undefined
            ? number
            : format(new Date(date), "do, MMMM yyyy")}
        </Text>
      </Flex>
    </Box>
  );
}
