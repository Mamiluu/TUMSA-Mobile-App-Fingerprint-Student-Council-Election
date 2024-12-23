import { useState, useEffect } from "react";
import { Text, Box, Button, Input, Textarea, Center } from "@chakra-ui/react";
import { colors } from "../../../utils/colors";
import NewsCard from "../../../components/news_card";

import {
  collection,
  addDoc,
  db,
  getDocs,
  deleteDoc,
  doc,
} from "../../../firebase";

function News() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [date, setDate] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchNewsItems = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const fetchItem = {
          id: doc.id,
          ...doc.data(),
        };
        fetchNewsItems.push(fetchItem);
        // console.log(doc);
      });
      setNews(fetchNewsItems);
    };

    getNews();
  }, [loading, update]);

  const deleteNews = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "news", id));
    setUpdate(!update);
  };

  const addNews = async (event) => {
    event.preventDefault();
    // clear message state
    setErrorMsg(null);
    setSuccessMsg(null);

    const isFieldsEmpty =
      title !== "" && detail !== "" && imageUrl !== "" && date !== null;

    console.log(date);

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
    } else {
      setLoading(true);
      try {
        await addDoc(collection(db, "news"), {
          title,
          detail,
          imageUrl,
          date,
        });
        setSuccessMsg("News/Update item added successfully.");
        setDate(null);
        setDetail("");
        setTitle("");
        setImageUrl("");
        setLoading(false);
      } catch (e) {
        setErrorMsg("Error adding News/Update item.");
        setLoading(false);
      }
    }
  };

  return (
    <Box display="flex" w="100%" h={24} margin="auto 0" flexDirection="column">
      <Box display="flex" w="100%" margin="auto 0">
        <Box w="60%">
          <Text
            fontSize="16px"
            color={colors.grayText}
            mb="4px"
            mt="12px"
            mr="24px"
          >
            Add News/Updates
          </Text>
          {errorMsg && (
            <Text
              my={2}
              color="red"
              fontSize="16px"
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
        </Box>
        <Box
          w="40%"
          display="flex"
          direction="column"
          justifyContent="space-between"
        >
          <Text fontSize="16px" color={colors.grayText} mb="4px" mt="12px">
            News/Updates
          </Text>
        </Box>
      </Box>

      <Box display="flex" w="100%" margin="auto 0">
        <Box
          w="60%"
          display="flex"
          direction="column"
          justifyContent="space-between"
          pr={8}
        >
          {/* Input Left */}
          <Box w="48%" direction="column">
            <Box mt={8}>
              <Text fontSize="16px">Title</Text>
              <Input
                placeholder="Enter Title"
                value={title}
                borderColor={colors.primary}
                onChange={(event) => setTitle(event.target.value)}
              />

              <Text fontSize="16px" mt={2}>
                Details
              </Text>
              <Textarea
                placeholder="Enter News Details"
                value={detail}
                borderColor={colors.primary}
                onChange={(event) => setDetail(event.target.value)}
              />

              <Button
                bgColor={colors.primary}
                color="white"
                variant="solid"
                fontWeight="normal"
                mt={4}
                w="100%"
                onClick={addNews}
                loadingText="Adding please wait..."
                isLoading={loading}
              >
                Add News
              </Button>
            </Box>
          </Box>

          {/* Input Right */}
          <Box w="48%" direction="column">
            <Box mt={8}>
              <Text fontSize="16px">Date</Text>
              <Input
                placeholder="Select Date"
                borderColor={colors.primary}
                value={date}
                type="date"
                onChange={(event) => setDate(event.target.value)}
              />
              <Text fontSize="16px" mt={2}>
                Image Url
              </Text>
              <Input
                placeholder="Enter Image Link"
                value={imageUrl}
                borderColor={colors.primary}
                onChange={(event) => setImageUrl(event.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/*  News/Updates */}
        <Box w="40%" height="50vh" overflow="scroll" pb={4}>
          {news.length === 0 && (
            <Center>
              <Text
                fontSize="18px"
                alignSelf="center"
                fontWeight="bold"
                mt={24}
              >
                No Posted News/Updates.
              </Text>
            </Center>
          )}
          {news.map((item) => (
            <NewsCard key={item.id} news={item} onClick={deleteNews} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default News;
