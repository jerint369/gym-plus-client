import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = props.route.params.currentUser.userId;


 
  const [firstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [PhoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.192.144.153:3000/account/${userId}`
        );

        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
         
        
        setPhoneNumber(response.data.phoneNumber);
        setEmail(response.data.email);n
        setPassword(response.data.password);
        setConfirmPassword(response.data.password);
            
            

       
      } catch (error) {
        console.log("Failed to Update:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    if (!firstName) {
      setFirstNameError("First name is required");
      return;
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      setLastNameError("Last name is required");
      return;
    } else {
      setLastNameError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required");
      return;
    } else {
      setPhoneNumberError("");
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (errorMessage) {
      Alert.alert(errorMessage);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Email address not in format");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert("Invalid phone number format");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    Alert.alert(
      "Update Profile",
      "Are you sure you want to update your profile?",
      [
        {
          text: "No",
          onPress: async () => {
            try {
              const response = await axios.get(
                `http://10.192.144.153:3000/account/${userId}`
              );
              setFirstName(response.data.firstName);
              setLastName(response.data.lastName);
              setPhoneNumber(response.data.phoneNumber);
              setEmail(response.data.email);
              setPassword(response.data.password);
              setConfirmPassword(response.data.password);
            } catch (error) {
              console.log("Failed to fetch profile:", error.message);
            }
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const userResponse = await axios.put(
                `http://10.192.144.153:3000/account`,
                {
                  firstName,
                  lastName,
                  phoneNumber,
                  email,
                  password,
                  userId,
                }
              );
              Alert.alert("Profile updated");
            } catch (error) {
              console.log("Failed to Update:", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GYM+</Text>
      <View style={styles.ovalContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.inputView}>
            <Text style={styles.labelText}>First Name:</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
          {FirstNameError ? (
            <Text style={styles.errorText}>{FirstNameError}</Text>
          ) : null}

          <View style={styles.inputView}>
            <Text style={styles.labelText}>Last Name:</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
          {LastNameError ? (
            <Text style={styles.errorText}>{LastNameError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Phone Number:</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />
          </View>
          {PhoneNumberError ? (
            <Text style={styles.errorText}>{PhoneNumberError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Email:</Text>
            <TextInput
              style={[styles.inputText, { backgroundColor: "#f2f2f2" }]}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setEmail(text)}
              value={email}
              editable={true}
            />
          </View>
          {EmailError ? (
            <Text style={styles.errorText}>{EmailError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Password:</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          {PasswordError ? (
            <Text style={styles.errorText}>{PasswordError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Confirm Password:</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>
          {ConfirmPasswordError ? (
            <Text style={styles.errorText}>{ConfirmPasswordError}</Text>
          ) : null}
        </ScrollView>
        <TouchableOpacity style={styles.signupBtn} onPress={handleUpdate}>
          <Text style={styles.signupText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginBottom: 20,
    marginTop: -60,
  },
  ovalContainer: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 5,
  },
  labelInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
    width: "40%",
    paddingLeft: 1,
  },
  inputText: {
    height: 40,
    color: "#000",
    width: "60%",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  signupBtn: {
    width: "40%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  label1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    paddingLeft: 150,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 15,
  },
});

export default ProfileScreen;
