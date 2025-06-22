import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const FooterNextButton = () => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: bottom + 20,
          backgroundColor: theme.colors.notification,
        },
      ]}
    >
      <Ionicons
        name="arrow-forward-outline"
        size={24}
        color={theme.colors.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 20,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
