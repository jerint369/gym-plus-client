import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Layout, Text } from "react-native-rapi-ui";
import Icon from "react-native-vector-icons/FontAwesome";

const data = [
  {
    name: "John Mathews",
    title: "Fitness Instructor",
    workExperience: "5 years",
    phoneNo: "226 375 9898",
    icon: "user",
  },
  {
    name: "Ava Heights",
    title: "Senior Fitness Instructor",
    workExperience: "7 years",
    phoneNo: "905 875 9845",
    icon: "users",
  },
  {
    name: "Jennifer Singh",
    title: "Fitness Specialist",
    workExperience: "10 years",
    phoneNo: "226 652 2534",
    icon: "user-md",
  },
];

const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.iconContainer}>
      <Icon name={item.icon} size={24} color="#555" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>
        Work experience: {item.workExperience} | Phone no: {item.phoneNo}
      </Text>
    </View>
  </View>
);

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.phoneNo}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
});
