import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import color from '../../utils/color';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor={color.statusBar}
        barStyle="dark-content"
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          statusBarHidden: false,
          statusBarColor: color.statusBar,
          tabBarAllowFontScaling: true,
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: color.secondaryTextColor,
          tabBarLabelStyle: styles.tabText,
          tabBarStyle: styles.tabStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="vote"
          options={{
            title: "Vote",
            tabBarIcon: ({ color }) => (
              <Feather name="archive" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={24} color={color} />
            ),
          }}
        />
        
        {/* Hidden screens */}
        <Tabs.Screen name="pages/vote_category" options={{href: null }} />
        <Tabs.Screen name="pages/test" options={{ href: null }} />
        <Tabs.Screen name="pages/candidate_details" options={{ href: null }} />
        <Tabs.Screen name="pages/change_password" options={{ href: null }} />
        <Tabs.Screen name="pages/change_pin" options={{ href: null }} />
        <Tabs.Screen name="pages/confirm_vote" options={{ href: null }} />
        <Tabs.Screen name="pages/live_results" options={{ href: null }} />
        <Tabs.Screen name="pages/news_details" options={{ href: null }} />
        <Tabs.Screen name="pages/profile" options={{ href: null }} />
        <Tabs.Screen name="pages/terms" options={{ href: null }} />
        
        {/* Component screens (if needed) */}
        <Tabs.Screen name="components/newsCard" options={{ href: null }} />
        <Tabs.Screen name="components/candidateCards" options={{ href: null }} />
        <Tabs.Screen name="components/categoryCard" options={{ href: null }} />
        <Tabs.Screen name="components/voteCard" options={{ href: null }} />
        <Tabs.Screen name="components/resultCard" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  tabStyle: {
    paddingBottom: 6,
    paddingTop: 8,
    height: 64,
  },
});