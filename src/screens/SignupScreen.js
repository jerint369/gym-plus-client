import React, { useState } from "react";
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

const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [street, setStreet] = useState("");
  const [StreetError, setStreetError] = useState("");
  const [city, setCity] = useState("");
  const [CityError, setCityError] = useState("");
  const [province, setProvince] = useState("");
  const [ProvinceError, setProvinceError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [PhoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    // validate inputs

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

    // if (!street) {
    //   setStreetError("Street address is required");
    //   return;
    // } else {
    //   setStreetError("");
    // }

    // if (!city) {
    //   setCityError("City is required");
    //   return;
    // } else {
    //   setCityError("");
    // }

    // if (!province) {
    //   setProvinceError("Province is required");
    //   return;
    // } else {
    //   setProvinceError("");
    // }

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

    try {
      const response = await axios.post("http://10.192.144.153:3000/account", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        confirmPassword,
      });
        console.log(response)
      // const { token, user } = response.data;
      // await AsyncStorage.setItem("token", token);
      // await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.navigate("LoginScreen");
      console.log("Successfully signed up!");
      Alert.alert("Signup Sucess");
    } catch (error) {
      console.log("Failed to sign up:", error.message);
      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data.message === "Email already exists"
      ) {
        Alert.alert("Email already exists./n Please use a different email.");
      }
    }
  };

  const login = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GYM+</Text>
      <View style={styles.ovalContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.inputView}>
            <Text style={styles.labelText}>First Name:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          {FirstNameError ? (
            <Text style={styles.errorText}>{FirstNameError}</Text>
          ) : null}

          <View style={styles.inputView}>
            <Text style={styles.labelText}>Last Name:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          {LastNameError ? (
            <Text style={styles.errorText}>{LastNameError}</Text>
          ) : null}
          {/* <View style={styles.inputView}>
            <Text style={styles.labelText}>Street:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setStreet(text)}
            />
          </View>
          {StreetError ? (
            <Text style={styles.errorText}>{StreetError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>City:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setCity(text)}
            />
          </View>
          {CityError ? <Text style={styles.errorText}>{CityError}</Text> : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Province:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setProvince(text)}
            />
          </View>
          {ProvinceError ? (
            <Text style={styles.errorText}>{ProvinceError}</Text>
          ) : null} */}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Phone Number:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f"
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          {PhoneNumberError ? (
            <Text style={styles.errorText}>{PhoneNumberError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Email:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {EmailError ? (
            <Text style={styles.errorText}>{EmailError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Password:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {PasswordError ? (
            <Text style={styles.errorText}>{PasswordError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Confirm Password:*</Text>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          {ConfirmPasswordError ? (
            <Text style={styles.errorText}>{ConfirmPasswordError}</Text>
          ) : null}
        </ScrollView>
        <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={login}>
        <Text style={styles.label1}>Have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    height: "50%",
    backgroundColor: "#f2f2f2",
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

export default SignupScreen;
