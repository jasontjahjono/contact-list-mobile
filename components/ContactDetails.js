import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import {
  Text,
  ListItem,
  Icon,
  Button,
  Card,
  Modal,
} from "@ui-kitten/components";
import UserAvatar from "react-native-user-avatar";

export default function ContactDetails({
  route,
  navigation,
  contacts,
  deleteContact,
}) {
  const [visible, setVisible] = useState(false);
  const { id } = route.params;
  const contact = contacts.find((contact) => contact._id === id);
  const d = new Date(contact.birthday);
  const birthday = d.toDateString();
  const handleDelete = () => {
    deleteContact(id);
    navigation.navigate("Contacts");
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Icon
          style={styles.icons}
          fill="#383e56"
          name="arrow-back"
          onPress={() => navigation.navigate("Contacts")}
        />
      </View>
      <View style={styles.deleteContainer}>
        <Icon
          style={styles.icons}
          fill="#383e56"
          name="trash-2-outline"
          onPress={() => setVisible(true)}
        />
      </View>
      <View style={styles.titleContainer}>
        <UserAvatar size={80} name={contact.contact_name} />
        <Text category="h5">{contact.contact_name}</Text>
        <Text category="p2">{contact.work_info}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Phone"
          description={contact.phone}
          accessoryLeft={(props) => (
            <Icon {...props} name="phone-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Email"
          description={contact.email}
          accessoryLeft={(props) => (
            <Icon {...props} name="email-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Birthday"
          description={birthday}
          accessoryLeft={(props) => (
            <Icon {...props} name="gift-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ListItem
          title="Address"
          description={contact.address}
          accessoryLeft={(props) => (
            <Icon {...props} name="home-outline" fill="#383e56" />
          )}
          style={styles.listItem}
        />
      </View>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
        style={styles.dialogContainer}
      >
        <Card disabled={true} style={styles.dialog}>
          <Text category="h4">Delete Contact?</Text>
          <Button onPress={handleDelete} style={styles.buttons}>
            Delete
          </Button>
          <Button
            onPress={() => setVisible(false)}
            status="info"
            style={styles.buttons}
          >
            Cancel
          </Button>
        </Card>
      </Modal>
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
  deleteContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    paddingTop: StatusBar.currentHeight,
  },
  dialogContainer: {
    width: "65%",
    height: "24%",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    flex: 1,
    alignItems: "center",
  },
  icons: {
    width: 32,
    height: 32,
  },
  buttons: {
    marginTop: 8,
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
