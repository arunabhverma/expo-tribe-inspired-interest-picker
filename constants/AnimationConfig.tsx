import { WithSpringConfig } from "react-native-reanimated";

export const ExpandSpringConfig: WithSpringConfig = {
  stiffness: 200,
  damping: 8,
  mass: 0.3,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export const CollapseSpringConfig: WithSpringConfig = {
  stiffness: 600,
  damping: 60,
  mass: 0.25,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};
