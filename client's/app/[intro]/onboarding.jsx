import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import PagerView from "react-native-pager-view";

import Intro1 from "../../utils/assets/images/intro_1.png";
import Intro2 from "../../utils/assets/images/intro_2.png";
import Intro3 from "../../utils/assets/images/intro_3.png";
import color from "../../utils/color";
import { proc } from "../../utils/helpers"; // Import the proc function

const OnBoardingPage = () => {
  useEffect(() => {
    proc(); // Call the proc function when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Image style={styles.image} source={Intro1} />
          <View style={styles.center}>
            <Text style={styles.title}>Your Vote Counts</Text>
            <Text style={styles.subtitle}>
              Exercise your civil responsibility, let your voice be heard with
              your vote and more importantly let your vote counts.
            </Text>
          </View>
          <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>
        </View>
        <View style={styles.page} key="2">
          <Image style={styles.image} source={Intro2} />
          <View style={styles.center}>
            <Text style={styles.title}>Safe and Secure</Text>
            <Text style={styles.subtitle}>
              Guarantee safety for both votes and the voter as no physical
              presence is not required.
            </Text>
          </View>
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
          </View>
        </View>
        <View style={styles.page} key="3">
          <Image style={styles.image} source={Intro3} />
          <View style={styles.center}>
            <Text style={styles.title}>Free, Fair and Verifiable</Text>
            <Text style={styles.subtitle}>
              This system ensures that the election is conducted with fairness,
              transparency and the results are all verifiable.
            </Text>
          </View>
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
            <View style={styles.indicator} />
            <View style={[styles.indicator, styles.activeIndicator]} />
          </View>
        </View>
      </PagerView>

      <View style={styles.buttonContainer}>
        <Link href="/auth/register" asChild replace>
          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Create an account
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/auth" asChild replace>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Log In
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '83%',
    height: 368,
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    marginTop: 32,
    color: color.textColor,
    fontFamily: "Poppins-Regular",
    fontSize: 24,
  },
  subtitle: {
    marginTop: 16,
    color: color.secondaryTextColor,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  indicator: {
    height: 8,
    width: 32,
    backgroundColor: color.background,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  activeIndicator: {
    backgroundColor: color.primary,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    marginTop: 16,
    width: '90%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: color.primary,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: color.primary,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: color.primary,
  },
});

export default OnBoardingPage;
