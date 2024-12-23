import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../utils/authProvider';
import color from '../../../utils/color';
import VoteCard from '../components/voteCard';
import { db } from '../../../firebase';

const VoteCategory = () => {
  const [result, setResult] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [queryText, setQueryText] = useState('');

  const { User } = useAuth();
  const router = useRouter();
  const { category } = useLocalSearchParams();

  console.log('VoteCategory component rendered');
  console.log('Received category:', category);

  useEffect(() => {
    if (!category) {
      console.error('No category provided');
      router.back();
      return;
    }

    const getCandidates = async () => {
      try {
        setResult([]);
        const q = query(collection(db, 'candidates'), where('category', '==', category));
        const querySnapshot = await getDocs(q);

        const fetchedCandidates = [];

        querySnapshot.forEach(doc => {
          const fetchItem = {
            id: doc.id,
            ...doc.data(),
          };

          if (category === 'Governorship Election') {
            if (doc.data().state === User.state) {
              fetchedCandidates.push(fetchItem);
            }
          } else if (category === 'Senatorial Election' || category === 'House of Assembly Election') {
            if (doc.data().state === User.state && doc.data().lga === User.lga) {
              fetchedCandidates.push(fetchItem);
            }
          } else {
            fetchedCandidates.push(fetchItem);
          }
        });

        setResult(fetchedCandidates);
        setFilteredData(fetchedCandidates);
        console.log(`${category} Candidates Loaded:`, fetchedCandidates.length);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    getCandidates();
  }, [category, User.state, User.lga]);

  const handleFilter = (text) => {
    setQueryText(text);
    const filtered = result.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase()));
    setFilteredData(filtered);
  };

  console.log('Rendering VoteCategory. QueryText:', queryText);
  console.log('Filtered Data:', filteredData.length);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerText}>{category}</Text>
        <Text style={styles.subHeaderText}>Select your candidate of choice</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Search candidate by name"
          value={queryText}
          onChangeText={text => handleFilter(text)}
        />

        {result.length > 0 ? (
          <ScrollView style={styles.scrollView}>
            {filteredData.map(item => (
              <VoteCard key={item.id} candidate={item} />
            ))}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollView}>
                <SkeletonContent
              containerStyle={styles.skeletonContainer}
              isLoading={true}
              layout={[
                { key: '1', width: 84, height: 81, borderRadius: 8, marginRight: 12 },
                { key: '2', width: 84, height: 81, borderRadius: 8, marginRight: 12 },
              ]}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    padding: 16,
    backgroundColor: color.white,
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
  headerText: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  subHeaderText: {
    color: color.secondaryTextColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
});

export default VoteCategory;