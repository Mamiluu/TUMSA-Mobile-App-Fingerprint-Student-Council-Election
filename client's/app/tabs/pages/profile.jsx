import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../utils/authProvider';
import color from '../../../utils/color';

const Profile = () => {
  const { User, loading, currentUser, getUserDetails } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const refreshUserData = async () => {
      if (currentUser) {
        await getUserDetails(currentUser.uid);
      }
    };
    refreshUserData();
  }, [currentUser, getUserDetails]);

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!User) {
    return <View style={styles.container}><Text>Error loading user data</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
          <View style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.center}>
          {User?.imageUrl ? (
            <Image
              style={styles.profileImage}
              source={{ uri: User.imageUrl }}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>
                {User?.firstName?.[0]}{User?.lastName?.[0]}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.value}>{User?.firstName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Last Name</Text>
              <Text style={styles.value}>{User?.lastName}</Text>
            </View>
          </View>
          <View style={styles.columnFull}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{User?.email}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{User?.gender}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>RegNo</Text>
              <Text style={styles.value}>{User?.nin}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Department</Text>
              <Text style={styles.value}>{User?.department}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  headerTitle: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  scrollView: {
    padding: 16,
  },
  center: {
    alignItems: 'center',
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  placeholderImage: {
    backgroundColor: color.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: color.white,
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
  },
  infoContainer: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    width: '48%',
  },
  columnFull: {
    marginBottom: 16,
  },
  label: {
    color: color.secondaryTextColor,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  value: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default Profile;