import React from 'react';
export default function DurationSlider({ label, value, min, max, onChange }) {
  return (
    <div className="text-center">
      <label className="block mb-1 font-semibold">{label} Duration</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={1}
        className="w-32"
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <div className="text-sm mt-1">{value} min</div>
    </div>
  );
}
