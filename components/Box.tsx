import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  CollapseSpringConfig,
  ExpandSpringConfig,
} from "../constants/AnimationConfig";
import { InterestType } from "../constants/Interests";

const AnimatedIcons = Animated.createAnimatedComponent(Ionicons);

export const Box = ({ interest }: { interest: InterestType }) => {
  const theme = useTheme();
  const width = useSharedValue(100);
  const colorChange = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: width.value,
      borderRadius: interpolate(width.value, [100, 110], [15, 20]),
      borderWidth: 0.5,
      backgroundColor: interpolateColor(
        colorChange.value,
        [0, 1],
        [theme.colors.card, theme.colors.border]
      ),
    };
  });

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(colorChange.value, [0, 1], [1, 1.23]) },
        {
          translateY: interpolate(colorChange.value, [0, 1], [0, -10]),
        },
      ],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        colorChange.value,
        [0, 1],
        [theme.colors.text, interest.color]
      ),
    };
  }, []);

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(colorChange.value, [0, 1], [0, 1]),
      transform: [
        {
          scale: interpolate(colorChange.value, [0, 1], [0.8, 1.1]),
        },
        {
          translateY: interpolate(colorChange.value, [0, 1], [0, 15]),
        },
      ],
    };
  });

  return (
    <Animated.View
      onTouchEndCapture={() => {
        if (width.value === 100) {
          width.value = withSpring(110, ExpandSpringConfig);
          colorChange.value = withSpring(1, CollapseSpringConfig);
        } else {
          width.value = withSpring(100, CollapseSpringConfig);
          colorChange.value = withSpring(0, CollapseSpringConfig);
        }
      }}
      style={[
        styles.boxStyle,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        },
        animatedStyle,
      ]}
    >
      <Animated.View style={animatedIconContainerStyle}>
        <AnimatedIcons
          size={24}
          name={interest.icon as any}
          style={animatedIconStyle}
        />
      </Animated.View>
      <Animated.View
        style={[animatedTextContainerStyle, styles.textContainerStyle]}
      >
        <Animated.Text style={[styles.textStyle, { color: theme.colors.text }]}>
          {interest.name}
        </Animated.Text>
      </Animated.View>
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
  textContainerStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 10,
  },
});
