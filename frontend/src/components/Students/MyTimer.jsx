import React from "react";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";
function MyTimerComponent({ expiryTimestamp }) {
  const navigate = useNavigate();
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn("onExpire called");
      
      navigate("/");
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "40px" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  );
}

export default function MyTimer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
  return (
    <div>
      <MyTimerComponent expiryTimestamp={time} />
    </div>
  );
}
