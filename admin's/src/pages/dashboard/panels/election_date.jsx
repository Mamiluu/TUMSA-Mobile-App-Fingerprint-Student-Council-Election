import { useState } from "react";
import { Text, Box, Button, Input } from "@chakra-ui/react";
import { colors } from "../../../utils/colors";

import { doc, setDoc, db } from "../../../firebase";

export default function ElectionDate({ value }) {
  const [date, setDate] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(value);

  const confirmDate = async (event) => {
    event.preventDefault();

    setErrorMsg(null);

    if (date === null) {
      setErrorMsg("Please pick a date!");
    } else {
      setLoading(true);
      await setDoc(doc(db, "elections", "date"), {
        date,
      });
      value(date);
      setSuccessMsg("Election date has been updated.");
      setLoading(false);
    }

    console.log(date);
  };

  return (
    <Box>
      <Text
        fontSize="16px"
        color={colors.grayText}
        mb="4px"
        mt="12px"
        mr="24px"
      >
        Election date
      </Text>
      {errorMsg && (
        <Text
          my={2}
          color="red"
          fontSize="18px"
          sx={{
            textAlign: "start",
          }}
        >
          {errorMsg}
        </Text>
      )}

      {successMsg && (
        <Text
          my={2}
          color="green"
          fontSize="18px"
          sx={{
            textAlign: "start",
          }}
        >
          {successMsg}
        </Text>
      )}

      <Box mt={8} w="40%">
        <Text fontSize="16px">Select Date</Text>
        <Input
          placeholder="Select Date"
          borderColor={colors.primary}
          value={date}
          type="date"
          onChange={(event) => setDate(event.target.value)}
        />
        <Button
          bgColor={colors.primary}
          _hover={colors.grayText}
          color="white"
          variant="solid"
          fontWeight="normal"
          mt={4}
          w="100%"
          onClick={confirmDate}
          loadingText="Updating date please wait..."
          isLoading={loading}
        >
          Update Election Date
        </Button>
      </Box>
    </Box>
  );
}
