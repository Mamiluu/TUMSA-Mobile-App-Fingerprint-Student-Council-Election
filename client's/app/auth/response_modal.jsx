import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import color from "../../utils/color";

const DialogResponse = ({ iconName, iconColor, title, message, buttonText, onClick }) => {
  return (
    <View style={styles.center}>
      <Feather name={iconName} size={64} color={iconColor} />
      <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: iconColor }]}
        onPress={onClick}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 24,
    marginVertical: 8,
  },
  message: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 16,
  },
});

export default DialogResponse;
