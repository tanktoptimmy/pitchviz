import React, {useCallback} from "react";
import { css, StyleSheet } from "aphrodite";
import { Ranger } from "../";
import { StringOfPlayState } from "../../types"

const StringOfPlayController: React.FC<Props> = ({
  currentStringOfPlayState,
  setStringOfPlayState
}) => {

  const changeProperty = useCallback((property: string, num: number) => {
    setStringOfPlayState({
      ...currentStringOfPlayState,
      [property]: num
    })
  },[setStringOfPlayState, currentStringOfPlayState])
  const {dashLength, animationDuration} = currentStringOfPlayState;
  return (
    <div className={css(styles.bg)}>
      <div className={css(styles.rangeHolder)}>
        <div className={css(styles.circle)}>{dashLength? dashLength : ""}</div>
        <div className={css(styles.holder)}>
          <h2 className={css(styles.title)}>Dash Length</h2>
          <Ranger max={1000} min={0} property="dashLength" changeProperty={changeProperty} num={dashLength? dashLength : null}/>
        </div>
      </div>
      <div className={css(styles.rangeHolder)}>
        <div className={css(styles.circle)}>{animationDuration? animationDuration : ""}</div>
        <div className={css(styles.holder)}>
          <h2 className={css(styles.title)}>Animation Duration</h2>
          <Ranger max={10} min={1} property="animationDuration" changeProperty={changeProperty} num={animationDuration? animationDuration : null}/>
        </div>
      </div>
    </div>
)};


type Props = {
  currentStringOfPlayState: StringOfPlayState
  setStringOfPlayState: (stringOfPlay: StringOfPlayState) => void
}

const styles = StyleSheet.create({
  bg: {
    margin: "16px",
    flex: "1 1 auto",
    fontSize: "12px",
    fontFamily: "Helvetica",
    color: "white"
  },
  circle: {
    border: "3px solid #006400",
    borderRadius: "20px",
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px"
  },
  title: {
    fontSize: "12px",
    fontWeight: "normal"
  },
  holder: {
    padding: "0 8px"
  },
  rangeHolder: {
    display: "flex",
    marginBottom: "16px"
  }
});

export default StringOfPlayController;
