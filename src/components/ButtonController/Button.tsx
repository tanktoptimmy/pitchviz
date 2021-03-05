import React from "react";
import { css, StyleSheet } from "aphrodite";

const Button: React.FC<Props> =  ({ text, buttonClick, pendingEvent }) => (
    <button
        type="button"
        onClick={() =>
            buttonClick(text)
        }
        className={css(
            styles.button,
            text === pendingEvent
                ? styles.selected
                : null
        )}
    >
        {text}
    </button>
);

type Props = {
    text: string;
    buttonClick: (text: string) => void;
    pendingEvent: string
}

const styles = StyleSheet.create({
    button: {
        color: "#fff",
        backgroundColor: "#5bc0de",
        borderColor: "#46b8da",
        display: "inline-block",
        padding: "6px 12px",
        marginBottom: "0",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "1.42857143",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        touchAction: "manipulation",
        cursor: "pointer",
        userSelect: "none",
        backgroundImage: "none",
        border: "1px solid transparent",
        borderRadius: "4px",
    },
    selected: {
        backgroundColor: "red",
    },
});

export default Button;
