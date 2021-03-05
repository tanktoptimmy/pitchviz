import React, { useCallback } from "react";
import { css, StyleSheet } from "aphrodite";

import {SelectorOptions} from "../types";
const Selector: React.FC<Props> = ({options, changeProperty, currentSelection, label, property}) => {

  const valueChange = useCallback(val => {
    changeProperty(property, val.nativeEvent.target.value)
  },[changeProperty, property]);

  return (
  <form className={css(styles.formStyle)}>
    <label>
      <span className={css(styles.label)}>{label}</span>
      <select
        value={currentSelection}
        onChange={valueChange}
        className={css(styles.selector)}
      >
        {Object.keys(options).map(key => 
          <option
            key={key}
            value={options[key].name}>
              {options[key].name}
          </option>
        ) }
      </select>
    </label>
  </form>
)};

type Props = {
    options: SelectorOptions
    changeProperty: (property: string, value: string) => void
    property: string
    currentSelection: string
    label: string
}

const styles = StyleSheet.create({
    formStyle: {
        margin: "0 16px"
    },
    label: {
        paddingRight: "16px"
    },
    selector:{
      padding: "8px",
      borderRadius: "8px",
      fontFamily: "SkyRegular"
    }
})

export default Selector
