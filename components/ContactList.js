import React from "react";
import { Button, Icon, List, ListItem } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export default function ContactList({ navigation, contacts }) {
  const renderItemAccessory = (props) => (
    <>
      <Icon {...props} name="phone" style={styles.buttons} fill="#383e56" />
      <Icon
        {...props}
        name="message-square"
        style={styles.buttons}
        fill="#383e56"
      />
    </>
  );
  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.contact_name}`}
      description={`${item.phone}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { id: item._id })}
    />
  );

  return (
    <View style={styles.container}>
      <List data={contacts} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    flex: 1,
  },
  buttons: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  item: {
    height: 65,
  },
});
