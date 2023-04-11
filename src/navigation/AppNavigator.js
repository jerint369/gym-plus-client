import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import Biometrics from "../screens/Biometrics";
//import CreateBiometric from "../screens/CreateBiometric";

import Instructors from "../screens/Instructors";
import ProfileScreen from "../screens/ProfileScreen";
import Home from "../screens/Home";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const MainStack = createNativeStackNavigator();



const Main = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false,
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}>
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Training" component={Home} />
      
      <MainStack.Screen name="SignupScreen" component={SignupScreen} />
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const MainTabs = (props) => {
  const route = useRoute();
  const email = route.params?.email;
  const currentUser = props.route.params.currentUser;
  

  const navigation = useNavigation();
  const { isDarkmode } = useTheme();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("LoginScreen");
        },
      },
    ]);
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person" : "person";
          } else if (route.name === "Biometrics") {
            iconName = focused ? "finger-print" : "finger-print-outline";
          } else if (route.name === "Instructors") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "log-out" : "log-out-outline";
          }

          return <TabBarIcon name={iconName} size={size} color={color} />;
        },
        tabBarButton: (props) => {
          return (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (route.name === "Logout") {
                  handleLogout(props.navigation);
                } else {
                  props.onPress();
                }
              }}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="Home" component={Home} initialParams={{ currentUser }} />
      <Tabs.Screen name="Instructors" component={Instructors} />
      <Tabs.Screen
        name="Biometrics"
        component={Biometrics}
        initialParams={{ currentUser }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ currentUser }}
      />

      <Tabs.Screen name="Logout" component={LoginScreen} />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
