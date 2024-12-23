import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import color from '../../../utils/color';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from '../../../firebase';
import { useAuth } from '../../../utils/authProvider';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();

  const handleChange = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const isFieldsEmpty = currentPassword !== "" && confirmPassword !== "" && password !== "";

    if (!isFieldsEmpty) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (confirmPassword !== password) {
      setErrorMsg("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting to reauthenticate...");
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      console.log("Reauthentication successful. Attempting to update password...");
      await updatePassword(currentUser, password);
      
      console.log("Password updated successfully");
      setSuccessMsg("Password change was successful.\nPlease use it for your next login.");
      setCurrentPassword("");
      setConfirmPassword("");
      setPassword("");
      
      Alert.alert("Success", "Your password has been updated successfully.");
    } catch (error) {
      console.error("Error updating password:", error);
      handleErrorCode(error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleErrorCode = (code) => {
    console.log("Error code:", code);
    switch (code) {
      case "auth/weak-password":
        setErrorMsg("New password should be at least 6 characters.");
        break;
      case "auth/requires-recent-login":
        setErrorMsg("This operation is sensitive. Please try again.");
        break;
      case "auth/wrong-password":
        setErrorMsg("Current password is incorrect.");
        break;
      default:
        setErrorMsg("An error occurred: " + code);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
        <View style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
          <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Change Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          {errorMsg && (
            <Text style={[styles.message, { color: color.error }]}>{errorMsg}</Text>
          )}
          {successMsg && (
            <Text style={[styles.message, { color: color.primary }]}>{successMsg}</Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!show}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!show}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!show}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
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
            style={[styles.button, { backgroundColor: color.primary }]}
            onPress={handleChange}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Changing Password..." : "Change Password"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    backgroundColor: color.white,
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: color.textColor,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
  },
  content: {
    padding: 16,
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: color.textColor,
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginTop: 24,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: color.white,
    fontSize: 16,
  },
});

export default ChangePassword;