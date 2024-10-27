import { Text, Dimensions } from "react-native";

import Animated, { Keyframe, runOnJS } from "react-native-reanimated";
import { Option } from "../Option";
import { styles } from "./styles";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmount: () => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
  onUnmount,
}: Props) {
  // CRIANDO ANIMAÇÃO DE ENTRADA
  const enteringKeyframe = new Keyframe({
    0: {
      opacity: 0,
      transform: [
        { translateX: SCREEN_WIDTH }, // horizontal
        { rotate: "90deg" },
      ],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [
        { translateX: 0 }, // horizontal
        { rotate: "0deg" },
      ],
    },
  });

  // CRIANDO ANIMAÇÃO DE SAIDA
  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
      transform: [
        { translateX: 0 }, // horizontal
        { rotate: "0deg" },
      ],
    },
    to: {
      opacity: 0,
      transform: [
        { translateX: SCREEN_WIDTH * -1 }, // horizontal
        { rotate: "-90deg" },
      ],
    },
  });

  return (
    <Animated.View
      entering={enteringKeyframe.duration(400)}
      exiting={exitingKeyframe.duration(400).withCallback((finished) => {
        "worklet";
        if (finished) {
          runOnJS(onUnmount)();
        }
      })}
      style={styles.container}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}
