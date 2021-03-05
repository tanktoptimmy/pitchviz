import { css, StyleSheet } from "aphrodite";

const Ball: React.FC<Props> = ({ x, y, ballColour = "red" }) => (
    <div className={css(styles.ballHolder)}>
        <svg width="100%" height="100%">
            <circle
                className={css(styles.ballMotion)}
                cx={x}
                cy={y}
                r="3"
                fill={ballColour}
            />
            <circle
                className={css(styles.ballMotion, styles.radiusMotion)}
                cx={x}
                cy={y}
                r="3"
                strokeWidth="3"
                stroke="#fff"
                strokeOpacity="0.5"
                fill="transparent"
            />
        </svg>
    </div>
);

type Props = {
  x: number
  y: number
  ballColour?: string
}

const keyframes = {
  from: {
      r: "3",
      opacity: "1",
  },
  to: {
      r: "12",
      opacity: "0",
  },
};

const styles = StyleSheet.create({
  ballHolder: {
    height: "100%",
    width: "100%"
  },
  ballMotion: {
      transition: "0.15s ease-in",
  },

  radiusMotion: {
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: keyframes,
      transitionTimingFunction: "ease",
  },
});


export default Ball;
