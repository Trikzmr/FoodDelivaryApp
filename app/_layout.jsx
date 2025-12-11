// App.js or RootLayout.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Slot } from "expo-router";
import * as SplashScreenExpo from "expo-splash-screen"; // rename to avoid conflict
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
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

  // Otherwise, go to main app with Redux Provider
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
