import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import NavBar from "../components/NavBar";
import { auth } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
      const prefix = currentUser.email.split("@")[0];
      setEmailPrefix(prefix);
    }
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require("../assets/icons/user.png")}
      />
      <View>
        <Text style={styles.email}>{emailPrefix}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePasswordScreen")}
          style={[styles.button, { backgroundColor: "#8A2BE2" }]} // Culori mov pentru butoane
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("HelpScreen")}
          style={[styles.button, { backgroundColor: "#9932CC" }]} // Culori mov pentru butoane
        >
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSignOut();
            navigation.navigate("Intro3");
          }}
          style={[styles.button, { backgroundColor: "#BA55D3" }]} // Culori mov pentru butoane
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    marginTop: 50,
    backgroundColor: "#CCCCFF", // Fundalul paginii
  },
  profileImage: {
    marginTop: 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderColor: "#8A2BE2", // Contur mov pentru imaginea de profil
    borderWidth: 2,
  },
  email: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#9932CC", // Culoare mov pentru adresa de email
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 40,
    alignItems: "center",
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.7,
  },
  buttonText: {
    color: "#fff", // Text alb pentru butoane
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProfileScreen;
