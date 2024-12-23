import {
  Text,
  Image,
  Flex,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

import { colors } from "../utils/colors";

function VotersCard({ voters, onClick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  // console.log(voters);

  return (
    <>
      <Flex
        direction="row"
        alignItems="center"
        backgroundColor={colors.gray}
        padding={2}
        borderRadius={8}
        mb={2}
        mx={2}
      >
        <Image
          src={voters.imageUrl}
          width="96px"
          height={81}
          borderRadius={8}
        />
        <Flex direction="column" ml="12px" w="100%">
          <Flex mt="8px" alignItems="center" justifyContent="space-between">
            <Text fontSize="20px" color={colors.grayText} noOfLines={2}>
              {voters.lastName} {voters.firstName}
            </Text>
            <Button bgColor={colors.primary} size="sm" onClick={onOpen}>
              <Text fontSize="14px" color={colors.gray}>
                Accreditate
              </Text>
            </Button>
          </Flex>
          <Text fontSize="16px" color={colors.grayText} fontWeight="bold">
            NIN: {voters.nin}
          </Text>
          <Text fontSize="16px" color={colors.primary}>
            {voters.state && `${voters.state} (State)`}
            {" - "}
            {voters.lga && `  ${voters.lga} (LGA)`}
          </Text>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Accreditate this voters
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  onClick(voters.id);
                  onClose();
                }}
                ml={3}
              >
                Accreditate
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default VotersCard;
