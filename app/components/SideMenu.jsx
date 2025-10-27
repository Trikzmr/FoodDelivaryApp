import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, TouchableOpacity } from "react-native";
import { colors } from "../Config/colorpallete";

const { width } = Dimensions.get("window");

export default function SlidingMenu({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    const toValue = visible ? 0 : -width;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dim Overlay */}
      <TouchableOpacity
        style={overlayStyles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Sliding Menu */}
      <Animated.View
        style={[overlayStyles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={overlayStyles.sidebarTitle}>Menu</Text>
        <TouchableOpacity style={overlayStyles.menuItem}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={overlayStyles.menuItem}>
          <Text>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={overlayStyles.menuItem}>
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={overlayStyles.menuItem}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const overlayStyles = {
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: width * 0.7,
    height: "100%",
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 3,
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 2,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
};
