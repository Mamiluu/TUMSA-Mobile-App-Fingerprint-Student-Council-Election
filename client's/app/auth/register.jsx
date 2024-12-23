import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { statesOption } from "./utils/state";
import { toggleLGA } from "./utils/lga";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  setDoc,
  db,
  doc,
} from "../../firebase";
import { save } from "../../utils/helpers";
import color from "../../utils/color";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mathProblem, setMathProblem] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [lgaOptions, setLgaOptions] = useState([]);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const router = useRouter();
  const { nin } = useLocalSearchParams();

  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';
    const problem = `${num1} ${operator} ${num2}`;
    const answer = operator === '+' ? num1 + num2 : num1 - num2;
    setMathProblem(problem);
    setMathAnswer(answer.toString());
  };

  useEffect(() => {
    generateMathProblem();
  }, []);

  const handleDepartmentChange = (itemValue) => {
    setDepartment(itemValue);
    setCourse(""); // Reset course when department changes
    setLgaOptions(toggleLGA(itemValue));
    setShowDepartmentDropdown(false);
  };

  const handleCourseChange = (itemValue) => {
    setCourse(itemValue);
    setShowCourseDropdown(false);
  };

  const registerUser = async () => {
    setErrorMsg(null);
    const isFieldsEmpty = 
      !firstName || 
      !lastName || 
      !email || 
      !password || 
      !confirmPassword || 
      !gender || 
      !department ||
      !course;

    if (isFieldsEmpty) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Your passwords do not match!");
      return;
    }

    if (userAnswer !== mathAnswer) {
      setErrorMsg("Incorrect answer to the math problem. Please try again.");
      generateMathProblem();
      setUserAnswer("");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      save("UserID", user.uid);

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        gender,
        department,
        course,
        pin: "",
        imageUrl: "",
        role: "user",
        isApproved: false,
        voted: {
          "Presidential": false,
          "Secretary General": false,
          "Delegate": false,
          "Class Representative": false,
        },
      });

      await updateProfile(user, {
        displayName: `${lastName} ${firstName}`,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setGender("");
      setDepartment("");
      setCourse("");
      setUserAnswer("");

      router.replace({
        pathname: "/auth/pin",
        params: { uid: user.uid },
      });
    } catch (error) {
      setErrorMsg(errorCode(error.code));
    } finally {
      setLoading(false);
    }
  };

  const errorCode = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Email is already in use.";
      case "auth/invalid-email":
        return "Email is invalid.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "An unknown error has occurred.";
    }
  };

  const renderDropdownItem = ({ item, onSelect }) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelect(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.box}>
          <Text style={styles.title}>TUMSA</Text>
          <Text style={styles.subtitle}>Create Account</Text>

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          <View style={styles.stack}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Reg No</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter NIN"
                value={nin}
                editable={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ST Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email Address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry={!show}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable onPress={() => setShow(!show)}>
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                    size={24}
                    color="gray"
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={!show}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Pressable onPress={() => setShow(!show)}>
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                    size={24}
                    color="gray"
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Choose Gender"
                value={gender}
                onChangeText={setGender}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Department</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowDepartmentDropdown(true)}
              >
                <Text>{department || "Choose Department"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Course</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowCourseDropdown(true)}
                disabled={!department}
              >
                <Text>{course || "Choose Course"}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prove you're human: Solve {mathProblem}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your answer"
                value={userAnswer}
                onChangeText={setUserAnswer}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={registerUser}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href="/auth">
              <Text style={styles.footerLink}>Log In</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Department Dropdown Modal */}
      <Modal
        visible={showDepartmentDropdown}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={statesOption}
              renderItem={({ item }) => renderDropdownItem({ item, onSelect: handleDepartmentChange })}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Course Dropdown Modal */}
      <Modal
        visible={showCourseDropdown}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={lgaOptions}
              renderItem={({ item }) => renderDropdownItem({ item, onSelect: handleCourseChange })}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  box: {
    padding: 16,
  },
  title: {
    fontFamily: "Poppins-Regular",
    color: color.primary,
    textAlign: "center",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    textAlign: "left",
    fontSize: 20,
    marginTop: 24,
  },
  errorText: {
    marginVertical: 8,
    color: color.error,
    fontSize: 18,
    textAlign: "center",
  },
  stack: {
    marginTop: 32,
    space: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    textAlign: "left",
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  button: {
    marginTop: 32,
    backgroundColor: color.primary,
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontFamily: "Poppins-Regular",
    color: color.textColor,
    fontSize: 16,
  },
  footerLink: {
    fontFamily: "Poppins-Regular",
    color: color.primary,
    fontSize: 16,
    marginLeft: 4,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Register;