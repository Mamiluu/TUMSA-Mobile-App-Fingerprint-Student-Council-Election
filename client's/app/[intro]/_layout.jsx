import React, { useEffect } from 'react';
// import { proc } from '../../utils/helpers';
import { Stack } from 'expo-router';
import color from '../../utils/color';

export default function AppLayout() {
//   useEffect(() => {
//     console.log('AppLayout: proc:', proc);

//     if (typeof proc !== 'function') {
//       console.error('proc is not a function');
//     } else {
//       proc();
//     }
//   }, []);
// d
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarHidden: false,
        statusBarColor: color.statusBar,
      }}
    >
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}
