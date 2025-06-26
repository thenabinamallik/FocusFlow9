import React from "react";
import { useState, useEffect, useRef } from "react";
import TimerDisplay from "./components/TimerDisplay";
import DurationSlider from "./components/DurationSlider";
import Controls from "./components/Controls";
import SoundToggle from "./components/SoundToggle";
import SessionStats from "./components/SessionStats";
import dingSrc from "./sound/notification.mp3";

export default function App() {
  const [focusDuration, setFocusDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(focusDuration * 60);
  const [isFocus, setIsFocus] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [playSound, setPlaySound] = useState(true);
  const [stats, setStats] = useState({ today: 0, week: 0 });

  const intervalRef = useRef(null);

  const switchSession = () => {
    const newIsFocus = !isFocus;
    const newSeconds = (newIsFocus ? focusDuration : breakDuration) * 60;

    setIsFocus(newIsFocus);
    setSecondsLeft(newSeconds);

    if (newIsFocus) {
      setStats((prev) => ({
        today: prev.today + 1,
        week: prev.week + 1,
      }));
    }

    if (playSound) {
      playDingNTimes(3); 
    }
  };

  const playDingNTimes = (n) => {
    let count = 0;
    const ding = new Audio(dingSrc);

    const play = () => {
      if (count < n) {
        const clone = ding.cloneNode();
        clone.play();
        count++;
        clone.onended = play;
      }
    };

    play();
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            switchSession();
            return (isFocus ? breakDuration : focusDuration) * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isFocus, focusDuration, breakDuration]);

  const resetTimer = () => {
    setSecondsLeft((isFocus ? focusDuration : breakDuration) * 60);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2">FocusFlow9</h1>
      <p className="mb-6 text-lg opacity-80">
        Boost productivity with focused work sessions
      </p>

      <TimerDisplay secondsLeft={secondsLeft} isFocus={isFocus} />

      <div className="flex gap-4 mt-6">
        <DurationSlider
          label="Focus"
          value={focusDuration}
          min={5}
          max={60}
          onChange={(v) => {
            setFocusDuration(v);
            if (!isRunning && isFocus) setSecondsLeft(v * 60);
          }}
        />
        <DurationSlider
          label="Break"
          value={breakDuration}
          min={1}
          max={15}
          onChange={(v) => {
            setBreakDuration(v);
            if (!isRunning && !isFocus) setSecondsLeft(v * 60);
          }}
        />
      </div>

      <Controls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onSkip={() => {
          setIsFocus((prev) => !prev);
          resetTimer();
        }}
      />

      <SoundToggle
        enabled={playSound}
        onToggle={() => setPlaySound(!playSound)}
      />

      <SessionStats stats={stats} />
    </main>
  );
}
