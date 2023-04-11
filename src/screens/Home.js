import React, { useState, useEffect } from "react";
import { Linking } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Layout,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Training from "./Training";

export default Home = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const userData = props.route?.params?.currentUser;
  const userId = userData.userId;
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    if (userData?.weight !== "") {
      try {
        setLoading(true);
        axios.get(
          `http://10.192.144.153:3000/training/${userId}`
        ).then((response) => {
          console.log(response);
          if (response) {
            setTrainingData(response.data);
            setLoading(false);
          }
        });

      } catch (error) {
        console.error(error);
      }
    }
  }, [userData.weight, userData.height, userData.age, userData.weightLoss, userData.muscleGain, userData.gender]);


  // const { isDarkmode, setTheme } = useTheme();
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Loading...</Text>
      </View>
    );
  } else if (trainingData) {
    return (
      <Training trainingData={trainingData} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo-colour.png")}
          style={styles.image}
        />
      </View>

      <Text style={styles.logo}>Welcome to GYM+ </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    width: "10%",
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});
