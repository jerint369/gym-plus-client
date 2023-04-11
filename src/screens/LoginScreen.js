import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 // const [loginData, setLoginData] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are mandatory");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    
    try {
      const LoginRequest = await axios.post(
        "http://10.192.144.153:3000/account/login",
        {
          email,
          password,
        }
      );
      if (LoginRequest.data === "") {
        alert("User doesnt Exist")
       
      }
      else{
        console.log("Successfully logged in!");
        const currentUser = LoginRequest.data
        
        navigation.navigate("MainTabs", {currentUser: currentUser});
      }
    } catch (error) {
      setErrorMessage("Login Failed");
    }
  };

  const signup = () => {
    navigation.navigate("SignupScreen");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo-colour.png")}
          style={styles.image}
        />
      </View>

      <Text style={styles.logo}>GYM +</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email *"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
        {emailError ? (
          <Text style={styles.errorText1}>{emailError}</Text>
        ) : null}
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password *"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {passwordError ? (
          <Text style={styles.errorText1}>{passwordError}</Text>
        ) : null}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signup}>
        <Text style={styles.label}>Don't have an account? Signup</Text>
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
  header: {
    alignItems: "center",
    width: "10%",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    paddingTop: 30,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
    paddingTop: 7,
    marginBottom: 5,
    marginTop: -15,
    marginLeft: 5,
    marginRight: 5,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  errorText1: {
    color: "red",
    marginBottom: 5,
    marginTop: -15,
    marginLeft: 5,
    marginRight: 5,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
});

export default LoginScreen;
