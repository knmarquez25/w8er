import { useCallback, useEffect, useRef, useState } from "react";

const useRepeatLongPress = (
  action = () => {
    console.log("repeating your action");
  },
  longPressTriggerDelay = 2000,
  repeatInterval = 1000
) => {
  const [longPressed, setLongPressed] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [repeatAction, setRepeatAction] = useState();

  const actionRef = useRef(action);

  const startLongPress = () => {
    // setLongPressed(true);
    setStartTime(new Date().getTime());
    // setTimeout(() => setLongPressed(true), longPressTriggerDelay);
  };

  const endLongPress = () => {
    setEndTime(new Date().getTime());

    // setLongPressed(false);
  };

  useEffect(() => {
    if (actionRef) actionRef.current = action;
  });

  useEffect(() => {
    console.log("changed", longPressed);
    console.log("time", endTime, startTime, endTime - startTime);
    if (endTime - startTime > longPressTriggerDelay) {
      console.log("longpressed HELD");
      setRepeatAction(
        setInterval(() => {
          console.log("repeating");
          actionRef.current();
        }, repeatInterval)
      );
    } else {
      console.log("Longpressed RELEASED");

      if (repeatAction) {
        clearInterval(repeatAction);
      }
    }
  }, [endTime]);

  return {
    onMouseDown: (e) => startLongPress(),
    onTouchStart: (e) => startLongPress(),
    onMouseUp: (e) => endLongPress(),
    // onMouseLeave: (e) => endLongPress(),
    onTouchEnd: (e) => endLongPress(),
    onClick: (e) => actionRef.current(),
  };
};

export default useRepeatLongPress;
