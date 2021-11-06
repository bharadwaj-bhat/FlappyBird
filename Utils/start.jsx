import Matter from "matter-js";
import { BirdCreator } from "../Components/TheBirdie";

export const Start = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  world.gravity.y = 0.4;

  return {
    physics: { engine, world },
    Bird: BirdCreator(
      world,
      "green",
      { x: 50, y: 200 },
      { height: 40, width: 40 }
    ),
  };
};
