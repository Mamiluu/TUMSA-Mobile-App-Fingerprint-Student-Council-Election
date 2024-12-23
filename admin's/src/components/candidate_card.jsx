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

function CandidateCard({ candidate, onClick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

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
          src={candidate.imageUrl}
          width="96px"
          height={81}
          borderRadius={8}
        />
        <Flex direction="column" ml="12px" w="100%">
          <Text fontSize="18px" color={colors.grayText} noOfLines={2}>
            {candidate.name}
          </Text>
          <Text fontSize="16px" color={colors.primary}>
            {candidate.category} {candidate.state && ` -  ${candidate.state}`}{" "}
            {candidate.lga && ` -  ${candidate.lga}`}
          </Text>
          <Flex mt="8px" alignItems="center" justifyContent="space-between">
            <Text fontSize="12px" color={colors.grayText} fontWeight="bold">
              {candidate.party}
            </Text>
            <Button bgColor={colors.error} size="xs" onClick={onOpen}>
              <Text fontSize="12px" color={colors.gray}>
                Delete
              </Text>
            </Button>
          </Flex>
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
              Delete this candidate
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClick(candidate.id);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default CandidateCard;
