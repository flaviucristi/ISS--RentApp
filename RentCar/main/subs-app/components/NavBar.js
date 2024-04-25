import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
        <Image
          source={require("../assets/icons/home.png")}
          style={styles.navIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatBotScreen")}
      >
        <Image
          source={require("../assets/icons/chatbot.png")}
          style={styles.navIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddCarScreen")}
      >
        <Image
          source={require("../assets/icons/AddIcon.png")}
          style={[styles.navIcon, styles.addIcon]} // Apply additional style for the "Add" button
        />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => navigation.navigate("StatsScreen")}>
        <Image
          source={require("../assets/icons/chart.png")}
          style={styles.navIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Image
          source={require("../assets/icons/user.png")}
          style={styles.navIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E8E6FF", // culoarea fundalului
    padding: 20,
    width: "100%",
  },
  navIcon: {
    width: 25,
    height: 25,
    tintColor: "#4B0082", // culoarea iconurilor
  },
  addIcon: {
    width: 30,
    height: 30,
    tintColor: "#4B0082", // culoarea iconului "Add"
  },
});

export default NavBar;
