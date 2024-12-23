import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SmoothPinCodeInput from '@zfloc/react-native-smooth-pincode-input';
import { useNavigation } from '@react-navigation/native';
import color from '../../../utils/color';
import { db, doc, getDoc, updateDoc } from '../../../firebase';
import { useAuth } from '../../../utils/authProvider';

const ChangePin = () => {
  const [currentPin, setCurrentPin] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const navigation = useNavigation();

  const handleChange = async () => {
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      const isFieldsEmpty = currentPin !== "" && pin !== "" && confirmPin !== "";
      const isPinMatch = pin === confirmPin;

      if (!isFieldsEmpty) {
        setErrorMsg("All fields are required!");
      } else {
        if (isPinMatch) {
          setLoading(true);
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            if (docSnap.data().pin === currentPin) {
              await updateDoc(doc(db, "users", currentUser.uid), { pin });
              setSuccessMsg("Pin change was successful");
              setConfirmPin("");
              setCurrentPin("");
              setPin("");
              setLoading(false);
            } else {
              setErrorMsg("Your current PIN is wrong!");
              setLoading(false);
            }
          } else {
            console.log("No such user!");
            setLoading(false);
          }
        } else {
          setErrorMsg("Your PINs do not match!");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        <Text style={styles.title}>Change PIN</Text>
      </View>
      {errorMsg && (
        <Text style={[styles.message, { color: color.error }]}>{errorMsg}</Text>
      )}
      {successMsg && (
        <Text style={[styles.message, { color: color.primary }]}>{successMsg}</Text>
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter current PIN</Text>
            <SmoothPinCodeInput
              password
              mask="﹡"
              codeLength={4}
              cellSpacing={16}
              value={currentPin}
              onTextChange={(pin) => setCurrentPin(pin)}
              cellStyle={styles.pinInputCell}
              cellStyleFocused={styles.pinInputCellFocused}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter New PIN</Text>
            <SmoothPinCodeInput
              password
              mask="﹡"
              codeLength={4}
              cellSpacing={16}
              value={pin}
              onTextChange={(pin) => setPin(pin)}
              cellStyle={styles.pinInputCell}
              cellStyleFocused={styles.pinInputCellFocused}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New PIN</Text>
            <SmoothPinCodeInput
              password
              mask="﹡"
              codeLength={4}
              cellSpacing={16}
              value={confirmPin}
              onTextChange={(pin) => setConfirmPin(pin)}
              cellStyle={styles.pinInputCell}
              cellStyleFocused={styles.pinInputCellFocused}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChange}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={color.white} />
            ) : (
              <Text style={styles.buttonText}>Change PIN</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  pinInputCell: {
    borderWidth: 2,
    borderColor: color.primary,
    borderRadius: 8,
  },
  pinInputCellFocused: {
    borderColor: color.textColor,
  },
  button: {
    marginTop: 24,
    height: 50,
    borderRadius: 8,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: color.white,
    fontSize: 16,
  },
});

export default ChangePin;
