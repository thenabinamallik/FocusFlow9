import React from 'react';
export default function SessionStats({ stats }) {
  return (
    <div className="mt-8 text-sm text-white/70 text-center">
      <div>Today: {stats.today} sessions</div>
      <div>This week: {stats.week} sessions</div>
    </div>
  );
}
