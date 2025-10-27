// App.js or RootLayout.js
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, Redirect } from "expo-router";
import * as SplashScreenExpo from "expo-splash-screen"; // rename to avoid conflict
import SplashScreen from "./SplashScreen"; // your splash screen component

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Prevent native splash from auto-hiding
        await SplashScreenExpo.preventAutoHideAsync();

        // Check if app is launched for the first time
        const alreadyLaunched = await AsyncStorage.getItem("alreadyLaunched");
        if (!alreadyLaunched) {
          await AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }

        // Keep splash screen visible for 1.5 seconds
        setTimeout(async () => {
          setLoading(false);
          await SplashScreenExpo.hideAsync();
        }, 1500);
      } catch (e) {
        console.warn(e);
      }
    };

    init();
  }, []);

  // Show custom splash screen while loading
  if (loading) return <SplashScreen />;

  // If first launch, redirect to intro screen
  if (isFirstLaunch) return <Redirect href="/Intro" />;

  // Otherwise, go to main app
  return <Slot />;
}
