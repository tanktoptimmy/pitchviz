import React from "react";
import { css, StyleSheet } from "aphrodite";
import Button from "./Button";
import { ACTION_EVENTS } from "../../constants";
import {useActionEventContext } from "../../contexts/ActionEventContext";
import { getElementFromObject } from "../../helpers"
import { ActionType } from "../../types";



const ButtonController: React.FC<Props> = () => {

    const { currentAction, setCurrentAction } = useActionEventContext();

    return (
    <div className={css(styles.buttons)}>
            {/* <Selector
                selectHomeOrAway={selectHomeOrAway}
                pendingHomeOrAway={pendingHomeOrAway}
            /> */}
            <div className={css(styles.buttonHolder)}>
                {Object.keys(ACTION_EVENTS).map(event => {
                    const { name } = getElementFromObject(ACTION_EVENTS, event as ActionType);
                    return (
                    <Button
                        key={name}
                        buttonClick={setCurrentAction}
                        text={name}
                        pendingEvent={currentAction}
                    />
                )})}
            </div>
        </div>
)};


const styles = StyleSheet.create({
    buttons: {
        margin: "16px 0",
    },
    buttonHolder: {
        display: "grid",
        margin: "12px",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "12px",
    },
});

type Props = {

}

export default ButtonController;
