import { Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import Colors from "../../utils/color";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      router.replace("[intro]/onboarding");
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.logoName}>TUMSA</Text>
    </SafeAreaView>
  );
};

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

export default SplashPage;
