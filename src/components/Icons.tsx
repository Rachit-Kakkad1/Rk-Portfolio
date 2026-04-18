import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Authentic LeetCode Icon (Official Filled Version)
 * Same to same as original, but styled with currentColor
 */
export const LeetCode = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.953l-4.581-4.581a1.384 1.384 0 0 1 0-1.953l3.903-3.903a1.384 1.384 0 0 1 1.953 0l4.582 4.582c.54.54 1.414.54 1.953 0l2.392-2.396c2.207-2.211 2.239-5.815.074-8.063l-.038-.039-4.193-4.277A5.938 5.938 0 0 0 18.67.349a5.83 5.83 0 0 0-1.017-.349 5.527 5.527 0 0 0-2.362-.062 5.35 5.35 0 0 0-.513.125 5.266 5.266 0 0 0-1.295 1.209L13.483 0z"/>
  </svg>
);

/**
 * Official X (formerly Twitter) Icon
 */
export const XIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);
