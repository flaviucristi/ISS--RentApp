import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const GetStartedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Aici ar trebui să adăugați ilustrația */}
      <Text style={styles.title}>Thank you for joining us</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCCCFF", // Fundal mov deschis
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#6A1B9A", // Mov mai închis
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#D500F9", // Mov mai închis pentru buton
    width: "100%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#FFF100",
    borderWidth: 2,
  },
  buttonText: {
    color: "white", // Text alb pentru vizibilitate
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  }, 
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
});

export default GetStartedScreen;
