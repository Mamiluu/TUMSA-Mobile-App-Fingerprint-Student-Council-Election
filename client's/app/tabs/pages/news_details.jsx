import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../utils/authProvider';
import { format } from 'date-fns';
import color from '../../../utils/color';

const NewsDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { newsObject } = useAuth();

  // Use the id to fetch the specific news item if needed
  // For now, we'll assume newsObject contains the correct data

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.headerTitle}>News/Update</Text>
        </View>
        <Text style={styles.newsTitle}>{newsObject.title}</Text>
        <Text style={styles.newsDate}>
          {format(new Date(newsObject.date), 'do, MMMM yyyy')}
        </Text>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={styles.newsImage}
            source={{ uri: newsObject.imageUrl }}
            resizeMode="cover"
          />
          <Text style={styles.newsDetail}>{newsObject.detail}</Text>
        </ScrollView>
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
  center: {
    alignItems: 'center',
  },
  headerTitle: {
    color: color.textColor,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    marginVertical: 16,
  },
  newsTitle: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  newsDate: {
    color: color.secondaryTextColor,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  content: {
    padding: 16,
  },
  newsImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 16,
  },
  newsDetail: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 96,
  },
});

export default NewsDetails;