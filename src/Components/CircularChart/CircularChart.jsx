import React from 'react';

export default function CircularChart({ percentage, color }) {
  // Détermine la couleur du cercle en fonction du pourcentage
  const circleColor = color || 'blue'; // Utilisez la couleur passée ou une couleur par défaut

  return (
    <svg viewBox="0 0 36 36" className={`circular-chart ${circleColor}`}>
      <path
        className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="circle"
        strokeDasharray={`${percentage}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" className="percentage">
        {percentage.toFixed(0)}%
      </text>
    </svg>
  );
}
