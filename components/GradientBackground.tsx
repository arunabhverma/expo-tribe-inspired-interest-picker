import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

export const GradientBackground = () => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={[theme.colors.card, theme.colors.background]}
      style={StyleSheet.absoluteFill}
    />
  );
};
