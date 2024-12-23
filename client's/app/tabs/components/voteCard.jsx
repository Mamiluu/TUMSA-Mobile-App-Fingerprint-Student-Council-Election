import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../../../utils/color';
import { useAuth } from '../../../utils/authProvider';

const VoteCard = ({ candidate = {} }) => {
  const { setPassedObject } = useAuth();
  const navigation = useNavigation();
  const { imageUrl, name, category, runningMate, state, lga, party } = candidate;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setPassedObject({});
        setPassedObject(candidate);
        navigation.navigate('pages/confirm_vote');
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name || 'Unknown Candidate'}</Text>
        <Text style={styles.categoryText} numberOfLines={1}>
          {category === 'Presidential' &&
            'Running mate: ' + (runningMate || 'Unknown')}
          {category === 'Secretary General' &&
            'Running mate: ' + (runningMate || 'Unknown')}
          {category === 'Delegate' &&
            (state || 'Unknown') + ' State' }
          {category === 'Class Representative' &&
            (state || 'Unknown') + ' State - ' + (lga || 'Unknown')}
        </Text>
        <Text style={styles.partyText} numberOfLines={1}>
          Party: {party || 'Unknown Party'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: color.white,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    marginBottom: 16,
  },
  image: {
    width: 84,
    height: 81,
    marginRight: 8,
    borderRadius: 8,
  },
  noImage: {
    width: 84,
    height: 81,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: color.secondaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: color.white,
    fontSize: 16,
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
  categoryText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 16,
  },
  partyText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default VoteCard;