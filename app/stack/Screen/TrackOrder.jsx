import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { colors } from "../../Config/colorpallete";
import polyline from "@mapbox/polyline";

const { height } = Dimensions.get("window");

export default function TrackOrderScreen() {
  const router = useRouter();
  const sheetHeight = height * 0.65;
  const minHeight = height * 0.25;
  const translateY = useRef(new Animated.Value(height - minHeight)).current;
  const lastPos = useRef(height - minHeight);

  const [routeCoords, setRouteCoords] = useState([]);
  const apiKey = "AIzaSyD7S5F0Kd8vDcR2NZM28FJ7sO04yh7RkiE"; // replace with your key

  const restaurant = { latitude: 22.5726, longitude: 88.3639 };
  const driver = { latitude: 22.5826, longitude: 88.3739 };
  const customer = { latitude: 22.5926, longitude: 88.3839 };

  function getMapRegion(points) {
    const latitudes = points.map((p) => p.latitude);
    const longitudes = points.map((p) => p.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latitudeDelta = (maxLat - minLat) * 0.5; // add some padding
    const longitudeDelta = 0.5; // add some padding
    const latitude = (minLat + maxLat) / 2;
    const longitude = (minLng + maxLng) / 2;

    return { latitude, longitude, latitudeDelta, longitudeDelta };
  }

  const allPoints = [restaurant, customer];
  let initialRegion = getMapRegion(allPoints);
  // Fetch actual route from driver → customer
  useEffect(() => {
    (async () => {
      try {
        await Location.requestForegroundPermissionsAsync();

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${driver.latitude},${driver.longitude}&destination=${customer.latitude},${customer.longitude}&mode=driving&key=${apiKey}`;
        const res = await fetch(url);
        const json = await res.json();

        if (json.routes.length) {
          const points = polyline.decode(
            json.routes[0].overview_polyline.points
          );
          const coords = points.map(([lat, lng]) => ({
            latitude: lat,
            longitude: lng,
          }));
          setRouteCoords(coords);
        }
      } catch (e) {
        console.log("Error fetching directions:", e);
      }
    })();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        let newY = lastPos.current + g.dy;
        if (newY < height - sheetHeight) newY = height - sheetHeight;
        if (newY > height - minHeight) newY = height - minHeight;
        translateY.setValue(newY);
      },
      onPanResponderRelease: (_, g) => {
        const expand = g.dy < -50;
        const target = expand ? height - sheetHeight : height - minHeight;
        Animated.spring(translateY, {
          toValue: target,
          useNativeDriver: true,
        }).start(() => {
          lastPos.current = target;
        });
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      {/* Google Map */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        const
        initialRegion={{
          latitude: (restaurant.latitude + customer.latitude) / 2,
          longitude: (restaurant.longitude + customer.longitude) / 2,
          latitudeDelta:
            Math.abs(restaurant.latitude - customer.latitude) * 1.01, // fallback if too small
          longitudeDelta:
            Math.abs(restaurant.longitude - customer.longitude) * 1.01,
        }}
      >
        {/* Restaurant → Driver (dotted line) */}
        <Polyline
          coordinates={[restaurant, driver]}
          strokeColor="#FFA726" // subtle orange
          strokeWidth={2}
          lineDashPattern={[10, 8]}
          lineCap="round"
        />

        {/* Driver → Customer (actual route) */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#FF5722" // standout route color
            strokeWidth={2}
            lineCap="round"
          />
        )}

        {/* Restaurant Marker */}
        <Marker coordinate={restaurant} title="Restaurant">
          <View style={styles.markerCircle}>
            <FontAwesome5 name="utensils" size={28} color="#FF6347" />
          </View>
        </Marker>

        {/* Driver Marker */}
        <Marker coordinate={driver} title="Driver">
          <View style={styles.markerCircle}>
            <MaterialCommunityIcons name="bike" size={28} color="#1E90FF" />
          </View>
        </Marker>

        {/* Customer Marker */}
        <Marker coordinate={customer} title="You">
          <View style={styles.markerCircle}>
            <MaterialCommunityIcons
              name="map-marker-circle"
              size={28}
              color="#32CD32"
            />
          </View>
        </Marker>
      </MapView>

      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        {/* Handle Bar */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        {/* Content */}
        <View style={styles.sheetContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.restaurantImgPlaceholder} />
            <View>
              <Text style={styles.title}>Uttora Coffee House</Text>
              <Text style={styles.subtext}>Ordered At 06 Sept, 10:00pm</Text>
              <Text style={styles.subtext}>
                <Text style={styles.bold}>2x</Text> Burger{"  "}
                <Text style={styles.bold}>4x</Text> Sandwich
              </Text>
            </View>
          </View>

          {/* Estimated Time */}
          <View style={styles.deliveryTime}>
            <Text style={styles.timeText}>20 min</Text>
            <Text style={styles.gray}>ESTIMATED DELIVERY TIME</Text>
          </View>

          {/* Status Steps */}
          <View style={styles.timeline}>
            {[
              { label: "Your order has been received", active: true },
              { label: "The restaurant is preparing your food", loading: true },
              { label: "Your order has been picked up for delivery" },
              { label: "Order arriving soon!" },
            ].map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepIndicatorContainer}>
                  <View
                    style={[
                      styles.stepIndicator,
                      step.active && styles.activeStepDot,
                      step.loading && styles.loadingStepDot,
                    ]}
                  >
                    {index < 3 && <View style={styles.stepLine} />}
                  </View>
                </View>
                <Text
                  style={[
                    styles.stepText,
                    step.active && styles.activeStepText,
                    step.loading && styles.loadingStepText,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Courier Section */}
          <View style={styles.courierCard}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.courierName}>Robert F.</Text>
              <Text style={styles.graySmall}>Courier</Text>
            </View>
            <TouchableOpacity style={[styles.iconBtn, styles.primaryBtn]}>
              <Ionicons name="call" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, styles.outlinedBtn]}>
              <Ionicons name="chatbubble" size={20} color="#FF9800" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 25,
    elevation: 4,
  },

  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: height,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },

  handleContainer: { alignItems: "center", paddingVertical: 8 },
  handle: { width: 60, height: 6, borderRadius: 3, backgroundColor: colors.borderGray },
  sheetContent: { paddingHorizontal: 25, paddingTop: 5 },

  restaurantImgPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.altGray,
    marginRight: 15,
  },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 17, fontWeight: "600", color: colors.textPrimary },
  subtext: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  bold: { fontWeight: "700", color: colors.textPrimary },

  deliveryTime: { alignItems: "center", marginVertical: 20 },
  timeText: { fontSize: 28, fontWeight: "800", color: colors.textPrimary },
  gray: { color: colors.textSecondary, fontSize: 12, fontWeight: "500" },

  timeline: { marginVertical: 10, marginLeft: 5 },
  stepRow: { flexDirection: "row", alignItems: "flex-start", marginVertical: 8 },
  stepIndicatorContainer: { width: 24, alignItems: "center" },
  stepIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.borderGray,
    position: "relative",
  },
  activeStepDot: { backgroundColor: colors.warn },
  loadingStepDot: {
    borderWidth: 2,
    borderColor: colors.warn,
    backgroundColor: colors.white,
  },
  stepLine: {
    position: "absolute",
    top: 14,
    left: 6.5,
    width: 1,
    height: 25,
    backgroundColor: colors.borderGray,
  },
  stepText: { fontSize: 14, color: colors.midGray, flex: 1, paddingRight: 20 },
  activeStepText: { color: colors.warn, fontWeight: "600" },
  loadingStepText: { color: colors.midGray },

  courierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 18,
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  courierName: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  graySmall: { color: colors.textMuted, fontSize: 13 },

  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  primaryBtn: {
    backgroundColor: colors.warn,
    shadowColor: colors.warn,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },

  outlinedBtn: {
    borderWidth: 1.8,
    borderColor: colors.warn,
    backgroundColor: colors.white,
  },

  markerCircle: {
    padding: 6,
    borderRadius: 50,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
