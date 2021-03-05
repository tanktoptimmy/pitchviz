import React from "react";
import PropTypes from "prop-types";
import { css, StyleSheet } from "aphrodite";

const getKeyframes = (rotateTo, rotateFrom) => ({
    from: {
        transform: `rotate(${rotateFrom}deg)`,
    },
    to: {
        transform: `rotate(${rotateTo}deg)`,
    },
});

const createAnimation = (rotateTo, rotateFrom) =>
    StyleSheet.create({
        animation: {
            animationName: getKeyframes(rotateTo, rotateFrom),
        },
    });

const getAnimationSettings = (
    duration,
    timingFunction,
    delay,
    iterationCount,
    fillMode
) => ({
    animationDuration: `${duration}s`,
    animationTimingFunction: timingFunction,
    animationDelay: `${delay}s`,
    animationIterationCount: iterationCount,
    animationFillMode: fillMode,
});

const Rotate = ({
    from,
    to,
    duration,
    timingFunction,
    delay,
    iterationCount,
    fillMode,
    children,
}) => {
    const styles = createAnimation(to, from);
    return (
        <div
            className={css(styles.animation)}
            style={getAnimationSettings(
                duration,
                timingFunction,
                delay,
                iterationCount,
                fillMode
            )}
        >
            {children}
        </div>
    );
};

Rotate.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    duration: PropTypes.number,
    timingFunction: PropTypes.string,
    delay: PropTypes.number,
    iterationCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fillMode: PropTypes.string,
    children: PropTypes.element,
};

Rotate.defaultProps = {
    from: 0,
    to: 0,
    duration: 1,
    timingFunction: "ease",
    delay: 0,
    iterationCount: 1,
    fillMode: "forwards",
};

export default Rotate;
