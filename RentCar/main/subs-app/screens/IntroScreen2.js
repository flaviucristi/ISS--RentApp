import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const IntroScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.buttonContainerSkip}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Intro3")}
            style={styles.buttonSkip}
          >
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../assets/imagini/logo2.jpg")} // înlocuiește cu calea către imaginea ta
          style={styles.image}
        />
        <Text style={styles.title}>Struggling to rent a car?</Text>
        <Text style={styles.text}>
          Let us help you.
          With the help of the app, renting a car becomes smoother and more enjoyable, making your job considerably easier.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Intro3")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerText: {
    fontSize: 16,
    textAlign: "right",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  footer: {
    width: "100%",
  },
  buttonContainerSkip: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,
  },
  buttonSkip: {
    backgroundColor: "#9370DB", // culoarea butonului Skip
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#9370DB", // culoarea butonului Next
    width: "100%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#9400D3", // culoarea marginii butonului Outline
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#9400D3", // culoarea textului butonului Outline
    fontWeight: "700",
    fontSize: 16,
  },
});


export default IntroScreen2;
