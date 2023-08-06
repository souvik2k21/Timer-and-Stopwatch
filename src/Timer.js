import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
          setIsRunning(false);
          return;
        }

        if (seconds === 0 && minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (seconds === 0 && minutes === 0 && hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, hours]);

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
  };

  return (
    <div className="my-3 p-3 border rounded">
      <h2>Timer</h2>
      <Form>
        <Form.Group controlId="formHours">
          <Form.Label>Hours</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </Form.Group>
        <Form.Group controlId="formMinutes">
          <Form.Label>Minutes</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </Form.Group>
        <Form.Group controlId="formSeconds">
          <Form.Label>Seconds</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </Form.Group>
      </Form>
      <h3>{`${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h3>
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
      </div>
    </div>
  );
};

export default Timer;
