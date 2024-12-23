import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import color from '../../../utils/color';
import { useAuth } from '../../../utils/authProvider';

const CandidateDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { candidate } = useAuth();

  // Find the candidate with the matching id
  const selectedCandidate = candidate.find(c => c.id === id);

  if (!selectedCandidate) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Candidate not found</Text>
      </View>
    );
  }

  const { imageUrl, name, party, detail } = selectedCandidate;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.title}>Electoral Candidate</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.party}>Party: {party}</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {imageUrl ? (
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>No image available</Text>
          </View>
        )}
        <Text style={styles.detail}>{detail}</Text>
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
    paddingTop: 40, // Adjust for status bar
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
  center: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    color: color.textColor,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  name: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  party: {
    color: color.secondaryTextColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 16,
  },
  noImageContainer: {
    width: '100%',
    height: 240,
    backgroundColor: color.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  noImageText: {
    color: color.secondaryTextColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  detail: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 32,
  },
  errorText: {
    color: color.textColor,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CandidateDetails;