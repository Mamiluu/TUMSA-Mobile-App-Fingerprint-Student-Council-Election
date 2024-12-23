import { useState } from "react";
import {
  Text,
  Box,
  Button,
  Input,
  Image,
  Flex,
  Checkbox,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SiteBodyMaxWidth } from "../../components/containers";
import { colors } from "../../utils/colors";
import Ballot from "../../images/intro_1.png";
import IVOTE from "../../images/ivote.png";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  collection,
  getDocs,
  db,
  query,
  where,
} from "../../firebase";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    // clear message state
    setErrorMsg(null);
    setSuccessMsg(null);
    const isFieldsEmpty =
      fullName !== "" &&
      password !== "" &&
      email !== "" &&
      // authCode !== "" &&
      confirmPassword !== "";

    const isPasswordMatch = password === confirmPassword;

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
    } else {
      if (isPasswordMatch) {
        setLoading(true);
        const keyRef = collection(db, "auth_code");
        const q = query(keyRef, where("codes", "array-contains", authCode));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setErrorMsg("Invalid Authorization Code!");
          setLoading(false);
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              //  setCurrentUser(user);

              updateProfile(user, {
                displayName: fullName,
              })
                .then(() => {
                  setLoading(false);
                })
                .catch((error) => {
                  setLoading(false);
                  errorCode(error.code);
                });

              setAuthCode("");
              setEmail("");
              setFullName("");
              setConfirmPassword("");
              setPassword("");

              setSuccessMsg(
                "Registration was successful. Go to login page to sign in."
              );
            })
            .catch((error) => {
              setLoading(false);
              errorCode(error.code);
              console.log(error.message);
            });
          setLoading(false);
        }
        console.log(querySnapshot.size);
        console.log(querySnapshot.empty);
      } else {
        setErrorMsg("Password donot match!");
      }
    }
  };

  const errorCode = (code) => {
    switch (code) {
      case "auth/email-already-exists":
        setErrorMsg("Email is already in use by an existing user");
        break;
      case "auth/invalid-email":
        setErrorMsg("Email is invalid");
        break;
      case "auth/weak-password":
        setErrorMsg("Password should be at least 6 characters.");
        break;
      case "auth/email-already-in-use":
        setErrorMsg("Email is already in use.");
        break;
      default:
        setErrorMsg("An unknown error has occured.");
        break;
    }
  };

  return (
    <Center style={{ backgroundImage: `url(${IVOTE})` }} h="100vh" w="100vw">
      <SiteBodyMaxWidth>
        <Box
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="grey"
          rounded="25"
          p={10}
        >
          <Flex w="50%" direction="column" px="10">
            <Text fontSize="4xl" color={colors.primary} marginBottom="24px">
              TUMSA
            </Text>

            <Text fontSize="24px">Create your account</Text>
            <Flex>
              <Text fontSize="16px">Already have account?</Text>
              <Button
                color={colors.primary}
                fontWeight="normal"
                variant="link"
                ml={2}
                onClick={() => {
                  navigate("/");
                }}
              >
                Log In.
              </Button>
            </Flex>

            {/* Setting feedback messages */}
            {errorMsg && (
              <Text
                my={2}
                color="red"
                fontSize="16px"
                sx={{
                  textAlign: "center",
                }}
              >
                {errorMsg}
              </Text>
            )}

            {successMsg && (
              <Text
                my={2}
                color="lime"
                fontSize="16px"
                sx={{
                  textAlign: "center",
                }}
              >
                {successMsg}
              </Text>
            )}

            <Box mt={4}>
              <Text fontSize="16px">Full Name</Text>
              <Input
                placeholder="Enter your Full Name"
                value={fullName}
                borderColor={colors.primary}
                onChange={(event) => setFullName(event.target.value)}
              />
              <Text fontSize="16px" mt={4}>
                Email
              </Text>
              <Input
                placeholder="Enter your Email"
                value={email}
                borderColor={colors.primary}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Text fontSize="16px" mt={4}>
                Password
              </Text>
              <Input
                placeholder="Enter password"
                borderColor={colors.primary}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Text fontSize="16px" mt={4}>
                Confirm Password
              </Text>
              <Input
                placeholder="Confirm password"
                borderColor={colors.primary}
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <Text fontSize="16px" mt={4}>
                Authorizing code
              </Text>
              <Input
                placeholder="Enter Authorizing code"
                borderColor={colors.primary}
                value={authCode}
                onChange={(event) => setAuthCode(event.target.value)}
              />

              <Flex mt={4} align="center">
                <Checkbox
                  colorScheme="green"
                  value={terms}
                  onChange={(event) => setTerms(event.target.value)}
                />
                <Text fontSize="16px" ml={4}>
                  Agree to terms and conditions
                </Text>
              </Flex>

              <Button
                bgColor={colors.primary}
                color="white"
                variant="solid"
                fontWeight="normal"
                mt={4}
                w="100%"
                onClick={signUp}
                loadingText="Please wait..."
                isLoading={loading}
              >
                Create account
              </Button>
            </Box>
          </Flex>
          <Flex direction="column" px="10" alignItems="center">
            <Text fontSize="24px" textAlign="center">
              Ensuring the a free and fair election for all!{" "}
            </Text>

            <Image src={Ballot} w={400} h={400} mt={8} alt="image" />
          </Flex>
        </Box>
      </SiteBodyMaxWidth>
    </Center>
  );
}

export default SignUp;
