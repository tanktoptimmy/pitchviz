import { useState, useEffect } from 'react';
import { css, StyleSheet } from "aphrodite";

const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());
 useEffect(() => {
  var timerID = setInterval( () => tick(), 1000 );

  return () => clearInterval(timerID);
 });

  const tick = () => setDate(new Date());
  return (
  <div className={css(styles.holder)}>
      <div className={css(styles.clock)}>{date.toLocaleTimeString('en-GB', {minute:'2-digit', second: '2-digit'})}</div>
  </div>
)};

const styles = StyleSheet.create({
  holder: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  clock: {
    fontSize: "11px",
    borderRadius: "4px",
    backgroundColor: "rgba(0,0, 0,0.3)",
    color: "white",
    fontFamily: "sans-serif",
    padding: "4px",
    marginTop: "4px",
    width: "30px"
  }
});


export default Clock;
