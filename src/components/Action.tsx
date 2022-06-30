import React, { useState, useRef, useLayoutEffect } from "react";
import { css, StyleSheet } from "aphrodite";


function getDesc(home: boolean, x: number) {
    if (home) {
        if (x > 220) {
            return "Dangerous Attack";
        }
        if (x > 160) {
            return "Attack";
        }
        return "In Possession";
    }
    if (x < 80) {
        return "Dangerous Attack";
    }
    if (x < 160) {
        return "Attack";
    }
    return "In Possession";
}

const Action:React.FC<Props> = ({x, y, home, text, ballX, actionDescription}) =>  {

  const [actionWidth, setActionWidth] = useState(1)
  const textRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);


    useLayoutEffect(() => {
      if (textRef.current && descRef.current) {
        const width = Math.max(
          textRef.current.offsetWidth,
          descRef.current.offsetWidth
        );
        setActionWidth(width + 20)
      }
    },[textRef, descRef, x, y, actionDescription, home, ballX])

        let xPos = x;
        if (home) {
            xPos = x - actionWidth;
            if (xPos < -10) xPos = -10;
        } else if (xPos + actionWidth > 268) {
            xPos = 268 - actionWidth;
        }
        const divStyle = {
            transform: `translate(${xPos}px, ${y - 79}px)`,
        };
        const blockStyle = {
            transform: `translate(${home ? actionWidth : 0}px) rotate(${
                home ? 0 : 360
            }deg)`,
        };
        return (
            <div className={css(styles.actionHolder)} style={divStyle}>
                <div className={css(styles.block)} style={blockStyle} />
                <span ref={textRef} className={css(styles.text)}>
                    {text}
                </span>
                <span ref={descRef} className={css(styles.desc)}>
                    {actionDescription
                        ? actionDescription
                        : getDesc(home, ballX)}
                </span>
            </div>
        );
}

type Props ={
  x:number
  y: number
  home: boolean
  text: string
  ballX: number
  actionDescription: string | null
}

const styles = StyleSheet.create({
  actionHolder: {
      width: "auto",
      display: "inline-block",
      margin: "auto",
      position: "relative",
      textAlign: "left",
      fontSize: "16px",
      top: "57px",
      transition: ".35s",
      transitionTimingFunction: "ease",
  },
  block: {
      background: "white",
      position: "absolute",
      left: "0",
      top: "-3px",
      height: "45px",
      width: "3px",
      transition: ".35s",
      transitionTimingFunction: "ease",
  },
  text: {
      fontFamily: "SkyRegular, Arial, sans-serif",
      fontSize: "14px",
      marginLeft: "12px",
      display: "inline",
      ":after": {
          display: "block",
          width: "2px",
          content: "''",
      },
  },
  desc: {
      position: "relative",
      fontFamily: "SkyMedium, Arial, sans-serif",
      marginLeft: "12px",
      display: "inline"
  },
  home: {
      transform: "rotate(360deg)",
  },
});

export default Action;
