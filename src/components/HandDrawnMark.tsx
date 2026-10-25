export function HandDrawnMark() {
  return <svg className="wordmark__initials" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <circle cx="32" cy="32" r="32" fill="#f5f0e5" />
    <g fill="none" stroke="#943c2d" strokeLinecap="round" strokeLinejoin="round">
      <path className="mark-stroke" pathLength="1" strokeWidth="3.1" d="M9.5 19.5c1.5 8.2 2.8 16.5 5.4 25.2 2.5-6.5 4-13.2 6.3-20.1 1.8 7.2 3.8 14.2 6.2 20.3 2-8.4 3.5-17 5.2-25.1" />
      <path className="mark-stroke mark-stroke--r" pathLength="1" strokeWidth="3.1" d="M39.4 45.1c-.2-8.5.4-17.3.1-25.9 7.6-1.1 14.2.9 14.1 7.3-.1 5.3-6.1 7.7-13.8 7.1m6.2-.5c3 4.1 5.3 7.5 9 12.2" />
      <path className="mark-stroke mark-stroke--echo" pathLength="1" strokeWidth=".8" opacity=".38" d="m10.7 20.2 4.7 24m24.9-24.1-.1 24m6.6-10.2 7.6 10.1" />
    </g>
  </svg>;
}
