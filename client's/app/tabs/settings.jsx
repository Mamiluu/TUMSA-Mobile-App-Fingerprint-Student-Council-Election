import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../utils/authProvider';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { auth } from '../../firebase';
import color from '../../utils/color';

const Settings = () => {
  const [isReady, setIsReady] = useState(false);
  const navat = useNavigation();
  const router = useRouter();
  const { currentUser, User } = useAuth();

  useEffect(() => {
    setIsReady(true);
  }, []);

  const navigateTo = (screen) => {
    navat.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!isReady) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.avatar}
          source={{ uri: User?.imageUrl }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.displayName}>
            {currentUser?.displayName}
          </Text>
          <Text style={styles.userLocation}>
            {User?.state} Department
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigateTo('pages/profile')}>
          <View style={styles.option}>
            <Feather name="user" size={24} color={color.secondaryTextColor} />
            <Text style={styles.optionText}>Personal details</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity onPress={() => navigateTo('pages/change_password')}>
          <View style={styles.option}>
            <Feather name="lock" size={24} color={color.secondaryTextColor} />
            <Text style={styles.optionText}>Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('pages/change_pin')}>
          <View style={styles.option}>
            <Feather name="key" size={24} color={color.secondaryTextColor} />
            <Text style={styles.optionText}>Change Voting PIN</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More Information</Text>
        <TouchableOpacity onPress={() => navigateTo('pages/terms')}>
          <View style={styles.option}>
            <Feather name="file-text" size={24} color={color.secondaryTextColor} />
            <Text style={styles.optionText}>Terms and conditions</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingVertical: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  userInfo: {
    alignSelf: 'center',
  },
  displayName: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: color.textColor,
  },
  userLocation: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: color.primary,
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: color.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.primary,
    marginBottom: 8,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    color: color.textColor,
    fontSize: 16,
    marginLeft: 16,
    alignSelf: 'center',
  },
  logoutButton: {
    backgroundColor: color.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutButtonText: {
    fontFamily: 'Poppins-Regular',
    color: color.white,
    fontSize: 14,
  },
});

export default Settings;