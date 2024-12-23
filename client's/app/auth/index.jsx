import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword, auth } from "../../firebase";
import color from "../../utils/color";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signIn = () => {
    setErrorMsg(null);
    const isFieldsEmpty = email !== "" && password !== "";

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.replace("/tabs");
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
      case "auth/missing-email":
        setErrorMsg("Missing Email Address");
        break;
      case "auth/wrong-password":
        setErrorMsg("Wrong Email or password");
        break;
      case "auth/invalid-email":
        setErrorMsg("Email Address is invalid");
        break;
      default:
        setErrorMsg("An unknown error has occurred.");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TUMSA</Text>
      <Text style={styles.loginText}>Login</Text>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={!show}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShow(!show)}>
            <MaterialIcons
              name={show ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={signIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don’t have an account?</Text>
        <Link href="/auth/register">
          <Text style={styles.registerLink}> Register</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontFamily: "Poppins-Regular",
    color: color.primary,
    textAlign: "center",
    fontSize: 32,
  },
  loginText: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    textAlign: "left",
    fontSize: 24,
    marginTop: 48,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    marginVertical: 16,
    color: color.error,
    fontSize: 18,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 24,
  },
  label: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    textAlign: "left",
    fontSize: 18,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    padding: 12,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  button: {
    marginTop: 48,
    backgroundColor: color.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "#fff",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 96,
  },
  registerText: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    fontSize: 18,
  },
  registerLink: {
    fontFamily: "Poppins-Regular",
    color: color.primary,
    fontSize: 18,
  },
});

export default Login;
