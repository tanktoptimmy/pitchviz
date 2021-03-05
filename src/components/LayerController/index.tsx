import React from "react";
import { css, StyleSheet } from "aphrodite";
import { Checker } from "../"
import {getElementFromObject } from "../../helpers";
import { PitchLayerState, PitchLayerType } from "../../types";
const LayerController: React.FC<Props> =  ({pitchLayerState, setPitchLayerState}) => {
  const changeProperty = (property:string, value:boolean) => {
    setPitchLayerState({
      ...pitchLayerState,
      [property]: value
    })
  }
  return (
    <div className={css(styles.holder)}>
      <h3 className={css(styles.h3)}>Layer Controller</h3>
      {Object.keys(pitchLayerState).map(key => 
        <div key={key} className={css(styles.checkHolder)}>
          <Checker
          value={getElementFromObject(pitchLayerState, key as PitchLayerType)}
          property={key}
          changeProperty={changeProperty}
        />
        </div>
      )}
    </div>
  )
};

const styles = StyleSheet.create({
  holder: {
  backgroundColor: "rgba(255,255,255,0.2)",
  margin: "0 16px",
  padding: "8px 16px",
  },
  checkHolder: {
    paddingBottom: "8px"
  },
  h3: {
    color: "white",
    fontFamily: "SkyMedium",
    margin: "0 0 16px 0",
    padding: 0,
    textAlign: "center"
  }

});

type Props ={
  pitchLayerState: PitchLayerState
  setPitchLayerState: any
}

export default LayerController;
