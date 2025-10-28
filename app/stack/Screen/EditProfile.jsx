import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";

export default function EditProfile() {
  const [name, setName] = useState("Vishal Khadok");
  const [email, setEmail] = useState("hello@halallab.co");
  const [phone, setPhone] = useState("408-841-0926");
  const [bio, setBio] = useState("I love fast food");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Edit Profile" />

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={64} color="white" />
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="pencil" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>BIO</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
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
  profileContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFC5A1",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    backgroundColor: "#FF6B00",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: "35%",
  },
  form: {
    marginBottom: 40,
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
  saveButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
