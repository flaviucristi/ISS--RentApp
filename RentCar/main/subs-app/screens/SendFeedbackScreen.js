import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import NavBar from "../components/NavBar";
import { ref, set } from "firebase/database";
import { db, auth } from "../firebase.js";

const SendFeedbackScreen = ({ navigation }) => {
  const [feedback, setFeedback] = React.useState("");

  const sendFeedback = () => {
    const userEmail = auth.currentUser.email;
    const username = userEmail.substring(0, userEmail.indexOf("@"));
    const feedbackId = generateUniqueKey();
    set(ref(db, `feedback/${username}/${feedbackId}`), {
      feedback: feedback,
      email: userEmail,
    })
      .then(() => {
        console.log("Feedback sent successfully!");
        setFeedback("");
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
      });
  };

  const generateUniqueKey = () => {
    return new Date().getTime().toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        <Text style={styles.title}>Send Feedback</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your feedback..."
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />
        <TouchableOpacity style={styles.button} onPress={sendFeedback}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomNav}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    borderTopWidth: 1,
    borderColor: "#000",
    backgroundColor: '#CCCCFF', // Fundalul paginii
  },
  fixedContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#8A2BE2", // Culoare mov pentru titlu
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 80,
  },
  input: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#8A2BE2", // Culoare mov pentru conturul inputului
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF', // Fundalul inputului
  },
  button: {
    backgroundColor: "#9932CC", // Culoare mov pentru buton
    width: "50%",
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Text alb pentru buton
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SendFeedbackScreen;
