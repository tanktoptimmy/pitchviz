import React, { createContext, FC, useContext, useState } from "react";

const ActionEventContext = createContext<ActionState | undefined>(undefined);

export const ActionEventContextProvider: FC<Props> = ({
  initialAction,
  children
}) => {
  const [currentAction, setCurrentAction] = useState<string>(
    initialAction
  );
  return (
    <ActionEventContext.Provider
      value={{
        currentAction,
        setCurrentAction
      }}
    >
      {children}
    </ActionEventContext.Provider>
  );
};

export function useActionEventContext(): ActionState {
  const context = useContext(ActionEventContext);
  if (context === undefined) {
    throw new Error(
      "useActionEventContext must be rendered in a tree within a ActionEventContextProvider"
    );
  }
  return context;
}

interface Props {
  initialAction: string;
}

interface ActionState {
  currentAction: string;
  setCurrentAction: (Action: string) => void;
}
