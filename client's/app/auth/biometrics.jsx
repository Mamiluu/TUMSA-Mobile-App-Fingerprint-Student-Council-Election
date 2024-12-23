import React from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import IMAGE from "../../utils/assets/images/biometrics.png";
import color from "../../utils/color";

const Biometrics = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={48} color={color.textColor} />
        </TouchableOpacity>
        <Text style={styles.backText}>Back</Text>
      </View>

      <Text style={styles.title}>Biometric verification</Text>
      <Text style={styles.subtitle}>Choose how to do your biometrics.</Text>

      <Image style={styles.image} source={IMAGE} />

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => router.push("/auth/fingerprint_id")}
      >
        <Text style={styles.buttonText}>Biometrical recognition</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonText}>Book a date for physical biometric</Text>
      </TouchableOpacity>
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
  backText: {
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
  image: {
    width: '83%',
    height: 368,
    alignSelf: "center",
  },
  button: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: '100%',
  },
  primaryButton: {
    backgroundColor: color.primary,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: '#fff',
  },
});

export default Biometrics;
