import "expo-router/entry";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
]);

// Add global error handler
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error('Global error:', error);
  // You can add more detailed logging here
});