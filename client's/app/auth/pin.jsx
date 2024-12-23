import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import SmoothPinCodeInput from "@zfloc/react-native-smooth-pincode-input";
import { db, doc, updateDoc } from "../../firebase";
import color from "../../utils/color";
import pinImage from "../../utils/assets/images/pin.png";

const TouchID = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { uid } = useLocalSearchParams();
  const router = useRouter();
  const handlePinSubmit = async () => {
    setErrorMsg(null);
    const isFieldsEmpty = pin !== "" && confirmPin !== "";
    const isPinMatch = pin === confirmPin;

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
    } else if (!isPinMatch) {
      setErrorMsg("Your PINs do not match!");
    } else {
      setLoading(true);
      try {
        await updateDoc(doc(db, "users", uid), { pin });
        router.replace({
          pathname: "/auth/fingerprint_id",
          params: { uid: uid },
        });
      } catch (error) {
        setErrorMsg("An error occurred while setting the PIN.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={30} color={color.textColor} />
          </TouchableOpacity>
          <Text style={styles.backText}>Back</Text>
        </View>

        <Text style={styles.title}>Voting PIN</Text>
        <Text style={styles.subtitle}>
          Choose a four(4) digit number which will be used to authenticate your vote.
        </Text>

        <View style={styles.center}>
          <Image source={pinImage} style={styles.image} />

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add backup PIN</Text>
            <SmoothPinCodeInput
              password
              mask="﹡"
              codeLength={4}
              cellSpacing={16}
              value={pin}
              onTextChange={setPin}
              cellStyle={styles.pinInputCell}
              cellStyleFocused={styles.pinInputCellFocused}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm backup PIN</Text>
            <SmoothPinCodeInput
              password
              mask="﹡"
              codeLength={4}
              cellSpacing={16}
              value={confirmPin}
              onTextChange={setConfirmPin}
              cellStyle={styles.pinInputCell}
              cellStyleFocused={styles.pinInputCellFocused}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handlePinSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add PIN</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  backText: {
    fontFamily: "Poppins-Regular",
    paddingLeft: 8,
    fontSize: 20,
    color: color.textColor,
  },
  title: {
    fontFamily: "Poppins-Regular",
    color: color.primary,
    textAlign: "left",
    fontSize: 32,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    color: color.secondaryTextColor,
    textAlign: "left",
    fontSize: 16,
    marginTop: 8,
  },
  center: {
    alignItems: "center",
    marginTop: 32,
  },
  image: {
    width: "80%",
    height: 240,
    resizeMode: "contain",
  },
  errorText: {
    color: color.error,
    fontSize: 18,
    marginVertical: 8,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 16,
    width: "100%",
  },
  label: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    textAlign: "left",
    fontSize: 18,
  },
  pinInputCell: {
    borderWidth: 2,
    borderColor: color.primary,
    borderRadius: 8,
  },
  pinInputCellFocused: {
    borderColor: color.textColor,
  },
  button: {
    marginTop: 32,
    backgroundColor: color.primary,
    padding: 16,
    borderRadius: 8,
    width: "85%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "#fff",
  },
});

export default TouchID;
