import React, { useEffect, useState } from 'react';
import './App.css';

const COUNTDOWN_TARGET = new Date("2024-10-21T04:07:00");

const getTimeleft = () => {
  const totalTimeLeft = COUNTDOWN_TARGET - new Date();
  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((totalTimeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const CountdownBox = ({ value, label }) => {
  return (
    <div className="time-box card">
      <div className="time-value">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="time-label">{label}</div>
    </div>
  );
};

const Countdown = () => {
  const [timeleft, setTimeleft] = useState(getTimeleft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeleft(getTimeleft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const isFinished = timeleft.days <= 0 && timeleft.hours <= 0 && timeleft.minutes <= 0 && timeleft.seconds <= 0;

  return (
    <div className="countdown">
      <CountdownBox value={isFinished ? '00' : timeleft.days} label="Days" />
      <CountdownBox value={isFinished ? '00' : timeleft.hours} label="Hours" />
      <CountdownBox value={isFinished ? '00' : timeleft.minutes} label="Minutes" />
      <CountdownBox value={isFinished ? '00' : timeleft.seconds} label="Seconds" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Countdown />
    </div>
  );
}

export default App;
