import { Stack, useRouter } from "expo-router";
import color from "../../utils/color";

export default function AppLayout() {
  const router = useRouter();
  console.log("Available routes:", router);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarHidden: false,
        statusBarColor: color.statusBar,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="biometrics" options={{ title: "Biometrics" }} />
      <Stack.Screen name="face_id" options={{ title: "Face ID" }} />
      <Stack.Screen name="verify_nin" options={{ title: "Verify NIN" }} />
      <Stack.Screen name="pin" options={{ title: "PIN" }} />
      <Stack.Screen name="fingerprint_id" options={{ title: "Fingerprint ID" }} />

    </Stack>
  );
}
