import React, { useCallback } from "react";
import { css, StyleSheet } from "aphrodite";

const Checker: React.FC<Props> = ({
  value,
  property,
  changeProperty,
}) => {

  const valueChanged = useCallback(val => {
    changeProperty(property, val.nativeEvent.target.checked)
  },[changeProperty, property]);
  return (

    <>
      <input
      type="checkbox"
      checked={value}
      onChange={valueChanged}
      />
    <label className={css(styles.label)} htmlFor={property}>{property}</label>
    </>
  )
}

type Props = {
  value: boolean
  property: string
  changeProperty: (property: string, value: boolean) => void
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "SkyRegular",
    color: "white",
    position: "relative",
    paddingLeft: "8px",
    fontSize: "16px",
    textTransform: "capitalize"
  }
})

export default Checker;
