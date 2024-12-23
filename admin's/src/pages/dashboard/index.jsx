import {
  Text,
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Center,
  Avatar,
  PopoverArrow,
  PopoverBody,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { colors } from "../../utils/colors";

import { FiUsers, FiCheckSquare, FiCalendar } from "react-icons/fi";
import Stat from "../../components/stat";
import News from "./panels/news";
import ElectionDate from "./panels/election_date";
import Candidate from "./panels/candidate";
import { onAuthStateChanged, auth } from "../../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, getDoc, doc, query, collection, getDocs } from "../../firebase";
import Accreditation from "./panels/accreditation";

function Dashboard() {
  const [currentUser, setCurrentUser] = useState();
  const [electionDate, setElectionDate] = useState("2023-06-22");
  const [userCount, setUserCount] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [presidentVotes, setPresidentVotes] = useState(0);
  const [secretaryGeneralVotes, setSecretaryGeneralVotes] = useState(0);
  const [delegateVotes, setDelegateVotes] = useState(0);
  const [classRepresentativeVotes, setClassRepresentativeVotes] = useState(0);
  let navigate = useNavigate();

  console.count("Dashboard - refreshed--------");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        navigate("/");
      }
    });
    console.count("onAuthStateChanged");
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    const getElectionDate = async () => {
      const docRef = doc(db, "elections", "date");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setElectionDate(docSnap.data().date.toString());
      } else {
        console.log("No such document!");
      }
    };
    console.count("getElectionDate");
    getElectionDate();
  }, [electionDate]);

  useEffect(() => {
    const getResult = async () => {
      const q = query(collection(db, "candidates"));
      const querySnapshot = await getDocs(q);
      let countPresident = 0;
      let countSecretaryGeneral = 0;
      let countDelegate = 0;
      let countClassRepresentative = 0;
      let count = 0;
      querySnapshot.forEach((doc) => {
        count = count + doc.data().vote;

        if (doc.data().category === "Presidential") {
          countPresident = countPresident + doc.data().vote;
        } else if (doc.data().category === "Secretary General") {
          countSecretaryGeneral = countSecretaryGeneral + doc.data().vote;
        } else if (doc.data().category === "Delegate") {
          countDelegate = countDelegate + doc.data().vote;
        } else if (doc.data().category === "Class Representative") {
          countClassRepresentative = countClassRepresentative + doc.data().vote;
        }
      });

      setTotalVotes(count);
      setPresidentVotes(countPresident);
      setSecretaryGeneralVotes(countSecretaryGeneral);
      setDelegateVotes(countDelegate);
      setClassRepresentativeVotes(countClassRepresentative);
    };
    console.count("getResult");
    getResult();
  }, [totalVotes]);

  useEffect(() => {
    const getUserCount = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      let count = 0;
      querySnapshot.forEach((doc) => {
        if (doc.data()) {
          count = count + 1;
        }
      });
      setUserCount(count);
    };
    getUserCount();
  }, [userCount]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Box>
      <Box
        display="flex"
        h="75px"
        bg={colors.primary}
        w="100%"
        px={12}
        alignItems="center"
        justifyContent="space-between"
        marginBottom="24px"
      >
        <Text fontSize="24px" display="flex" color="white">
          TUMSA-Choice
        </Text>
        <Flex alignItems="center">
          <Text fontSize="18px" display="flex" color="white" mr="16px">
            Hello, {currentUser?.displayName}
          </Text>

          <Popover>
            <PopoverTrigger>
              <Avatar
                name={currentUser?.displayName}
                style={{ cursor: "pointer" }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Center>
                  <VStack p={4}>
                    <Avatar name={currentUser?.displayName} size="2xl" />
                    <Text fontSize="18px" display="flex" color="black">
                      {currentUser?.displayName}
                    </Text>
                    <Text fontSize="18px" display="flex" color="black">
                      {currentUser?.email}
                    </Text>
                    <Button
                      colorScheme="red"
                      size="lg"
                      px={8}
                      onClick={() => {
                        auth.signOut();
                        navigate("/");
                      }}
                    >
                      Log Out
                    </Button>
                  </VStack>
                </Center>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Box>

      <Box maxW={1440} margin="0 auto">
        <Text fontSize="24px" display="flex" color={colors.grayText} mb="12px">
          Statistics
        </Text>
        <Box
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stat
            color={colors.gray}
            textColor={colors.grayText}
            bgColor={colors.primary}
            title="Total Registered Voters"
            number={numberWithCommas(userCount)}
          >
            <FiUsers fontSize={24} color={colors.gray} />
          </Stat>

          <Stat
            color={colors.gray}
            textColor={colors.grayText}
            bgColor={colors.primary}
            title="Total Votes Casted"
            number={numberWithCommas(totalVotes)}
          >
            <FiCheckSquare fontSize={24} color={colors.gray} />
          </Stat>

          <Stat
            color={colors.gray}
            textColor={colors.grayText}
            bgColor={colors.primary}
            title="Election Date"
            number="Sat, 7 February 2023"
            date={electionDate}
          >
            <FiCalendar fontSize={24} color={colors.gray} />
          </Stat>
        </Box>

        <Center>
          <HStack mt="24px" spacing={4}>
            <VStack
              borderColor={colors.primary}
              borderWidth={1}
              rounded={8}
              spacing={0}
              p={2}
              backgroundColor="#fff"
            >
              <Text fontSize="16px" display="flex" color={colors.grayText}>
                Presidential
              </Text>
              <Text fontSize="24px" display="flex" color={colors.grayText}>
                Votes: {numberWithCommas(presidentVotes)}
              </Text>
            </VStack>
            <VStack
              borderColor={colors.primary}
              borderWidth={1}
              rounded={8}
              spacing={0}
              p={2}
              backgroundColor="#fff"
            >
              <Text fontSize="16px" display="flex" color={colors.grayText}>
              Secretary General
              </Text>
              <Text fontSize="24px" display="flex" color={colors.grayText}>
                Votes: {numberWithCommas(secretaryGeneralVotes)}
              </Text>
            </VStack>
            <VStack
              borderColor={colors.primary}
              borderWidth={1}
              rounded={8}
              spacing={0}
              p={2}
              backgroundColor="#fff"
            >
              <Text fontSize="16px" display="flex" color={colors.grayText}>
              Delegate
              </Text>
              <Text fontSize="24px" display="flex" color={colors.grayText}>
                Votes: {numberWithCommas(delegateVotes)}
              </Text>
            </VStack>
            <VStack
              borderColor={colors.primary}
              borderWidth={1}
              rounded={8}
              spacing={0}
              p={2}
              backgroundColor="#fff"
            >
              <Text fontSize="16px" display="flex" color={colors.grayText}>
              Class Representative
              </Text>
              <Text fontSize="24px" display="flex" color={colors.grayText}>
                Votes: {numberWithCommas(classRepresentativeVotes)}
              </Text>
            </VStack>
          </HStack>
        </Center>
        <Text
          fontSize="24px"
          display="flex"
          color={colors.grayText}
          mb="12px"
          mt="24px"
        >
          Activities
        </Text>

        <Box>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList backgroundColor={colors.gray} borderRadius={8} padding={2}>
              <Tab borderRadius={8}>News/Updates</Tab>
              <Tab borderRadius={8}>Electoral Candidates</Tab>
              <Tab borderRadius={8}>Elections Date</Tab>
              <Tab borderRadius={8}>Voters Accreditation</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <News />
              </TabPanel>
              <TabPanel>
                <Candidate />
              </TabPanel>
              <TabPanel>
                <ElectionDate value={setElectionDate} />
              </TabPanel>
              <TabPanel>
                <Accreditation />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;