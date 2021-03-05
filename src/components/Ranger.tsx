import React, {ChangeEvent, useCallback} from "react";

const Ranger: React.FC<Props> = ({
  num,
  property,
  changeProperty,
  min,
  max
}) => {

  const sliderValueChanged = useCallback(val => {
    changeProperty(property, val.nativeEvent.target.value)
  },[changeProperty, property]);

  const initialValue = num ? num : 1;
  return (
    <input
      type="range"
      disabled={!num}
      value={initialValue}
      max={max}
      min={min}
      onChange={(e: ChangeEvent) => sliderValueChanged(e)}
      />
  )
}

type Props = {
  min: number
  max: number
  num: number | null
  property: string
  changeProperty: (property: string, num: number) => void
}

export default Ranger;
