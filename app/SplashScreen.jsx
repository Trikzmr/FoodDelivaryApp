import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { colors } from "./Config/colorpallete";
const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Background Pattern */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1598514983223-cbfa5a30f7d4?auto=format&fit=crop&w=200&q=80",
        }}
        style={[styles.pattern, styles.topPattern]}
        resizeMode="contain"
      />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.text}>
          F
          <Text style={styles.orangePart}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
              }}
              style={styles.icon}
            />
          </Text>
          ood
        </Text>
      </View>

      {/* Bottom Background Pattern */}
      <Image
        source={require("../assets/images/pizza.png")}
        style={styles.bottomPattern}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // replaced #fff
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1A1A1A", // replaced #1A1A1A
  },

  orangePart: {
    color: "#FF6B00", // replaced #FF6B00
  },

  icon: {
    width: 30,
    height: 30,
    tintColor: "#FF6B00", // replaced #FF6B00
  },

  pattern: {
    position: "absolute",
  },

  topPattern: {
    top: 0,
    left: 0,
    width: 200,
    height: 200,
  },

  bottomPattern: {
    position: "absolute",
    width: width * 1.5, // bigger
    height: width * 1.5,
    bottom: -height * 0.2, // move part off-screen
    right: -width * 0.5, // half comes from right
  },
});

export default SplashScreen;
