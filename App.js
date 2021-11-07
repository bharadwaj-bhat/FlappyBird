import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { GameEngine } from "react-native-game-engine";

import entities from "./entities";
import { Physics } from "./Physics";

export default function App() {
 
   
  const [running, setRunning]= useState(false);
  const [engine, setEngine] = useState(null);
  const [score, setScore] = useState(0)


  useEffect(()=>{
    setRunning(false)
  },[])

  const handleCollision = (e)=>{
    if(e.type === 'game_over'){
      setRunning(false);
      engine.stop();
      return;
    }
    if(e.type === 'score_increment'){
      setScore((prev)=> prev+1);
      return;
    }
  }

  return (
    <View style={styles.container}>
     
      <Text style = {styles.scoreCard} >{score}</Text>
      <GameEngine
      ref = {(ref)=> setEngine(ref)}
       systems ={[Physics]} 
       running = {running}
       onEvent = {handleCollision}
      style={styles.gameEngine} entities={entities()}>
      <StatusBar style="auto" hidden={true} />
      </GameEngine>

    {!running?
     <View style = {styles.startButtonWrapper}>
        <TouchableOpacity style={styles.startButton}
         onPress = {()=> {
          setScore(0)
           setRunning(true)
           engine.swap(entities())
              
          }
          }  
        >
            <Text style = {styles.buttonText}>
              Start Game
            </Text>
        </TouchableOpacity>
     </View>
     :
     null
  }

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

    // backgroundColor:'tomato'
  },
  scoreCard:{
    textAlign:'center',
    fontSize:40,
    fontWeight:'bold',
    margin:20
  },
  startButtonWrapper:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  startButton:{
    backgroundColor:'black',
    paddingHorizontal:30,
    paddingVertical:10,
  },
  buttonText:{
    fontWeight:'bold',
    color:'white',
    fontSize:30
  }
});
