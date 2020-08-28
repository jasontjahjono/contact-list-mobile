import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Text, ListItem, Icon } from "@ui-kitten/components";
import UserAvatar from "react-native-user-avatar";

export default function ContactDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Icon
          style={styles.backIcon}
          fill="#383e56"
          name="arrow-back"
          onPress={() => navigation.navigate("Contacts")}
        />
      </View>
      <View style={styles.titleContainer}>
        <UserAvatar size={80} name="Jason Tjahjono" />
        <Text category="h5">Jason Tjahjono</Text>
        <Text category="p2">Alpabit Internship</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Phone"
          description="087889203779"
          accessoryLeft={(props) => (
            <Icon {...props} name="phone-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Email"
          description="jason@gmail.com"
          accessoryLeft={(props) => (
            <Icon {...props} name="email-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Birthday"
          description="25 July 2001"
          accessoryLeft={(props) => (
            <Icon {...props} name="gift-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Address"
          description="Kembang Harum II Blok C6/5, Puri Indah"
          accessoryLeft={(props) => (
            <Icon {...props} name="home-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingTop: StatusBar.currentHeight,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  container: {
    flex: 1,
    backgroundColor: "#f6f6f5",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
    marginBottom: 40,
  },
  bodyContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    justifyContent: "center",
    width: "85%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,

    elevation: 3,
  },
  listItem: {
    backgroundColor: "#fff",
    width: "90%",
    height: 60,
  },
});
