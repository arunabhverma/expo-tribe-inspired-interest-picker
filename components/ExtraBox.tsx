import { useTheme } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  CollapseSpringConfig,
  ExpandSpringConfig,
} from "../constants/AnimationConfig";

interface ExtraBoxProps {
  extraBoxValue: SharedValue<number>;
  showExtraBox: boolean;
  setShowExtraBox: (value: boolean) => void;
  extraBoxPosition: SharedValue<{ x: number; y: number }>;
  extraBoxText: string;
}

export const ExtraBox = ({
  extraBoxValue,
  showExtraBox,
  setShowExtraBox,
  extraBoxPosition,
  extraBoxText,
}: ExtraBoxProps) => {
  const viewRef = useRef<View>(null);
  const theme = useTheme();
  const width = useSharedValue(100);
  const colorChange = useSharedValue(0);

  useEffect(() => {
    if (extraBoxText) {
      width.value = withSpring(110, ExpandSpringConfig);
      colorChange.value = withSpring(1, CollapseSpringConfig);
    } else {
      width.value = withSpring(100, CollapseSpringConfig);
      colorChange.value = withSpring(0, CollapseSpringConfig);
    }
  }, [extraBoxText, width, colorChange]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: width.value,
      borderRadius: interpolate(width.value, [100, 110], [15, 20]),
      borderWidth: interpolate(width.value, [100, 110], [1.5, 0.5]),
      backgroundColor: interpolateColor(
        colorChange.value,
        [0, 1],
        [theme.colors.card, theme.colors.border]
      ),
    };
  });

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((_x, _y, _width, _height, pageX, pageY) => {
        extraBoxPosition.value = {
          x: pageX,
          y: pageY,
        };
      });
    }
  }, [viewRef, extraBoxPosition]);

  return (
    <Animated.View
      ref={viewRef}
      onTouchEndCapture={(e) => {
        if (showExtraBox) {
          extraBoxValue.value = withTiming(0, {}, () => {
            runOnJS(setShowExtraBox)(false);
          });
        } else {
          setShowExtraBox(true);
        }
      }}
      style={[
        styles.boxStyle,
        {
          borderColor: theme.colors.border,
        },
        styles.endBoxStyle,
        animatedStyle,
      ]}
    >
      <Animated.Text
        numberOfLines={1}
        style={{
          color: theme.colors.text,
          fontSize: 12,
          width: 80,
          textAlign: "center",
        }}
      >
        {extraBoxText || "Add new"}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  boxStyle: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
  },

  endBoxStyle: {
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
});
