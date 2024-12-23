import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import color from '../../../utils/color';

const Terms = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('settings')}>
          <View style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color.textColor} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>
            Introduction {"\n"}This Privacy Policy outlines the collection, use,
            storage, and disclosure of personal information and data when you
            use the electronic voting mobile application ("TUMSA") developed
            for the Nigeria General Election. The App is designed to facilitate
            secure and convenient voting processes. This Privacy Policy aims to
            inform you about the types of information we may collect, how we use
            it, and the rights you have regarding your personal data. {"\n"}
            {"\n"}Information We Collect{"\n"}
            a. Personal Information: When you use the App, we may collect
            certain personal information from you, including but not limited to:{" "}
            {"\n"}- Full name {"\n"}- Registration number {"\n"}-
            Student Email Address {"\n"}- Voter registration details{" "}
            {"\n"}b. Voting Data: During the voting process, the App may collect
            and store your voting choices in a secure and anonymous manner.{" "}
            {"\n"}c. Device Information: We may automatically collect certain
            technical information about your device, such as device type,
            operating system, IP address, and mobile network information when
            you use the App.{"\n"}
            {"\n"}Use of Information {"\n"}a. Personal Information: We will only
            use your personal information for the purpose of enabling and
            improving the electronic voting process, including but not limited
            to: Verifying your eligibility to vote Facilitating the voting
            process and ensuring accurate vote counts Enabling communication
            between election officials and voters Resolving any issues related
            to voting Complying with legal obligations {"\n"}b. Voting Data:
            Voting data collected through the App will be stored securely and
            anonymously. This data will only be used for the purpose of tallying
            votes and ensuring the integrity of the election process. {"\n"}c.
            Device Information: We may use device information to analyze App
            performance, diagnose technical issues, and improve the overall user
            experience. {"\n"}
            {"\n"}Data Security {"\n"}We are committed to protecting the
            security of your personal information and voting data. We implement
            appropriate technical and organizational measures to safeguard your
            data from unauthorized access, alteration, disclosure, or
            destruction. However, please note that no data transmission or
            storage system can be guaranteed to be 100% secure. Therefore, we
            cannot guarantee the absolute security of your information. {"\n"}
            {"\n"}
            Data Retention {"\n"}We will retain your personal information and
            voting data for as long as necessary to fulfill the purposes
            outlined in this Privacy Policy or as required by law. Afterward, we
            will securely dispose of or anonymize your data. {"\n"}
            {"\n"}Data Sharing and Disclosure {"\n"}a. Third-Party Service
            Providers: We may engage trusted third-party service providers to
            assist in operating the App and delivering our services. These
            service providers may have access to your personal information and
            voting data but will only process it as necessary to provide the
            agreed-upon services. {"\n"}b. Legal Requirements: We may disclose
            your personal information and voting data if required to do so by
            law or in response to valid legal requests, such as subpoenas, court
            orders, or government regulations. {"\n"}c. Data Transfer: Your
            personal information and voting data may be transferred to and
            stored on servers located outside of TUM. By using the App, you
            consent to the transfer of your data to these locations. {"\n"}
            {"\n"}Your Rights
            {"\n"}a. Access and Correction: You have the right to access and
            correct any personal information we hold about you. You may request
            access or correction by contacting us using the information provided
            in Section 9. {"\n"}b. Data Portability: You have the right to
            receive a copy of your personal information in a structured,
            machine-readable format. {"\n"}c. Withdrawal of Consent: You may
            withdraw your consent to the processing of your personal information
            at any time by contacting us using the information provided in
            Section 9. However, please note that withdrawing consent may limit
            your ability to use the App and participate in the voting process.
            {"\n"}
            {"\n"}Changes to the Privacy Policy {"\n"}We reserve the right to
            update or modify this Privacy Policy at any time. Any changes will
            be effective upon posting the revised Privacy Policy on the App. We
            encourage you to review this Privacy Policy periodically for any
            updates. {"\n"}
            {"\n"}Contact Us {"\n"}If you have any questions, concerns, or
            requests regarding this Privacy Policy or the handling of your
            personal information, please contact us at: [TUMSA] We will
            endeavor to respond to your inquiries in a timely manner. By using
            the App, you acknowledge that you have read and understood this
            Privacy Policy and agree to the collection, use, and disclosure of
            your personal information and voting data as described herein.
            Please note that this is a sample privacy policy and may need to be
            tailored to meet the specific requirements and legal obligations of
            the electronic voting mobile app used for the Nigeria General
            Election. It is advisable to consult with legal professionals to
            ensure compliance with applicable laws and regulations.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    backgroundColor: color.white,
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: color.textColor,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  headerTitle: {
    color: color.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
  content: {
    padding: 16,
  },
  text: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 48,
  },
});

export default Terms;
