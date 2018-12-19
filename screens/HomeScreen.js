import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ThyroidForm from "../components/ThyroidForm";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ThyroidForm />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
