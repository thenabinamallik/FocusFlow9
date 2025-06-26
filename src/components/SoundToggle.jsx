import React from 'react';
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle({ enabled, onToggle }) {
  const toggleSound = () => {
    setPlaySound((prev) => {
      const newSoundState = !prev;

      if (!newSoundState && dingRef.current) {
        dingRef.current.pause();
        dingRef.current.currentTime = 0;
      }

      return newSoundState;
    });
  };
  return (
    <button
      className="mt-4 text-sm flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full hover:bg-white/20"
      onClick={onToggle}
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      {enabled ? "Sound On" : "Sound Off"}
    </button>
  );
}
