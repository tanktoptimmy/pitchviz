import React from "react";
import { css, StyleSheet } from "aphrodite";


const Arrow:React.FC<Props> = ({ x }) => {
    const divStyle = {
        transform: `translate(${x}px)`,
    };
    return (
        <div className={css(styles.holder)}>
            <svg width="300" height="192">
                <g
                    className={css(styles.pos)}
                    style={divStyle}
                    fillOpacity="0.3"
                >
                    <path d="M0 0 L340 0 L320 96 L340 192 L0 192 20 96z" />
                </g>
            </svg>
        </div>
    );
};

type Props = {
  x: number
}

const styles = StyleSheet.create({
  holder: {
      position: "absolute",
  },
  pos: {
      transition: ".35s",
      transitionTimingFunction: "ease",
  },
});

export default Arrow;
