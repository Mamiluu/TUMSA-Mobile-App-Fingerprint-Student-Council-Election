import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import color from '../utils/color';
import { UserProvider } from '../utils/authProvider';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Navigation error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong in navigation.</Text>
          <Text>{this.state.error && this.state.error.toString()}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function AppLayout() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <View style={{ flex: 1, backgroundColor: color.background }}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="[intro]" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </View>
      </UserProvider>
    </ErrorBoundary>
  );
}