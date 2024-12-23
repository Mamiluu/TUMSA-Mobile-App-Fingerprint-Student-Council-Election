import { Text, Image, Flex, Button, AlertDialog , useDisclosure, 
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,} from "@chakra-ui/react";
import { colors } from "../utils/colors";
import { useRef } from "react";

function AccreditedCard({ voters, onClick }) {
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
            <Button bgColor={colors.error} size="sm" onClick={onOpen}>
              <Text fontSize="14px" color={colors.gray}>
                Unaccreditate
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
              Unaccreditate this voters
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? 
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClick(voters.id);
                  onClose();
                }}
                ml={3}
              >
                Unaccreditate
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AccreditedCard;
