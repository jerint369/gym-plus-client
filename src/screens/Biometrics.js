import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Layout, Text } from "react-native-rapi-ui";
import axios from 'axios';
import { useRoute } from "@react-navigation/native";
import AppNavigator from "../navigation/AppNavigator";
import CreateBiometric from "./CreateBiometric";
import EditBiometric from "./EditBiometric";

export default Biometrics = (props) => {
  // const route = useRoute();   This is for getting the email address
  // const email = route.params?.email;
  // const [loading, setLoading] = useState(false);
  console.log(props.route.params.currentUser);
  const currentUser = props.route.params.currentUser
  const [biometric, setBiometric] = useState(undefined);

  useEffect(() => {
    if (currentUser?.userId !== "") {
      try {
        // setLoading(true);
        axios.get(
          `http://10.192.144.153:3000/account/${currentUser?.userId}`
        ).then((response) => {
          console.log(response);
          if (response) {
            setBiometric(response.data);
            // setLoading(false);
          }
        });

      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  if (biometric?.weight != null) {
    return <EditBiometric currentUser={biometric} />
  }

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>

          {(!currentUser.weightLoss && !currentUser.muscleGain) ? (<CreateBiometric currentUser={currentUser} />) : (<EditBiometric currentUser={currentUser} />)}
        </View>
      </View>
    </Layout>
  );
}
