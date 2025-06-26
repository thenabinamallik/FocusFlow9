import React from 'react';
import { Play, Pause, SkipForward } from "lucide-react";


export default function Controls({ isRunning, onStart, onPause, onSkip }) {
  return (
    <div className="flex gap-4 mt-6">
      <button
        className="bg-white text-indigo-700 px-4 py-2 rounded-lg shadow font-semibold flex items-center gap-2"
        onClick={isRunning ? onPause : onStart}
      >
        {isRunning ? <Pause /> : <Play />}
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white flex items-center gap-2"
        onClick={onSkip}
      >
        <SkipForward /> Skip
      </button>
    </div>
  );
}
