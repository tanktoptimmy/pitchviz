import React, {useCallback} from "react";
import { css, StyleSheet } from "aphrodite";
import { Ranger } from "../";
import { ArcState } from "../../types"

const ArcController: React.FC<Props> = ({
  currentArcState,
  setArcState
}) => {

  const changeProperty = useCallback((property: string, num: number) => {
    setArcState({
      ...currentArcState,
      [property]: num
    })
  },[setArcState, currentArcState])
  const {degrees, rotate, radius} = currentArcState;
  return (
    <div className={css(styles.bg)}>
      <div className={css(styles.rangeHolder)}>
        <div className={css(styles.circle)}>{degrees? degrees : ""}</div>
        <div className={css(styles.holder)}>
          <h2 className={css(styles.title)}>Degrees (width of arc)</h2>
          <Ranger max={359} min={0} property="degrees" changeProperty={changeProperty} num={degrees? degrees : null}/>
        </div>
      </div>
      <div className={css(styles.rangeHolder)}>
        <div className={css(styles.circle)}>{rotate? rotate : ""}</div>
        <div className={css(styles.holder)}>
          <h2 className={css(styles.title)}>Rotation (which way is it facing)</h2>
          <Ranger max={359} min={-359} property="rotate" changeProperty={changeProperty} num={rotate? rotate : null}/>
        </div>
      </div>
      <div className={css(styles.rangeHolder)}>
        <div className={css(styles.circle)}>{radius? radius : ""}</div>
        <div className={css(styles.holder)}>
          <h2 className={css(styles.title)}>Radius (how long is the circle)</h2>
          <Ranger max={320} min={0} property="radius" changeProperty={changeProperty} num={radius? radius : null}/>
        </div>
      </div>
    </div>
)};


type Props = {
  currentArcState: ArcState
  setArcState: (arc: ArcState) => void
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

export default ArcController;
