import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import color from '../../../utils/color';
import { useAuth } from '../../../utils/authProvider';

const NewsCard = ({ news }) => {
  const { setNewsObject } = useAuth();
  const router = useRouter();

  const handlePress = () => {
    setNewsObject({});
    setNewsObject(news);
    router.push(`/tabs/pages/news_details?id=${news.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: news.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {news.title}
        </Text>
        <Text style={styles.date}>
          {format(new Date(news.date), 'do, MMMM yyyy')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 285,
    borderRadius: 10,
    backgroundColor: color.white,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: color.textColor,
    fontSize: 16,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 14,
    marginTop: 8,
  },
});

export default NewsCard;