import {
  Text,
  Image,
  Flex,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { colors } from "../utils/colors";

// import { db, doc, deleteDoc } from "../firebase";

function NewsCard({ news, onClick }) {
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
        <Image src={news.imageUrl} width="96px" height={81} borderRadius={8} />
        <Flex direction="column" ml="12px" w="100%">
          <Text fontSize="16px" color={colors.grayText} noOfLines={2}>
            {news.title}
          </Text>
          <Flex
            mt="8px"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Text fontSize="14px" color={colors.grayText}>
              {news.date}
            </Text>
            <Button bgColor={colors.error} size="xs" onClick={onOpen}>
              <Text fontSize="14px" color={colors.gray}>
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
              Delete this News/Update items
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
                  onClick(news.id);
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

export default NewsCard;
