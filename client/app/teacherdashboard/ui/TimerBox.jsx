import { useState, useEffect } from "react";

const TimerBox = () => {
  const totalTimeInSeconds = 3 * 60 * 60; // 3 hours
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when time reaches zero

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className="bg-white p-4 shadow-lg border border-gray-300 rounded-lg text-gray-800 mt-4">
      <h2 className="text-xl font-semibold text-center mb-2">Timer</h2>
      <div className="text-2xl font-bold text-center">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default TimerBox;
