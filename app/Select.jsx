import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Select() {
  const router = useRouter();
  const [firstLaunch, setIsFirstLaunch] = useState(true);
  let logedin = false;

  const checklaunch = async () => {
    const alreadyLaunched = await AsyncStorage.getItem("alreadyLaunched");
    if (!alreadyLaunched) {
      await AsyncStorage.setItem("alreadyLaunched", "true");
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
    if (firstLaunch) {
      router.replace("/Intro");
    } else if (logedin) {
      router.replace("/(tabs)");
    } else {
      router.replace("/Login");
    }
  };

  useEffect(() => {
    checklaunch();
  }, []);

  return <></>;
}
