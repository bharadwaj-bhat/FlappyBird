import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import { GameEngine } from "react-native-game-engine";
import { Start } from "./Utils/start";

export default function App() {
  const [test, setTest] = useState(0);

  const handlePress = () => {
    setTest((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <StatusBar style="auto" hidden={true} />
      <GameEngine style={styles.gameEngine} entities={Start}></GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
