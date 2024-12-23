#A MOBILE APPLICATION SYSTEM FOR VOTING WITH FINGERPRINT BIOMETRICS

Case Study: TUMSA Election

Overview

This project presents a Mobile Application System for Voting designed to enhance the transparency and security of the TUMSA student council elections. It leverages fingerprint biometric authentication to ensure that students vote securely and prevents cases of double voting or identity fraud.

The system is divided into two components:

Client Application (Frontend): Built with React Native, it allows students to authenticate and vote using their fingerprints directly from their smartphones.

Admin Dashboard (Backend): Developed using React, it enables administrators to oversee the entire voting process, manage voter registrations, and resolve ties effectively.

Key Features

Client Application

Fingerprint Biometric Authentication:

Students use their unique fingerprints for secure login and voting.

This ensures that no student can vote more than once.

Department-Based Voting:

Voting is restricted to candidates within a student's specific department.

Ensures organized and focused elections for departmental representation.

Real-Time Results:

Students can view live updates of the leading candidates and overall results.

Tiebreaker Mechanism:

A pre-configured system automatically resolves ties to determine a winner in case of a draw.

Admin Dashboard

Voter Registration Management:

Admins approve student registrations to ensure authenticity.

Prevents double registration by verifying admission numbers and ensuring one device per voter.

Device and Admission Number Validation:

Ensures that a single device or admission number cannot be used for multiple registrations.

Comprehensive Results Display:

Admins can monitor and publish department-wise and overall election results.

Tiebreaker Oversight:

Admins have the ability to monitor and confirm tiebreak resolutions.

Technical Details

Frontend:

Built with React Native, ensuring cross-platform compatibility for both Android and iOS devices.

Utilizes fingerprint biometric APIs for secure authentication.

Backend:

Developed with React for seamless and interactive administrative workflows.

Supports dynamic data handling for real-time result computation and display.

Database:

Integrated with Firebase for real-time data synchronization, ensuring up-to-date information across the client and admin platforms.

Installation and Setup

Prerequisites

Install Node.js (v16 or later).

Set up Expo CLI for React Native development.

Configure Firebase for authentication and database functionality.

Steps to Set Up

Clone the repository:

git clone https://github.com/your-username/tumsa-voting-app.git

Navigate to the project directory:

cd tumsa-voting-app

Install project dependencies:

npm install

Start the Client Application:

expo start

Start the Admin Dashboard:

npm start

Configure Firebase by updating the firebaseConfig in the project files with your project credentials.

Usage

Students

Open the mobile application and log in using your fingerprint.

Select your department to view the list of candidates.

Cast your vote securely with the fingerprint authentication system.

View live election results and track the leading candidates.

Administrators

Use the admin dashboard to:

Approve new voter registrations after validating their admission numbers.

Oversee and manage the voting process in real time.

Resolve tiebreaks and publish the final election results.

Prevent duplicate registrations or fraudulent voting attempts by monitoring device usage and admission numbers.

Advanced Functionalities

Tiebreaker Resolution:

In the event of a tie, the system’s algorithm determines the winner based on pre-set criteria.

Live Results Display:

Both students and admins can view real-time voting results department-wise and overall.

Secure Authentication:

Fingerprint authentication ensures only authorized individuals can vote, eliminating manual errors or fraud.

Future Enhancements

Integration with Facial Recognition:

Add support for facial recognition as an alternative authentication method.

Enhanced Reporting Tools:

Provide detailed analytics and visualizations for admin use.

Scalability:

Expand support for larger-scale elections with a higher voter base.

Localization:

Add multi-language support to cater to diverse student populations.

Contribution

Contributions to this project are welcome! Please fork the repository, make your changes, and submit a pull request for review.

License

This project is licensed under the MIT License.

Contact Information

For questions or further inquiries, please reach out:

Email: msanifuasiya@gmail.com

GitHub: Mamiluu

