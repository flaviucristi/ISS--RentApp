import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("MainScreen");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.forgotPassword} onPress={() => navigation.navigate("ChangePasswordScreen")}>Forgotten password?</Text> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ChangePasswordScreen")}
      >
        <Text style={styles.forgotPassword}>Forgotten password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#CCCCFF', // culoarea fundalului
  },
  welcome: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B0082", // culoarea textului de bun venit
  },
  input: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 25,
    color: "#4B0082", // culoarea textului de input
  },
  forgotPassword: {
    marginTop: 15,
    color: "#800080", // culoarea textului pentru "Forgotten password?"
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#9370DB", // culoarea butonului Login
    width: "100%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // culoarea textului butonului Login
    fontWeight: "700",
    fontSize: 16,
  },
});


export default LoginScreen;
