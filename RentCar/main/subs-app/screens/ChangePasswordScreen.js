import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase";

const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      await auth.sendPasswordResetEmail(email);

      Alert.alert(
        "Success",
        "Password change email sent. Please check your inbox."
      );
    } catch (error) {
      console.error("Error changing password: ", error.message);
      Alert.alert("Error", "Failed to change password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="New password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm password"
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleChangePassword} style={[styles.button, { backgroundColor: "#8A2BE2" }]}>
          <Text style={styles.buttonText}>Change password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    backgroundColor: '#CCCCFF', // Fundalul paginii
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "#8A2BE2", // Culoare mov pentru titlu
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 25,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#9932CC", // Culoare mov pentru buton
    width: "100%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Text alb pentru buton
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
