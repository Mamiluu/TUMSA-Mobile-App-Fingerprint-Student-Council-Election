import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from 'expo-local-authentication';
import {
  db,
  doc,
  updateDoc,
} from "../../firebase";
import { getValueFor } from "../../utils/helpers";
import color from "../../utils/color";

const FingerprintID = () => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasHardware, setHasHardware] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasHardware(compatible);
      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
          alert("No fingerprints registered. Please register a fingerprint in your device settings.");
        }
      } else {
        alert("Fingerprint authentication is not available on this device.");
      }
    })();
  }, []);

  const handleAuthenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint",
    });
    if (result.success) {
      setAuthenticated(true);
      handleUserAuthenticationUpdate();
    } else {
      alert("Authentication failed. Please try again.");
    }
  };

  const handleUserAuthenticationUpdate = async () => {
    setLoading(true);
    try {
      const uid = await getValueFor("UserID");
      await updateDoc(doc(db, "users", uid), { fingerprintAuthenticated: true });
      setLoading(false);
      router.replace("/tabs");
    } catch (error) {
      console.error('Error updating user authentication status:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={48} color={color.textColor} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Back</Text>
      </View>

      <Text style={styles.title}>Fingerprint ID</Text>
      <Text style={styles.subtitle}>
        {hasHardware ? "Please authenticate using your fingerprint." : "Fingerprint authentication is not available on this device."}
      </Text>
      
      {hasHardware && (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleAuthenticate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Authenticate</Text>
        </TouchableOpacity>
      )}

      {authenticated && (
        <ActivityIndicator size="small" color="#000" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  headerText: {
    paddingLeft: 8,
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    color: color.textColor,
  },
  title: {
    fontFamily: "Poppins-Regular",
    color: color.primary,
    fontSize: 28,
    textAlign: "left",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    color: color.secondaryTextColor,
    fontSize: 16,
    textAlign: "left",
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: color.primary,
    width: "80%",
    alignSelf: "center",
  },
  uploadButton: {
    marginTop: 16,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "#fff",
  },
});

export default FingerprintID;
 