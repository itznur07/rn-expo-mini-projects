import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const onboardingSteps = [
  {
    icon: "snowflake",
    title: "Welcome to onboarding",
    description:
      " Monitor your sending and contribution, ensuring every align with your family's aspirations.",
  },
  {
    icon: "people-arrows",
    title: "Learn and grow together",
    description:
      " Monitor your sending and contribution, ensuring every align with your family's aspirations.",
  },
  {
    icon: "book",
    title: "Education for children",
    description:
      " Monitor your sending and contribution, ensuring every align with your family's aspirations.",
  },
];

const Onboarding = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const tap = Gesture.Tap().onEnd(() => {
    onContinue();
  });
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;

    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.page}>
        <GestureDetector gesture={tap}>
          <View style={styles.pageContent}>
            {/* Steps Indecatior animation start */}

            <View style={styles.stepIndicatorContainer}>
              {onboardingSteps.map((step, i) => (
                <View
                  key={i + 1}
                  style={[
                    styles.stepIndicator,
                    {
                      backgroundColor: i === screenIndex ? "#cef202" : "white",
                    },
                  ]}
                />
              ))}
            </View>

            {/* Steps Indecatior animation end*/}

            <FontAwesome5
              style={styles.image}
              name={data.icon}
              size={56}
              color='black'
            />
            <View style={styles.footer}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.description}>{data.description}</Text>

              {/* Controlling onboarding button */}
              <View style={styles.buttonRow}>
                <Pressable onPress={endOnboarding}>
                  <Text style={styles.buttonText}>Skip</Text>
                </Pressable>
                <Pressable onPress={onContinue} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141a",
  },
  pageContent: {
    flex: 1,
    padding: 20,
  },
  image: {
    alignSelf: "center",
    fontSize: 100,
    color: "#cef202",
    margin: 20,
  },
  footer: {
    marginTop: "auto",
  },
  title: {
    fontWeight: "700",
    fontSize: 28,
    color: "white",
  },
  description: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },

  // button controls for the navigation

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: "#302e38",
    borderRadius: 30,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  // Steps Indecatior animation
  stepIndicatorContainer: {
    position: "absolute",
    top: -10,
    width: "100%",
    zIndex: 1,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#cef202",
  },
});

export default Onboarding;
