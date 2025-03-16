import { keyframes, css } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const animationMixins = {
  fadeIn: css`
    animation: ${fadeIn} 0.5s ease;
  `,
  slideUp: css`
    animation: ${slideUp} 0.5s ease;
  `,
  bounce: css`
    animation: ${bounce} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `,
  spin: css`
    animation: ${spin} 1s linear infinite;
  `,
  shimmer: css`
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  `
};