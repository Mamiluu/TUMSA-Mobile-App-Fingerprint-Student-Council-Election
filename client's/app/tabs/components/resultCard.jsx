import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import color from '../../../utils/color';
import { numberWithCommas } from '../../../utils/helpers';

const ResultCard = ({ candidate }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: candidate.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{candidate.name}</Text>
        <Text style={styles.voteText}>
          Votes:{' '}
          <Text style={styles.voteNumber}>
            {numberWithCommas(candidate.vote)}
          </Text>
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{candidate.party}</Text>
          <Text style={styles.infoText}>
            {candidate.category === 'Delegate' && candidate.state + ' State'}
            {candidate.category === 'Class Representative' && candidate.state + ' State - ' + candidate.lga}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.primary,
    padding: 8,
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 90,
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
  voteText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 16,
  },
  voteNumber: {
    fontFamily: 'Poppins-Regular',
    color: color.primary,
    fontSize: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ResultCard;
