
import React from 'react';

export const TeamsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 16v-4a2 2 0 0 0-2-2h-4"></path>
    <path d="M7 20l10 0"></path>
    <path d="M14 16v-11"></path>
    <path d="M10 12v-8"></path>
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <path d="M12 12h.01"></path>
    <path d="M17 12h.01"></path>
  </svg>
);
