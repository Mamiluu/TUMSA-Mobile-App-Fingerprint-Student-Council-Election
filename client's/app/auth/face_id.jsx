import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import {
  storage,
  uploadBytes,
  getDownloadURL,
  ref,
  db,
  doc,
  updateDoc,
} from "../../firebase";
import { getValueFor } from "../../utils/helpers";
import color from "../../utils/color";

const FaceID = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setFaceDetected(faces.length > 0);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        setPreviewVisible(true);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleReset = () => {
    setPreviewVisible(false);
    setCapturedImage(null);
    setFaceDetected(false);
  };

  const handleImageUpload = async () => {
    setLoading(true);
    try {
      const uid = await getValueFor("UserID");
      const storageRef = ref(storage, "profile/" + uid);

      const fileInfo = await FileSystem.getInfoAsync(capturedImage);

      if (fileInfo.exists) {
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        
        const metadata = {
          contentType: "image/jpeg",
        };

        const snapshot = await uploadBytes(storageRef, blob, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(doc(db, "users", uid), { imageUrl: downloadURL });
        setLoading(false);
        router.replace("/tabs");
      } else {
        throw new Error('File does not exist');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please grant permission in your device settings.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={48} color={color.textColor} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Back</Text>
      </View>

      <Text style={styles.title}>Face ID</Text>
      <Text style={styles.subtitle}>Please look into the camera and hold still.</Text>
      <View style={styles.cameraContainer}>
        {previewVisible ? (
          <Image source={{ uri: capturedImage }} style={styles.image} />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.front}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: Camera.Constants.FaceDetector.Mode.fast,
              detectLandmarks: Camera.Constants.FaceDetector.Landmarks.none,
              runClassifications: Camera.Constants.FaceDetector.Classifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            <View style={{ flex: 1 }}></View>
          </Camera>
        )}
      </View>
      <Text style={styles.statusText}>
        {faceDetected ? "Face detected" : "Scanning..."}
      </Text>
      {faceDetected && (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={previewVisible ? handleReset : takePicture}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{previewVisible ? "Reset" : "Take Shot"}</Text>
        </TouchableOpacity>
      )}
      {previewVisible && (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, styles.uploadButton]}
          onPress={handleImageUpload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Complete Registration</Text>
          )}
        </TouchableOpacity>
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
  cameraContainer: {
    borderRadius: 240,
    height: 240,
    width: 240,
    alignSelf: "center",
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  statusText: {
    marginTop: 16,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: color.textColor,
    textAlign: "center",
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

export default FaceID;
