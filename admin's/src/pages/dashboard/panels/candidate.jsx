import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Button,
  Input,
  Textarea,
  Select,
  Center,
} from "@chakra-ui/react";
import { colors } from "../../../utils/colors";
import CandidateCard from "../../../components/candidate_card";
import { statesOption } from "../utils/state";
import { toggleLGA } from "../utils/lga";

import {
  addDoc,
  collection,
  db,
  getDocs,
  deleteDoc,
  doc,
} from "../../../firebase";

function Candidate() {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [runningMate, setRunningMate] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  const [lgaList, setLgaList] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const [mate, setMate] = useState(true);
  const [_state, set_State] = useState(true);
  const [_lga, set_Lga] = useState(true);
  const [updateCandidate, setUpdateCandidate] = useState(0);

  useEffect(() => {
    const getCandidate = async () => {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const fetchCandidate = [];
      querySnapshot.forEach((doc) => {
        const fetchItem = {
          id: doc.id,
          ...doc.data(),
        };
        fetchCandidate.push(fetchItem);
      });
      setCandidate(fetchCandidate);
    };

    getCandidate();
  }, [loading, updateCandidate]);

  const deleteCandidate = async (id) => {
    await deleteDoc(doc(db, "candidates", id));
    setUpdateCandidate(!updateCandidate);
  };

  const addCandidate = async (event) => {
    event.preventDefault();

    // clear message state
    setErrorMsg(null);
    setSuccessMsg(null);

    const isFieldsEmpty =
      name !== "" &&
      party !== "" &&
      imageUrl !== "" &&
      detail !== "" &&
      category !== "";

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
    } else {
      setLoading(true);
      try {
        await addDoc(collection(db, "candidates"), {
          name,
          party,
          detail,
          imageUrl,
          category,
          runningMate,
          state,
          lga,
          vote: 0,
        });
        setSuccessMsg("Electorial candidate added successfully.");
        setName("");
        setDetail("");
        setParty("");
        setImageUrl("");
        setCategory("");
        setState("");
        setLga("");
        setRunningMate("");
        setLoading(false);
      } catch (e) {
        setErrorMsg("Error adding electorial candidate.");
        setLoading(false);
      }
    }
  };

  const populateLGA = (state) => {
    const lga = toggleLGA(state);
    setLgaList(lga);
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
            fontWeight="bold"
          >
            Add Electorial Candidate
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
        </Box>
        <Box
          w="40%"
          display="flex"
          direction="column"
          justifyContent="space-between"
        >
          <Text
            fontSize="16px"
            fontWeight="bold"
            color={colors.grayText}
            mb="4px"
            mt="12px"
          >
            Candidate/Updates
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
              <Text fontSize="16px">Candidate Name</Text>
              <Input
                placeholder="Enter Candidate Name"
                value={name}
                borderColor={colors.primary}
                onChange={(event) => setName(event.target.value)}
              />

              <Text fontSize="16px" mt={2}>
                Party
              </Text>
              <Select
                placeholder="Select Candidate's Party"
                borderColor={colors.primary}
                value={party}
                onChange={(event) => setParty(event.target.value)}
              >
                <option value="PNU">PNU</option>
                <option value="ODM">ODM</option>
              </Select>

              <Text fontSize="16px" mt={2}>
                Candidate Image Url
              </Text>
              <Input
                placeholder="Enter Image Link"
                value={imageUrl}
                borderColor={colors.primary}
                onChange={(event) => setImageUrl(event.target.value)}
              />

              <Text fontSize="16px" mt={2}>
                Details
              </Text>
              <Textarea
                placeholder="Enter Candidate Details"
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
                onClick={addCandidate}
                loadingText="Adding candidate please wait..."
                isLoading={loading}
              >
                Add Candidate
              </Button>
            </Box>
          </Box>

          {/* Input Right */}
          <Box w="48%" direction="column">
            <Box mt={8}>
              <Text fontSize="16px" mt={2}>
                Category
              </Text>
              <Select
                placeholder="Select Category"
                borderColor={colors.primary}
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  console.log(event.target.value);
                  if (event.target.value === "Presidential") {
                    setState("");
                    setLga("");
                    setMate(false);
                    set_Lga(true);
                    set_State(true);
                  } else if (event.target.value === "Secretary General") {
                    setState("");
                    setLga("");
                    setMate(false);
                    set_Lga(true);
                    set_State(true);
                  } else if (event.target.value === "Delegate") {
                    setRunningMate("");
                    setMate(true);
                    set_Lga(false);
                    set_State(false);
                  } else if (
                    event.target.value === "Class Representative"
                  ) {
                    setRunningMate("");
                    setMate(true);
                    set_Lga(false);
                    set_State(false);
                  }
                }}
              >
                <option value="Presidential">
                  Presidential
                </option>
                <option value="Secretary General">
                Secretary General
                </option>
                <option value="Delegate">Delegate</option>
                <option value="Class Representative">
                Class Representative
                </option>
              </Select>
              <Text fontSize="16px" mt={2}>
                Running Mate's Name
              </Text>
              <Input
                placeholder="Enter Name"
                value={runningMate}
                borderColor={colors.primary}
                onChange={(event) => {
                  setRunningMate(event.target.value);
                }}
                disabled={mate}
              />
              <Text fontSize="16px" mt={2}>
                State
              </Text>
              <Select
                placeholder="Select State"
                borderColor={colors.primary}
                value={state}
                onChange={(event) => {
                  populateLGA(event.target.value);
                  setState(event.target.value);
                }}
                disabled={_state}
              >
                {statesOption.map((item, i) => item)}
              </Select>
              <Text fontSize="16px" mt={2}>
                LGA
              </Text>
              <Select
                placeholder="Select LGA"
                borderColor={colors.primary}
                value={lga}
                onChange={(event) => setLga(event.target.value)}
                disabled={_lga}
              >
                {lgaList.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>

        {/*  Candidate/Updates */}
        <Box w="40%" height="50vh" overflow="scroll" pb={4}>
          {candidate.length === 0 && (
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
          {candidate.map((item) => (
            <CandidateCard
              key={item.id}
              candidate={item}
              onClick={deleteCandidate}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Candidate;
