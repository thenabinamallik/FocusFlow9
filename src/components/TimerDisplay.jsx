import React from 'react';
export default function TimerDisplay({ secondsLeft, isFocus }) {
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="relative w-48 h-48 flex flex-col items-center justify-center rounded-full border-8 border-white/30 bg-white/10">
      <span className="text-4xl font-mono">
        {minutes}:{seconds}
      </span>
      <div className="text-sm uppercase tracking-wide text-white/70">
        {isFocus ? "Focus Session" : "Break Time"}
      </div>
    </div>
  );
}
