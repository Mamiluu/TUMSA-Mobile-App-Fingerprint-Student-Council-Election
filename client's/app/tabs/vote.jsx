import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/authProvider';
import color from '../../utils/color';
import CategoryCard from './components/categoryCard';

import IMAGE from '../../utils/assets/images/no_election.png';
import ACCREDITED from '../../utils/assets/images/accredited.png';

const Vote = () => {
  const { _date, electionDate, User } = useAuth();
  const router = useRouter();
  console.log(User);
  console.log('run');
  
  console.log('Vote component rendered');

  // Check if User is null or undefined
  if (!User) {
    return (
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.messageText}>Loading user data...</Text>
        </View>
      </View>
    );
  }

  if (User.isApproved) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Elections</Text>
          {_date === 0 && (
            <TouchableOpacity
              style={styles.liveResultsButton}
              onPress={() => {
                router.push('/tabs/pages/live_results');
              }}
            >
              <Text style={styles.liveResultsButtonText}>Live Results</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>
          {_date === 0 && (
            <View>
              <CategoryCard
                categoryName="Presidential"
                categoryRegion="Schoolwide"
                voted={User.voted['Presidential']}
              />
              <CategoryCard
                categoryName="Secretary General"
                categoryRegion="Schoolwide"
                voted={User.voted['Secretary General']}
              />
              <CategoryCard
                categoryName="Delegate"
                categoryRegion="Delegate"
                voted={User.voted['Delegate']}
              />
              <CategoryCard
                categoryName="Class Representative"
                categoryRegion="Constituency"
                voted={User.voted['Class Representative']}
              />
            </View>
          )}
          {_date !== 0 && (
            <View style={styles.centeredContent}>
              <Image style={styles.image} source={IMAGE} alt="Image" />
              <Text style={styles.messageText}>
                {_date === 1 &&
                  `Election date is scheduled for the \n${new Date(electionDate).toDateString()}`}
                {_date === -1 &&
                  `Elections were held on the \n${new Date(electionDate).toDateString()}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Image style={styles.image} source={ACCREDITED} alt="Image" />
          <Text style={styles.messageText}>
            You have not yet been accredited to vote!
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     padding: 16,
     paddingTop: 32,
     backgroundColor: color.white,
  },
  headerText: {
    color: color.textColor,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  liveResultsButton: {
    backgroundColor: color.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  liveResultsButtonText: {
    color: color.white,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '83.33%',
    height: 368,
    resizeMode: 'contain',
  },
  messageText: {
    marginTop: 16,
    color: color.textColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Vote;