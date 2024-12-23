import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Platform, ActivityIndicator, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import color from '../../../utils/color';
import { db, doc, getDoc, updateDoc } from '../../../firebase';
import { useAuth } from '../../../utils/authProvider';
import DialogResponse from '../../auth/response_modal';

const ConfirmVote = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [iconName, setIconName] = useState();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [route, setRoute] = useState("");
  const [iconColor, setIconColor] = useState();
  const [buttonText, setButtonText] = useState("");

  const { passedObject, currentUser, updateUser, setUpdateUser } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      setErrorMsg("Your device doesn't support biometric authentication");
    }
  };

  const handleVote = async () => {
    try {
      setErrorMsg(null);
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to confirm your vote',
        fallbackLabel: 'Use passcode',
      });

      if (result.success) {
        setLoading(true);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const candidateRef = doc(db, "candidates", passedObject.id);
        const candidateSnap = await getDoc(candidateRef);
        
        if (candidateSnap.exists()) {
          const candidateData = candidateSnap.data();
          const votes = candidateData.vote === undefined ? 0 : candidateData.vote;
          if (docSnap.exists()) {
            const votedCategory = "voted." + passedObject.category;
            const count = votes + 1;
            await updateDoc(doc(db, "candidates", passedObject.id), {
              vote: count,
            });
            await updateDoc(doc(db, "users", currentUser.uid), {
              [votedCategory]: true,
            });
            setUpdateUser(!updateUser);
            setIconName("check-square");
            setIconColor(color.primary);
            setButtonText("Go back to vote page");
            setRoute("vote");
            setTitle("Thanks for voting!");
            setMessage("Your vote has been submitted. \n See results @ `Live Results`.");
            setModalVisible(true);
          } else {
            console.log("No such user!");
          }
        } else {
          setErrorMsg("No such Candidate!");
        }
      } else {
        setErrorMsg("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnClick = () => {
    setModalVisible(false);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <View style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Vote ({passedObject.category})</Text>
        <Text style={styles.subtitle}>Confirm your vote</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centerContent}>
          <Image
            style={styles.image}
            source={{ uri: passedObject.imageUrl }}
            alt="image"
          />
          <Text style={styles.candidateName}>{passedObject.name}</Text>
          <Text style={styles.candidateDetails}>
          {passedObject.category === "Presidential" && `Running mate: ${passedObject.runningMate}`}
              {passedObject.category === "Secretary General" && `Running mate:${passedObject.runningMate}`}
              {passedObject.category === "Delegate" && `${passedObject.state} State`}
              {passedObject.category === "Class Representative" && `${passedObject.state} State - ${passedObject.lga} LGA`}
          </Text>
          <Text style={styles.candidateDetails}>Party: {passedObject.party}</Text>
          {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleVote} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={color.white} />
            ) : (
              <Text style={styles.buttonText}>Authenticate to Confirm Vote</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <DialogResponse
              title={title}
              iconColor={iconColor}
              iconName={iconName}
              message={message}
              buttonText={buttonText}
              onClick={handleOnClick}
            />
          </View>
        </View>
      </Modal>
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
  subtitle: {
    color: color.secondaryTextColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  scrollViewContent: {
    padding: 16,
  },
  centerContent: {
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 16,
  },
  candidateName: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  candidateDetails: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  errorMsg: {
    color: color.error,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
  },
  pinInputCell: {
    borderWidth: 2,
    borderColor: color.primary,
    borderRadius: 8,
  },
  pinInputCellFocused: {
    borderColor: color.textColor,
  },
  pinLabel: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    marginTop: 24,
    height: 50,
    width: '85%',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: color.white,
    borderRadius: 8,
    padding: 16,
  },
});

export default ConfirmVote;