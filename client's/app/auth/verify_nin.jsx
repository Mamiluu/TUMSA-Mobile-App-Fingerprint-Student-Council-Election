import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { collection, getDocs, db, query, where } from "../../firebase";
import DialogResponse from "./response_modal";
import color from "../../utils/color";

const VerifyNIN = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [iconName, setIconName] = useState();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [route, setRoute] = useState("");
  const [iconColor, setIconColor] = useState();
  const [buttonText, setButtonText] = useState("");
  const [NIN, setNIN] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSizeClick = async () => {
    if (NIN !== "") {
      setLoading(true);
      const ninRef = collection(db, "nin");
      const q = query(ninRef, where("numbers", "array-contains", NIN));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setIconName("thumbs-up");
        setIconColor(color.primary);
        setButtonText("Proceed");
        setRoute("/auth/register");
        setTitle("Verification Successful");
        setMessage(
          "Congratulations you are eligible to vote, please proceed by clicking on the button below to complete your registration.."
        );
        setModalVisible(true);
      } else {
        setIconName("thumbs-down");
        setIconColor(color.error);
        setButtonText("Cancel");
        setRoute("/auth/verify_nin");
        setTitle("Verification Failed");
        setMessage(
          "Sorry you are not eligible to vote, please check the NIN you provided and try again."
        );
        setModalVisible(true);
      }
      setLoading(false);
    }
  };

  const handleOnclick = () => {
    setModalVisible(false);
    navigation.navigate(route, {
      nin: NIN,
    });
  };

  return (
    <>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', marginBottom: 32, alignItems: 'center' }}>
          <TouchableOpacity >
          <Link href="login">
          <MaterialIcons name="chevron-left" size={40} color={color.textColor} />
        </Link>
          </TouchableOpacity>
          <Text style={{ fontFamily: "Poppins-Regular", paddingLeft: 8, fontSize: 24, color: color.textColor }}>
            Login
          </Text>
        </View>

        <Text style={{ fontFamily: "Poppins-Regular", color: color.primary, textAlign: "left", fontSize: 28 }}>
          NIN verification
        </Text>
        <Text style={{ fontFamily: "Poppins-Regular", color: color.secondaryTextColor, textAlign: "left", fontSize: 16 }}>
          Your NIN is used to verify your eligibility to vote.
        </Text>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontFamily: "Poppins-Regular", color: color.textColor, textAlign: "left", fontSize: 18 }}>
            Registration Number
          </Text>
          <TextInput
            style={{ borderColor: color.primary, borderWidth: 1, padding: 12, fontSize: 18, borderRadius: 8, marginTop: 8 }}
            placeholder="Enter NIN"
            value={NIN}
            onChangeText={(text) => setNIN(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            marginTop: 24,
            backgroundColor: color.primary,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handleSizeClick}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF", fontFamily: "Poppins-Regular", fontSize: 18 }}>
              Verify NIN
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
            <DialogResponse
              title={title}
              iconColor={iconColor}
              iconName={iconName}
              message={message}
              buttonText={buttonText}
              onClick={handleOnclick}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default VerifyNIN;
