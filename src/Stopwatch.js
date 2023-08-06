import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (milliseconds === 999) {
          if (seconds === 59) {
            if (minutes === 59) {
              setHours((prevHours) => prevHours + 1);
              setMinutes(0);
            } else {
              setMinutes((prevMinutes) => prevMinutes + 1);
            }
            setSeconds(0);
          } else {
            setSeconds((prevSeconds) => prevSeconds + 1);
          }
          setMilliseconds(0);
        } else {
          setMilliseconds((prevMilliseconds) => prevMilliseconds + 1);
        }
      }, 1); // Update every millisecond
    }
    return () => clearInterval(intervalId);
  }, [isRunning, milliseconds, seconds, minutes, hours]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    const lapTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  return (
    <div className="my-3 p-3 border rounded">
      <h2>Stopwatch</h2>
      <h3>{`${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
        .toString()
        .padStart(3, "0")}`}</h3>
      <div className="btn-group">
        <Button variant="primary" onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button variant="warning" onClick={handlePause} disabled={!isRunning}>
          Pause
        </Button>
        <Button variant="danger" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="success" onClick={handleLap} disabled={!isRunning}>
          Lap
        </Button>
      </div>
      {laps.length > 0 && (
        <div className="mt-3">
          <h4>Laps:</h4>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{lap}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
