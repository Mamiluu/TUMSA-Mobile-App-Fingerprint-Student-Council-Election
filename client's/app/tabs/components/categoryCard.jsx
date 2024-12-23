import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import color from '../../../utils/color';

const CategoryCard = ({ categoryName, categoryRegion, voted }) => {
  const router = useRouter();

  const handlePress = () => {
    console.log('Navigating to Vote Category:', categoryName);
    try {
      router.push(`/tabs/pages/test?category=${encodeURIComponent(categoryName)}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.categoryName}>{categoryName}</Text>
          <Text style={styles.categoryRegion}>{categoryRegion}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, voted && styles.buttonDisabled]}
          onPress={handlePress}
          disabled={voted}
        >
          <Text style={[styles.buttonText, voted && styles.buttonTextDisabled]}>
            {voted ? 'Voted' : 'Vote'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Feather name="clock" size={14} color={color.secondaryTextColor} />
        <Text style={styles.footerText}> voting ends at 11:59pm today</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: color.white,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontFamily: 'Poppins-Regular',
    color: color.textColor,
    fontSize: 18,
    marginBottom: 4,
  },
  categoryRegion: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    borderColor: color.disabled,
    backgroundColor: color.disabled,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: color.primary,
    fontSize: 16,
  },
  buttonTextDisabled: {
    color: color.white,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    color: color.secondaryTextColor,
    fontSize: 14,
    marginLeft: 4,
  },
});

export default CategoryCard;