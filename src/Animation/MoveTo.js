import PropTypes from "prop-types";
import { css, StyleSheet } from "aphrodite";

const getKeyframes = (axis, translateTo, translateFrom) => ({
    from: {
        transform: `translate${axis}(${translateFrom})`,
    },
    to: {
        transform: `translate${axis}(${translateTo})`,
    },
});

const createAnimation = (axis, translateTo, translateFrom) =>
    StyleSheet.create({
        animation: {
            animationName: getKeyframes(axis, translateTo, translateFrom),
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

const MoveTo = ({
    axis,
    from,
    to,
    duration,
    timingFunction,
    delay,
    iterationCount,
    fillMode,
    children,
}) => {
    const styles = createAnimation(axis, to, from);
    return (
        <div data-name="moveTo"
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

MoveTo.propTypes = {
    axis: PropTypes.string,
    duration: PropTypes.number,
    timingFunction: PropTypes.string,
    delay: PropTypes.number,
    iterationCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fillMode: PropTypes.string,
    children: PropTypes.element,
};

MoveTo.defaultProps = {
    axis: "X",
    from: 0,
    to: 0,
    duration: 1,
    timingFunction: "ease",
    delay: 0,
    iterationCount: 1,
    fillMode: "forwards",
};

export default MoveTo;
