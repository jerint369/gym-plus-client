import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TabBarIcon = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default TabBarIcon;
