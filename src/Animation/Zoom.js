import React from "react";
import PropTypes from "prop-types";
import { css, StyleSheet } from "aphrodite";

const getKeyframes = (scaleTo, scaleFrom) => ({
    from: {
        transform: `scale(${scaleFrom})`,
    },
    to: {
        transform: `scale(${scaleTo})`,
    },
});

const createAnimation = (scaleTo, scaleFrom = 1) =>
    StyleSheet.create({
        animation: {
            animationName: getKeyframes(scaleTo, scaleFrom),
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

const Zoom = ({
    factor,
    duration,
    timingFunction,
    delay,
    iterationCount,
    fillMode,
    children,
}) => {
    const styles = createAnimation(factor);
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

Zoom.propTypes = {
    factor: PropTypes.number,
    duration: PropTypes.number,
    timingFunction: PropTypes.string,
    delay: PropTypes.number,
    iterationCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fillMode: PropTypes.string,
    children: PropTypes.element,
};

Zoom.defaultProps = {
    factor: 2,
    duration: 1,
    timingFunction: "ease",
    delay: 0,
    iterationCount: 1,
    fillMode: "forwards",
};

export default Zoom;
