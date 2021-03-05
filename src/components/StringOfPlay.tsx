import { css, StyleSheet } from "aphrodite";
import {Pos} from "../types";

const StringOfPlay: React.FC<Props> = ({plays, dashLength, animationDuration = 1}) => {
  const createStringOfPlay = (plays: Pos[]) =>{
    return plays.map((play, index) => {
      const { uuid, x, y } = play;
      if (index === 0) return null;
      const opacity = (plays.length - index) * 0.2;
      if (1 - opacity <= 0) {
        return null;
      }
      const motion = index === plays.length - 1 ? styles.motion : styles.dashed;
      const { x: x0, y: y0 } = plays[index - 1];
      const path = `M${x0} ${y0} L${x} ${y}`;
      const motionStyles =
        index === plays.length - 1 ? {
          strokeDasharray: dashLength,
          animationDuration: `${animationDuration}s`,
        }: {}
      return (
        <path
          className={css(motion)}
          style={motionStyles}
          key={uuid}
          d={path}
          stroke="#fff"
          strokeWidth="1"
          opacity={1 - opacity}
        />
      );
    });
  }
  return (
    <svg width="100%" height="100%">
      {plays.length && createStringOfPlay(plays)}
    </svg>
  )
}

const styles = StyleSheet.create({
  motion: {
    animationTimingFunction: "ease-out",
    animationName: {
      '0%': {
        strokeDashoffset: "1000",
      },
      '100%': {
        strokeDashoffset: "0",
      }
    },
    animationFillMode: "forwards",
    animationIterationCount: 1
  },
  dashed:{
    strokeDasharray: "1",
  }
});

type Props = {
  plays: Pos[]
  dashLength: number,
  animationDuration?: number
}
export default StringOfPlay;
