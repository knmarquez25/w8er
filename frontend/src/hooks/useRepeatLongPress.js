import { useCallback, useEffect, useRef, useState } from "react";

const useRepeatLongPress = (
  action = () => {
    console.log("repeating your action");
  },
  repeatInterval = 1000,
  longPressTriggerDelay = 2000
) => {
  const [longPressed, setLongPressed] = useState(false);
  const [repeatAction, setRepeatAction] = useState();

  const actionRef = useRef(action);

  const startLongPress = () => {
    setLongPressed(true);
    // setTimeout(() => setLongPressed(true), longPressTriggerDelay);
  };

  const endLongPress = () => {
    setLongPressed(false);
  };

  useEffect(() => {
    if (actionRef) actionRef.current = action;
  });

  useEffect(() => {
    // console.log("changed", longPressed);
    if (longPressed) {
      // console.log("longpressed HELD");
      setRepeatAction(
        setInterval(() => {
          // console.log("repeating");
          actionRef.current();
        }, repeatInterval)
      );
    } else {
      // console.log("Longpressed RELEASED");

      if (repeatAction) {
        clearInterval(repeatAction);
      }
    }
  }, [longPressed]);

  return {
    onMouseDown: (e) => startLongPress(),
    onTouchStart: (e) => startLongPress(),
    onTouchStart: (e) => actionRef.current(),
    onMouseUp: (e) => endLongPress(),
    onMouseLeave: (e) => endLongPress(),
    // onTouchEnd: (e) => endLongPress(),
    onClick: (e) => actionRef.current(),
  };
};

export default useRepeatLongPress;
