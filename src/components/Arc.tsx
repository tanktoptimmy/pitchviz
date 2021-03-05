import React from "react";
import { css, StyleSheet } from "aphrodite";

const polarToCartesian = (centerX: number, centerY: number, radius:number, angleInDegrees:number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

const describeSlice = (x: number, y: number, radius: number, startAngle: number, endAngle: number):string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M",
        0,
        0,
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
    ].join(" ");

    return d;
};

const path = (degrees = 90, radius = 10) =>
    `${describeSlice(0, 0, radius, 0, degrees)}Z`;

export const Arc: React.FC<Props> = ({ radius, degrees, x, y, rotate }) => (
    <svg width="100%" height="100%">
        <defs>
            <clipPath id="arc-mask">
                <circle
                    transform={`translate(${x},${y})`}
                    r={radius}
                    className={css(styles.radiusMotion)}
                />
            </clipPath>
        </defs>
        <g
            className={css(styles.alphaMotion)}
            transform={`translate(${x},${y}) rotate(${rotate})`}
            clipPath="url(#arc-mask)"
            fill="#fff"
        >
            <path d={path(degrees, radius)} opacity="0.3" />
            <path d={path(degrees, radius - radius * 0.333)} opacity="0.3" />
            <path d={path(degrees, radius - radius * 0.666)} opacity="0.3" />
        </g>
    </svg>
);

const keyframes = {
  "0%": {
      transform: "scale(0)",
  },
  "96%": {
      transform: "scale(1)",
  },
};

const keyframesAlpha = {
  "0%": {
      opacity: "1",
  },
  "50%": {
      opacity: "1",
  },
  "100%": {
      opacity: "0",
  },
};

type Props = {
  radius: number
  degrees: number
  x: number
  y: number
  rotate: number
}

const styles = StyleSheet.create({
  radiusMotion: {
      animationDuration: "3s",
      animationIterationCount: "infinite",
      animationName: keyframes,
      transitionTimingFunction: "ease",
  },
  alphaMotion: {
      animationDuration: "3s",
      animationIterationCount: "infinite",
      animationName: keyframesAlpha,
      transitionTimingFunction: "ease",
  },
});

export default Arc;
