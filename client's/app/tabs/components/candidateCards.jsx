import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import color from '../../../utils/color';
import { useAuth } from '../../../utils/authProvider';

const CandidateCards = ({ candidate }) => {
  const navigation = useNavigation();
  const router = useRouter();
  const { setPassedObject } = useAuth();

  // Add a default object to avoid accessing undefined properties
  const { imageUrl, name, detail } = candidate || {};

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setPassedObject({});
        setPassedObject(candidate);
        // navigation.navigate('pages/candidate_details');
        router.push(`/tabs/pages/candidate_details?id=${candidate.id}`);
      }}
    >
      {imageUrl ? (
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          alt="image"
        />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {name || 'Unknown Candidate'}
        </Text>
        <Text style={styles.detailText} numberOfLines={2}>
          {detail || 'No details available'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: color.white,
    flexDirection: 'row',
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: 84,
    height: 81,
    marginRight: 8,
    borderRadius: 8,
  },
  textContainer: {
    width: '80%',
    justifyContent: 'space-around',
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    color: color.textColor,
    fontSize: 18,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 16,
  },
  noImageText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32, // Center text vertically within image space
  },
});

export default CandidateCards;
