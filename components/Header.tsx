import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Header = () => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        What inspires you 🤔?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
