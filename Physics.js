import Matter from "matter-js";
import { getPipeSizePositionPair } from "./utils/random";
import { Dimensions } from "react-native";


const windowHeight= Dimensions.get('window').height+30
const windowWidth= Dimensions.get('window').width


export const Physics =(entities,{touches,time,dispatch}) =>{
    let engine = entities.physics.engine;

    touches.filter(el => el.type === 'press')
    .forEach(t => {
        Matter.Body.setVelocity(entities.Bird.body,{
            x:0,
            y:-8
        })
    })

    Matter.Engine.update(engine,time.delta)

    for(let i = 1; i <= 2; i++){

        if(entities[`ObstacleTop${i}`].body.bounds.max.x <= 80 && !entities[`ObstacleTop${i}`].point){
            entities[`ObstacleTop${i}`].point = true;
            dispatch({type:'score_increment'})
        }
        

        if(entities[`ObstacleTop${i}`].body.bounds.max.x <= 0){
            const pipeSizePos = getPipeSizePositionPair(windowWidth * 0.9);
            
            Matter.Body.setPosition(entities[`ObstacleTop${i}`].body,pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body,pipeSizePos.pipeBottom.pos)
            entities[`ObstacleTop${i}`].point = false;
        }

        Matter.Body.translate(entities[`ObstacleTop${i}`].body,{x:-3,y:0})
        Matter.Body.translate(entities[`ObstacleBottom${i}`].body,{x:-3,y:0})
    }

    
    Matter.Events.on(engine,'collisionStart',(e)=>{
        dispatch({type:'game_over'})
    })

    return entities;
}