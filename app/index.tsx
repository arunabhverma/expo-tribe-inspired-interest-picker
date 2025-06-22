import { FooterNextButton } from "@/components/FooterNextButton";
import { GradientBackground } from "@/components/GradientBackground";
import { Header } from "@/components/Header";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Box } from "../components/Box";
import { ExtraBox } from "../components/ExtraBox";
import { ExtraBoxModal } from "../components/ExtraBoxModal";
import { Interests } from "../constants/Interests";

export default function Index() {
  const [showExtraBox, setShowExtraBox] = useState(false);
  const extraBoxValue = useSharedValue(0);
  const extraBoxPosition = useSharedValue({ x: 0, y: 0 });
  const activeExtraBoxPosition = useSharedValue({ x: 0, y: 0 });
  const inputRef = useAnimatedRef<TextInput>();
  const [extraBoxText, setExtraBoxText] = useState("");

  useEffect(() => {
    if (showExtraBox) {
      extraBoxValue.value = withTiming(1);
      activeExtraBoxPosition.value = extraBoxPosition.value;
      inputRef.current?.focus();
    }
  }, [
    activeExtraBoxPosition,
    extraBoxPosition.value,
    extraBoxValue,
    inputRef,
    showExtraBox,
  ]);

  return (
    <View style={[styles.container]}>
      <GradientBackground />
      <Header />
      <View style={[styles.row, { alignItems: "flex-end" }]}>
        {Interests.slice(0, 3).map((interest) => (
          <Box key={interest.id} interest={interest} />
        ))}
      </View>
      <View style={[styles.row, { alignItems: "center" }]}>
        {Interests.slice(3, 6).map((interest) => (
          <Box key={interest.id} interest={interest} />
        ))}
      </View>
      <View style={[styles.row, { alignItems: "flex-start" }]}>
        {Interests.slice(6, 8).map((interest) => (
          <Box key={interest.id} interest={interest} />
        ))}
        <ExtraBox
          extraBoxValue={extraBoxValue}
          showExtraBox={showExtraBox}
          setShowExtraBox={setShowExtraBox}
          extraBoxPosition={extraBoxPosition}
          extraBoxText={extraBoxText}
        />
      </View>
      {showExtraBox && (
        <ExtraBoxModal
          inputRef={inputRef}
          extraBoxValue={extraBoxValue}
          setShowExtraBox={setShowExtraBox}
          activeExtraBoxPosition={activeExtraBoxPosition}
          setExtraBoxText={setExtraBoxText}
        />
      )}
      <FooterNextButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
