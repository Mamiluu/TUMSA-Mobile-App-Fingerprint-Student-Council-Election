import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ResultCard from '../components/resultCard';
import { collection, query, where, getDocs, db } from '../../../firebase';
import { getAuth } from 'firebase/auth';
import color from '../../../utils/color';
import { numberWithCommas } from '../../../utils/helpers';

const LiveResults = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(0);
  const [category, setCategory] = useState('Presidential');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDepartment, setUserDepartment] = useState('');
  const [userCourse, setUserCourse] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          setUserDepartment(userData.department);
          setUserCourse(userData.course);
        }
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setResult([]);
    setVotes(0);
    const getResult = async () => {
      setLoading(true);
      let q;
      if (category === 'Delegate') {
        q = query(
          collection(db, 'candidates'),
          where('category', '==', category),
          where('department', '==', userDepartment)
        );
      } else if (category === 'Class Representative') {
        q = query(
          collection(db, 'candidates'),
          where('category', '==', category),
          where('department', '==', userDepartment),
          where('course', '==', userCourse)
        );
      } else {
        q = query(
          collection(db, 'candidates'),
          where('category', '==', category)
        );
      }
      const querySnapshot = await getDocs(q);
      const fetchResult = [];
      let count = 0;
      querySnapshot.forEach((doc) => {
        const fetchItem = {
          id: doc.id,
          ...doc.data(),
        };
        count = count + doc.data().vote;
        fetchResult.push(fetchItem);
      });
      setResult(fetchResult);
      setVotes(count);
      setLoading(false);
      
      // Determine the winning candidate(s)
      const maxVotes = Math.max(...fetchResult.map(candidate => candidate.vote));
      const winners = fetchResult.filter(candidate => candidate.vote === maxVotes);
      
      // Display the result
      if (winners.length === 1) {
        Alert.alert(
          "Current Leading Candidate",
          `${winners[0].name} is currently leading with ${numberWithCommas(winners[0].vote)} votes.`,
          [{ text: "OK" }]
        );
      } else if (winners.length > 1) {
        const tiebreakWinner = breakTie(winners);
        Alert.alert(
          "Tie Resolved",
          `There was a tie between ${winners.map(w => w.name).join(', ')} with ${numberWithCommas(maxVotes)} votes each. 
           After applying the tiebreaker rule, ${tiebreakWinner.name} has been selected as the winner.`,
          [{ text: "OK" }]
        );
      }
    };
    getResult();
  }, [category, userDepartment, userCourse]);

  const breakTie = (tiedCandidates) => {
    // This is a simple random selection tiebreaker.
    // You can replace this with any other tiebreaker logic as needed.
    const randomIndex = Math.floor(Math.random() * tiedCandidates.length);
    return tiedCandidates[randomIndex];
  };

  const handleSelected = (cat) => {
    setCategory(cat);
  };

  const buttons = ['Presidential', 'Secretary General', 'Delegate', 'Class Representative'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('vote')}>
          <View style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Live Election Results</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((buttonLabel, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.button,
              { backgroundColor: i === selected ? color.primary : 'transparent' },
            ]}
            onPress={() => {
              setSelected(i);
              handleSelected(buttonLabel);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: i === selected ? color.white : color.primary },
              ]}
            >
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Total Votes</Text>
          <Text style={styles.infoValue}>{numberWithCommas(votes)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Feather name="clock" size={14} color={color.secondaryTextColor} /> voting ends
          </Text>
          <Text style={styles.infoValue}>at 11:59pm today</Text>
        </View>
      </View>
      <View style={styles.resultContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          <FlatList
            data={result}
            renderItem={({ item }) => <ResultCard candidate={item} totalVotes={votes} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.primary,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoText: {
    color: color.secondaryTextColor,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default LiveResults;