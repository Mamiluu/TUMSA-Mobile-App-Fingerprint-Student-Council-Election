import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import color from '../../utils/color';
import NewsCard from './components/newsCard';
import CandidateCards from './components/candidateCards';
import { useAuth } from '../../utils/authProvider';

const Home = () => {
  const { currentUser, candidate, news } = useAuth();
  const router = useRouter();

  console.log('Home component rendered');
  
 const goToVoteCategory = (category) => {
  console.log('Navigating to Vote Category:', category);
  try {
    router.push({
      pathname: "/tabs/pages/test",
      params: { category: category }
    });
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

  const goToCandidateDetails = (candidateId) => {
    console.log('hello')
    console.log(candidateId)
    router.push(`/tabs/pages/candidate_details?id=${candidateId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Hello, {currentUser?.displayName || 'User'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>News & Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsSection}>
          {news.length > 0 ? (
            news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))
          ) : (
            <>
              <View style={styles.skeletonBox}>
                <View style={styles.skeletonImage} />
                <Text style={styles.skeletonText}>Loading...</Text>
              </View>
              <View style={styles.skeletonBox}>
                <View style={styles.skeletonImage} />
                <Text style={styles.skeletonText}>Loading...</Text>
              </View>
            </>
          )}
        </ScrollView>

        <Text style={styles.sectionTitle}>Candidates</Text>
        <View style={styles.candidatesContainer}>
          {candidate.length > 0 ? (
            candidate.map((item) => (
              <CandidateCards 
                key={item.id} 
                candidate={item} 
                onPress={() => goToCandidateDetails(item.id)}
              />
            ))
          ) : (
            <>
              <View style={styles.candidateSkeleton}>
                <View style={styles.candidateSkeletonImage} />
                <View style={styles.candidateSkeletonTextContainer}>
                  <Text style={styles.candidateSkeletonText}>Loading...</Text>
                  <Text style={styles.candidateSkeletonText}>Loading...</Text>
                </View>
              </View>
              <View style={styles.candidateSkeleton}>
                <View style={styles.candidateSkeletonImage} />
                <View style={styles.candidateSkeletonTextContainer}>
                  <Text style={styles.candidateSkeletonText}>Loading...</Text>
                  <Text style={styles.candidateSkeletonText}>Loading...</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity onPress={() => goToVoteCategory('Governorship Election')} style={styles.navigateButton}>
          <Text style={styles.navigateButtonText}>Go to Vote Category</Text>
        </TouchableOpacity>
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
    paddingTop: 32,
  },
  headerText: {
    color: color.textColor,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Regular',
    color: color.primary,
    fontSize: 18,
    marginBottom: 16,
  },
  newsSection: {
    marginBottom: 24,
  },
  skeletonBox: {
    width: 285,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 8,
    padding: 8,
    marginRight: 16,
    alignItems: 'center',
  },
  skeletonImage: {
    height: 160,
    backgroundColor: color.background,
    borderRadius: 8,
    width: '100%',
  },
  skeletonText: {
    marginTop: 8,
    color: color.secondaryTextColor,
    fontFamily: 'Poppins-Regular',
  },
  candidatesContainer: {
    marginBottom: 24,
  },
  candidateSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  candidateSkeletonImage: {
    width: 84,
    height: 81,
    backgroundColor: color.background,
    borderRadius: 8,
    marginRight: 16,
  },
  candidateSkeletonTextContainer: {
    flex: 1,
  },
  candidateSkeletonText: {
    color: color.secondaryTextColor,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  navigateButton: {
    backgroundColor: color.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  navigateButtonText: {
    color: color.white,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});

export default Home;