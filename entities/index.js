import Matter from "matter-js";
import { BirdCreator } from "../Components/TheBirdie";
import { FloorCreator } from "../Components/TheFloor";

import { ObstacleCreator } from "../Components/ThObstacles";
import { Dimensions } from "react-native";
import { getPipeSizePositionPair } from "../utils/random";

const windowHeight= Dimensions.get('window').height+30
const windowWidth= Dimensions.get('window').width


export default  Start => {
  var engine = Matter.Engine.create({ enableSleeping: false });
  var world = engine.world;
  
  engine.gravity.y = 0.4;


  const pipeSizePosA = getPipeSizePositionPair();
  const pipeSizePosB = getPipeSizePositionPair(windowWidth * 0.9);

  
  return {
    physics: { engine, world },
    Bird: BirdCreator(
      world,
      'blue',
      { x: 80, y: 300 },
      { height: 40, width: 40 }
    ),
    ObstacleTop1: ObstacleCreator(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: ObstacleCreator(
      world,
      'ObstacleBottom1',
      'red',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),

    ObstacleTop2: ObstacleCreator(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: ObstacleCreator(
      world,
      'ObstacleBottom1',
      'blue',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: FloorCreator(
      world,
      'green',
      {x:windowWidth/2,y:windowHeight},
      {height:50,width:windowWidth})
  };
};
