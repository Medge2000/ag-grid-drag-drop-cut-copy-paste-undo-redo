import { RefObject } from "react";
import { throttle } from "lodash";

const tiltDegrees = 10;
const perspective = 1000;

export const handleMouseMove = (buttonRefs: RefObject<(HTMLElement | null)[]>) => {
  return throttle((e: React.MouseEvent, index: number) => {
    const element = buttonRefs.current[index];
    if (element) {
      const rect = element.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * tiltDegrees;
      const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * -tiltDegrees;
      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }, 100);
};

export const handleMouseLeave =
  (buttonRefs: RefObject<(HTMLElement | null)[]>, throttledMouseMove: ReturnType<typeof throttle>) =>
  (index: number) => {
    throttledMouseMove.cancel(); // Cancel any pending throttle updates
    const element = buttonRefs.current[index];
    if (element) {
      element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
    }
  };
