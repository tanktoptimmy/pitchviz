import React, { MouseEvent, useState, useCallback } from 'react';
import { css, StyleSheet } from "aphrodite";
import uuid from "short-uuid";
import { StringOfPlay, Pitch, Ball, BallPoints, ButtonController, Action, Arc, ArcController, Arrow, Selector, StringOfPlayController, LayerController, Clock } from "./components";
import {useActionEventContext } from "./contexts/ActionEventContext";
import { getElementFromObject, getAngle } from "./helpers";
import { PitchState, PitchLayerState, ArcState, StringOfPlayState, CurrentTeam, ActionType, PitchConfig, PitchColour, PitchPattern} from "./types";
import {
  FREE_KICK,
  KICK_OFF,
  CORNER,
  THROW_IN,
  GOAL_KICK,
  PENALTY,
  STRINGOFPLAY,
  ACTION_EVENTS,
  HOME_ENDPOINT_X,
  AWAY_ENDPOINT_X,
  CENTER_Y,
  CENTER_X,
  TOP_Y,
  BOTTOM_Y,
  HOME_TEAM,
  TEAM_OPTIONS,
  PITCH_COLOUR_OPTIONS,
  PITCH_PATTERN_OPTIONS
} from './constants';

const App: React.FC = () => {

  const [ currentTeam, setCurrentTeam ] = useState<CurrentTeam>(HOME_TEAM);
  const [ currentPitchConfig, setCurrentPitchConfig ] = useState<PitchConfig>({
    colour: "Green",
    pattern: "Stripes"
  });
  const [pitchState, setPitchState] = useState<PitchState>({
    ballPos: null,
    actionPos: null,
    stringOfPlay:[]
  });
  const [arcState, setArcState] = useState<ArcState | null>();
  const [stringOfPlayState, setStringOfPlayState] = useState<StringOfPlayState>({dashLength: 1000, animationDuration: 1});

  const [pitchLayerState, setPitchLayerState] = useState<PitchLayerState>({
    showArc: true,
    showArrow: true,
    ShowSOP: true,
    showBall: true,
    ShowPoints: true,
    showAction: true,
    showClock: true
  });

  const { currentAction, setCurrentAction } = useActionEventContext();

  const clickAreaHit = (e: MouseEvent<HTMLElement>) => {
    const newBallPosition = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      uuid: uuid.generate()
    };
    if (currentAction === STRINGOFPLAY) {
      const state = {
        ballPos: newBallPosition,
        stringOfPlay: [...pitchState.stringOfPlay, newBallPosition],
        actionPos: {
          x: newBallPosition.x + 10,
          y: 90,
          description: null
        }
      }
      setArcState(null);
      return setPitchState(state);
    }

    if ([
      KICK_OFF,
      CORNER,
      THROW_IN,
      GOAL_KICK,
      FREE_KICK,
      PENALTY].includes(currentAction)) {

      const { arc } = getElementFromObject(ACTION_EVENTS, currentAction as ActionType);
      if(!arc) return setCurrentAction(STRINGOFPLAY);
      const endPointX = currentTeam === HOME_TEAM ? HOME_ENDPOINT_X : AWAY_ENDPOINT_X;

      let newPitchState = {
        ballPos: null,
        stringOfPlay:[],
        actionPos: null
      };
      let newArcState = null;
      if (currentAction === FREE_KICK) {
        newArcState = {
          ...newBallPosition,
          ...arc,
          rotate: getAngle(newBallPosition.x, newBallPosition.y, endPointX, CENTER_Y, arc.degrees / 2)
        }
        newPitchState = Object.assign({
          ...newPitchState,
          ballPos: {
            ...newBallPosition
          },
          actionPos: {
            x: newBallPosition.x + 10,
            y: newBallPosition.y,
            description: FREE_KICK
          }
        })
      } else if (currentAction === KICK_OFF) {
        newArcState = {
          x: CENTER_X,
          y: CENTER_Y,
          ...arc,
          rotate: getAngle(CENTER_X, CENTER_Y, endPointX, CENTER_Y, arc.degrees / 2)
        }
        newPitchState = Object.assign({
          ...newPitchState,
          ballPos: {
            x: CENTER_X,
            y: CENTER_Y,
            uuid: uuid.generate()
          },
          actionPos: {
            x: currentTeam === HOME_TEAM ? newBallPosition.x - 10 : newBallPosition.x +10,
            y: 90,
            description: KICK_OFF
          }
        })
      } else if (currentAction === THROW_IN) {
        const yPos = newBallPosition.y > CENTER_Y ? BOTTOM_Y : TOP_Y;
        const xPos = newBallPosition.x;
        newArcState = {
          x: newBallPosition.x,
          y: yPos,
          ...arc,
          rotate: getAngle(xPos, yPos, endPointX, CENTER_Y, arc.degrees / 2)
        }
        newPitchState = Object.assign({
          ...newPitchState,
          ballPos: {
            x: xPos,
            y: yPos,
            uuid: uuid.generate()
          },
          actionPos: {
            x: currentTeam === HOME_TEAM ? newBallPosition.x - 20 : newBallPosition.x + 20,
            y: newBallPosition.y > CENTER_Y ? 130 : 70,
            description: THROW_IN
          }
        })

      } else if (currentAction === GOAL_KICK) {
        const yPos = newBallPosition.y > CENTER_Y ? BOTTOM_Y - 60 : TOP_Y + 60;
        const xPos = currentTeam === HOME_TEAM ? 30 : 275;
        newArcState = {
          x: xPos,
          y: yPos,
          ...arc,
          rotate: getAngle(xPos, yPos, endPointX, CENTER_Y, arc.degrees / 2)
        }
        newPitchState = Object.assign({
          ...newPitchState,
          ballPos: {
            x: xPos,
            y: yPos,
            uuid: uuid.generate()
          },
          actionPos: {
            x: currentTeam === HOME_TEAM ? newBallPosition.x - 20 : newBallPosition.x + 20,
            y: newBallPosition.y > CENTER_Y ? 70 : 130,
            description: GOAL_KICK
          }
        })

      } else if (currentAction === PENALTY) {
        const yPos = CENTER_Y
        const xPos = currentTeam === HOME_TEAM ?  255 : 50;
        newArcState = {
          x: xPos,
          y: yPos,
          ...arc,
          rotate: getAngle(xPos, yPos, endPointX, CENTER_Y, arc.degrees / 2)
        }
        newPitchState = Object.assign({
          ...newPitchState,
          ballPos: {
            x: xPos,
            y: yPos,
            uuid: uuid.generate()
          }
        })
      } else if (currentAction === CORNER) {
        const cornerEndPointX = currentTeam === HOME_TEAM ? HOME_ENDPOINT_X-60 : AWAY_ENDPOINT_X + 40;
        const yPos = newBallPosition.y > CENTER_Y ? BOTTOM_Y - 7 : TOP_Y;
        const xPos = currentTeam === HOME_TEAM ? 287 : 10;
        newArcState = {
          x: xPos,
          y: yPos,
          ...arc,
          rotate: getAngle(xPos, yPos, cornerEndPointX, CENTER_Y, arc.degrees / 2)
        }
        newPitchState = Object.assign({
          ...newPitchState,
          ballPos: {
            x: xPos,
            y: yPos,
            uuid: uuid.generate()
          }
        })

      }
      setPitchState(newPitchState);
      setArcState(newArcState)
    }

    return setCurrentAction(STRINGOFPLAY);
  }

  const teamChanged = useCallback((property: string, value: string) => {
    setCurrentTeam( value as CurrentTeam )
    const last = pitchState.stringOfPlay.length > 0 ?
      pitchState.stringOfPlay[pitchState.stringOfPlay.length -1] :
      null;

    setPitchState({
      ballPos: last,
      stringOfPlay: last ? [last] : [], 
      actionPos: last ? Object.assign({...last,y: 90, description: null}) : null
    });
    if(!last) {
      setArcState(null)
    }
  },[setCurrentTeam, setPitchState, pitchState]);

  const pitchChanged = useCallback((property: string, value: string) => {
    setCurrentPitchConfig({
      ...currentPitchConfig,
      [property]: value
    })
  },[setCurrentPitchConfig, currentPitchConfig])

  const { stringOfPlay, ballPos, actionPos } = pitchState;
  const colour = currentPitchConfig.colour as PitchColour;
  const pattern = currentPitchConfig.pattern as PitchPattern;
  const currentColour = getElementFromObject(PITCH_COLOUR_OPTIONS, colour).name
  const currentPattern = getElementFromObject(PITCH_PATTERN_OPTIONS, pattern).name
  const { showArc, showArrow, ShowSOP, showBall, ShowPoints, showAction, showClock} = pitchLayerState
  return (
    <div>
      <div className={css(styles.selectorHolder)}>
        <Selector
          options={TEAM_OPTIONS}
          changeProperty={teamChanged}
          currentSelection={currentTeam}
          property=""
          label="Team:"
        />
        <Selector
          options={PITCH_COLOUR_OPTIONS}
          changeProperty={pitchChanged}
          currentSelection={currentColour}
          property="colour"
          label={"Pitch Colour:"}
        />
        <Selector
          options={PITCH_PATTERN_OPTIONS}
          changeProperty={pitchChanged}
          currentSelection={currentPattern}
          property="pattern"
          label={"Pitch Pattern:"}
        />
      </div>

      <div className={css(styles.flexed)}>
        <div className={css(styles.seventy)}>
        <div className={css(styles.container)}>
        <div className={css(styles.pitchHolder)}>
          <div className={css(styles.abs)}>
              {showArc && arcState && <Arc {...arcState}/>}
          </div>
          {showArrow && !arcState &&
            pitchState.ballPos && (
              <Arrow
               x={
                currentTeam === HOME_TEAM
                  ? pitchState.ballPos.x + 20
                  : pitchState.ballPos.x - 360
                }
              />
            )}
          <div className={css(styles.abs)}>
              {ShowSOP && <StringOfPlay plays={stringOfPlay} {...stringOfPlayState}/>}
          </div>
          <div className={css(styles.abs)}>
            {ShowPoints && <BallPoints plays={stringOfPlay} />}
          </div>
          <div className={css(styles.abs)}>
            {showBall && ballPos && <Ball {...ballPos} ballColour={currentTeam === HOME_TEAM ? "red" : "blue"} />}
          </div>
          <div className={css(styles.abs)}>
              {showAction && actionPos &&
                <Action
                  home={currentTeam === HOME_TEAM}
                  text={currentTeam}
                  x={actionPos.x}
                  y={actionPos.y}
                  ballX={actionPos.x}
                  actionDescription={actionPos.description}
                />}
          </div>
          <div className={css(styles.abs)}>
            {showClock && <Clock />}
          </div>
          <div className={css(styles.abs)}>
              <div
                className={css(styles.clickArea)}
                onClick={(e: MouseEvent<HTMLElement>)=>clickAreaHit(e)}
              />
          </div>
            <Pitch 
              colour={getElementFromObject(PITCH_COLOUR_OPTIONS, colour).value}
              pattern={getElementFromObject(PITCH_PATTERN_OPTIONS, pattern).value}
            />
        </div>
      </div>
        </div>
        <div className={css(styles.thirty)}>
          <LayerController pitchLayerState={pitchLayerState} setPitchLayerState={setPitchLayerState}/>
        </div>
      </div>
      <div className={css(styles.flexed)}>
        <div className={css(styles.halved)}>
          <ButtonController />
        </div>
        <div className={css(styles.halved)}>
        {arcState ?
          <ArcController setArcState={setArcState} currentArcState={arcState} /> :
          <StringOfPlayController
            setStringOfPlayState={setStringOfPlayState}
            currentStringOfPlayState={stringOfPlayState}
        />}
        </div>
      </div>
    </div>
    )
  };


const styles = StyleSheet.create({
  container: {
      display: "flex",
      justifyContent: "center",
      background: "radial-gradient(#264f04, #264f04, #1d3d03)"
  },
  pitchHolder: {
    position: "relative",
    margin: "24px",
    overflow: "hidden"
  },
  abs: {
      position: "absolute",
      color: "white",
      height: "100%",
      width: "100%"
  },
  clickArea: {
    width: "100%",
    height: "100%",
    zIndex: 200
  },
  flexed: {
    display: "flex"
  },
  halved: {
    flex: "0 0 50%"
  },

  seventy: {
    flex: "0 1 70%",
    margin: "16px"
  },
  thirty: {
    flex: "1 1 30%",
    margin: "16px"
  },
  selectorHolder: {
    background: "#264f04",
    color: "white",
    fontFamily: "Helvetica",
    padding: "16px",
    display: "flex"
  }
});
export default App;
