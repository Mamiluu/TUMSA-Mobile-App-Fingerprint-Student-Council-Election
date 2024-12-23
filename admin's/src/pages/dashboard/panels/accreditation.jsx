import { useState, useEffect } from "react";
import { Text, Box, Center, Input } from "@chakra-ui/react";
import VotersCard from "../../../components/voters_card";
import { colors } from "../../../utils/colors";
import {
  collection,
  db,
  getDocs,
  doc,
  query,
  updateDoc,
} from "../../../firebase";
import AccreditedCard from "../../../components/accredited_card";

const Accreditation = () => {
  const [unaccreditedVoters, setUnaccreditedVoters] = useState([]);
  const [accreditedVoters, setAccreditedVoters] = useState([]);
  const [updateVoters, setUpdateVoters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getVoters = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const fetchUnaccreditedVoters = [];
        const fetchAccreditedVoters = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const fetchItems = {
            id: doc.id,
            ...data,
          };
          if (data.isApproved === true) {
            fetchAccreditedVoters.push(fetchItems);
          } else if (data.isApproved === false) {
            fetchUnaccreditedVoters.push(fetchItems);
          }
        });
        setUnaccreditedVoters(fetchUnaccreditedVoters);
        setAccreditedVoters(fetchAccreditedVoters);
        console.count("fetchAccreditedVoters");
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };
    getVoters();
  }, [updateVoters]);

  const accreditate = async (id) => {
    try {
      await updateDoc(doc(db, "users", id), {
        isApproved: true,
      });
      setUpdateVoters(!updateVoters);
    } catch (error) {
      console.error("Error accreditating voter:", error);
    }
  };

  const unaccreditate = async (id) => {
    try {
      await updateDoc(doc(db, "users", id), {
        isApproved: false,
      });
      setUpdateVoters(!updateVoters);
    } catch (error) {
      console.error("Error unaccreditating voter:", error);
    }
  };

  const filteredAccreditedVoters = accreditedVoters.filter((voter) =>
    voter.name && voter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box display="flex" w="100%" h={24} margin="auto 0" flexDirection="column">
      <Box
        display="flex"
        w="100%"
        margin="auto 0"
        justifyContent="space-between"
      >
        <Box w="45%" height="50vh" overflow="scroll" pb={4}>
          <Text
            fontSize="16px"
            color={colors.grayText}
            mb="8px"
            mt="12px"
            mr="24px"
            fontWeight="bold"
          >
            Unaccredited Voters ({unaccreditedVoters.length})
          </Text>
          {unaccreditedVoters.length === 0 && (
            <Center>
              <Text
                fontSize="18px"
                alignSelf="center"
                fontWeight="bold"
                mt={24}
              >
                No Unaccredited Voters.
              </Text>
            </Center>
          )}
          {unaccreditedVoters.map((item) => (
            <VotersCard key={item.id} voters={item} onClick={accreditate} />
          ))}
        </Box>
        <Box w="45%" height="50vh" overflow="scroll" pb={4}>
          <Text
            fontSize="16px"
            fontWeight="bold"
            color={colors.grayText}
            mb="8px"
            mt="12px"
          >
            Accredited Voters ({accreditedVoters.length})
          </Text>
          <Input
            placeholder="Search accredited voters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          {filteredAccreditedVoters.length === 0 && (
            <Center>
              <Text
                fontSize="18px"
                alignSelf="center"
                fontWeight="bold"
                mt={24}
              >
                No Accredited Voters found.
              </Text>
            </Center>
          )}
          {filteredAccreditedVoters.map((item) => (
            <AccreditedCard key={item.id} voters={item} onClick={unaccreditate} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Accreditation;