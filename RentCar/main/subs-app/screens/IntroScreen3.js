import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const IntroScreen3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/imagini/logo3.jpg")} // înlocuiește cu calea către imaginea ta
          style={styles.image}
        />
        <Text style={styles.title}>Stay within the limits when it comes to renting cars.</Text>
        <Text style={styles.text}>
        We offer you a wide range of cars that you can rent at any time.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CCCCFF', // culoarea fundalului
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#800080", // culoarea titlului
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#4B0082", // culoarea textului
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    backgroundColor: "#9370DB", // culoarea butonului Login
    width: "50%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#9370DB", // culoarea marginii butonului Register
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#9370DB", // culoarea textului butonului Register
    fontWeight: "700",
    fontSize: 16,
  },
  orText: {
    marginTop: 10,
    marginBottom: 10,
    color: "#800080", // culoarea textului 'or'
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IntroScreen3;
