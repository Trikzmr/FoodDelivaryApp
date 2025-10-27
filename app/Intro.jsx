import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "./Config/colorpallete";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Fast Delivery",
    text: "Get your favorite meals delivered in minutes!",
    image:
      "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
  {
    title: "Tasty Dishes",
    text: "Order from top restaurants near you.",
    image:
      "https://cdn-icons-png.flaticon.com/512/857/857681.png",
  },
  {
    title: "Easy Payment",
    text: "Pay securely with multiple payment options.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
  },
  {
    title: "Track Orders",
    text: "Know exactly where your food is — live tracking.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2942/2942076.png",
  },
];

export default function Intro() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      router.replace("/(tabs)");
    }
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const handleScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const progress = scrollX.interpolate({
    inputRange: [0, (slides.length - 1) * width],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {slides.map((item, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Circular Progress Bar */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                transform: [{ rotate: progress }],
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1}/{slides.length}
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextText}>
          {currentIndex === slides.length - 1 ? "Start Ordering 🍔" : "Next →"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softPeach, // replaced #fff7f0
    alignItems: "center",
    justifyContent: "center",
  },

  slide: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    color: colors.brandAlt, // replaced #ff6600
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: colors.midGray, // replaced #555
    textAlign: "center",
    paddingHorizontal: 30,
  },

  progressWrapper: {
    position: "absolute",
    top: 80,
    right: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  progressBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.softPeach, // replaced #ffcc99
    alignItems: "center",
    justifyContent: "center",
  },

  progressFill: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.brandAlt, // replaced #ff6600
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },

  progressText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.brandAlt, // replaced #ff6600
  },

  nextBtn: {
    backgroundColor: colors.brandAlt, // replaced #ff6600
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 50,
    shadowColor: colors.brandAlt, // replaced #ff6600
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  nextText: {
    color: colors.white, // replaced "white"
    fontSize: 18,
    fontWeight: "600",
  },
});
