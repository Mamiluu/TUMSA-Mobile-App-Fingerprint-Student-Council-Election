import { useFonts } from "expo-font";
import { Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { SplashScreen, useRouter } from "expo-router";
import { useEffect, useCallback } from "react";
import Colors from "../utils/color";
import { save, getValueFor } from "../utils/helpers";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    "Poppins-Light": require("../utils/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../utils/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../utils/assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const checkFirstOpen = async () => {
      if (!fontsLoaded) return;

      try {
        const value = await getValueFor("openedBefore");
        if (value === null) {
          await save("openedBefore", "true");
          router.replace("/[intro]/onboarding");
        } else {
          router.replace("/[intro]/");
        }
      } catch (error) {
        console.error("Error checking first open:", error);
        // Fallback navigation in case of error
        router.replace("/auth/");
      }
    };

    checkFirstOpen();
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar hidden={true} />
      <Text style={styles.logoName}>TUMSA</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoName: {
    fontSize: 36,
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 48,
    color: Colors.white,
  },
});