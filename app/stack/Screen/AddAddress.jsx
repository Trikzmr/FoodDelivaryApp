import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

export default function AddAddress() {
  const router = useRouter();
  const mapRef = useRef(null);

  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [note, setNote] = useState("");

  // Get user current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      setMarker({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
    setMarker({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  const handleUseCurrent = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      setMarker({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (err) {
      Alert.alert("Error", "Unable to get current location.");
    }
  };

  const handleSave = () => {
    if (!marker) {
      Alert.alert("Error", "Please choose a location.");
      return;
    }
    const addressData = {
      name,
      phone,
      house,
      street,
      city,
      pin,
      note,
      latitude: marker.latitude,
      longitude: marker.longitude,
    };
    console.log("Address Saved:", addressData);
    Alert.alert("Success", "Address saved successfully!");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#3C3C43" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
      </View>

      {/* Map Section */}
      {loading ? (
        <View style={[styles.map, styles.center]}>
          <ActivityIndicator size="large" color="#FF6B00" />
        </View>
      ) : (
        region && (
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={region}
              onRegionChangeComplete={handleRegionChange}
            />
            {/* Center Marker Icon */}
            <View style={styles.markerFixed}>
              <Ionicons name="location-sharp" size={38} color="#FF6B00" />
            </View>

            {/* Use Current Location Button */}
            <TouchableOpacity
              style={styles.currentBtn}
              onPress={handleUseCurrent}
            >
              <Ionicons name="locate" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )
      )}

      {/* Form Section */}
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>HOUSE / FLAT NO.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter house or flat number"
          value={house}
          onChangeText={setHouse}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>STREET / AREA</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street or area"
          value={street}
          onChangeText={setStreet}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>CITY</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>PIN CODE</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pin code"
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>NOTE (OPTIONAL)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add landmark or delivery note"
          value={note}
          onChangeText={setNote}
          multiline
          placeholderTextColor="#999"
        />

        {/* Lat / Lng Display */}
        {marker && (
          <View style={styles.coords}>
            <Text style={styles.coordText}>
              Lat: {marker.latitude.toFixed(5)} | Lng: {marker.longitude.toFixed(5)}
            </Text>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// 💅 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "#F2F3F5",
    borderRadius: 30,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: "#111827",
  },
  mapContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    height: height * 0.3,
  },
  markerFixed: {
    position: "absolute",
    top: "45%",
    left: "48%",
    marginLeft: -15,
    marginTop: -15,
  },
  currentBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6B00",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  formContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F5F8FC",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#111827",
    marginBottom: 18,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  coords: {
    alignItems: "center",
    marginBottom: 10,
  },
  coordText: {
    fontSize: 13,
    color: "#6B7280",
  },
  saveButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
