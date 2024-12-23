import { useState } from "react";
import {
  Text,
  Box,
  Button,
  Input,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SiteBodyMaxWidth } from "../../components/containers";
import { colors } from "../../utils/colors";
import Ballot from "../../images/ballot.png";
import { auth, signInWithEmailAndPassword } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    // clear message state
    setErrorMsg(null);
    const isFieldsEmpty = email !== "" && password !== "";

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(error.code);
          errorCode(error.code);
          setLoading(false);
        });
    }
  };

  const errorCode = (code) => {
    switch (code) {
      case "auth/user-not-found":
        setErrorMsg("User does not exist!");
        break;
      case "auth/invalid-email":
        setErrorMsg("Email is invalid");
        break;
      default:
        setErrorMsg("An unknown error has occured.");
        break;
    }
  };

  return (
    <Center style={{ background: "#ffff" }} h="100vh" w="100vw">
      <SiteBodyMaxWidth>
        <Box
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          margin="auto 0"
          backgroundColor="grey"
          rounded="25"
          px={10}
          py={20}
        >
          <Flex w="50%" direction="column" px="10">
            <Text fontSize="4xl" color={colors.primary} marginBottom="108px">
              TUMSA-Choice
            </Text>

            <Text fontSize="24px">Welcome back</Text>
            <Flex>
              <Text fontSize="16px">New to election portal?</Text>
              <Button
                color={colors.primary}
                fontWeight="normal"
                variant="link"
                ml={2}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                create an account.
              </Button>
            </Flex>

            {/* Setting feedback messages */}
            {errorMsg && (
              <Text
                my={2}
                color="red"
                fontSize="18px"
                sx={{
                  textAlign: "center",
                }}
              >
                {errorMsg}
              </Text>
            )}

            <Box mt={12}>
              <Text fontSize="16px">Email</Text>
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
              <Button
                bgColor={colors.primary}
                color="white"
                variant="solid"
                fontWeight="normal"
                mt={4}
                w="100%"
                onClick={signIn}
                loadingText="Loading"
                isLoading={loading}
              >
                Log In
              </Button>
            </Box>
          </Flex>
          <Flex direction="column" px="10" alignItems="center">
            <Text fontSize="24px" textAlign="center">
              Ensuring the a free and fair election for all!{" "}
            </Text>

            <Image src={Ballot} w={400} h={400} alt="image" />
          </Flex>
        </Box>
      </SiteBodyMaxWidth>
    </Center>
  );
}

export default Login;
