import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const LeetCode = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.357c.467-.467 1.125-.457 1.837-.457s1.357-.01 1.824.457l2.697 2.606" />
    <path d="M8.27 13.91l1.438 1.456c.467.467 1.125.42 1.837.42s1.357.046 1.824-.42l1.636-1.65" />
  </svg>
);
