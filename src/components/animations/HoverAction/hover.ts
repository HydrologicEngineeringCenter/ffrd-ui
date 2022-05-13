import { spring } from 'svelte/motion';
import type { HoverParams } from './types';

function getPrefersReducedMotion() {
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
}

export default function hover(node: HTMLElement, params: HoverParams) {
  let { setter } = params;
  let springyRotation = spring({ x: 0, y: 0, rotation: 0, scale: 1 }, {
    stiffness: 0.1,
    damping: 0.15
  });
  let prefersReducedMotion = getPrefersReducedMotion();

  node.style["display"] = `inline-block`;

  const unsubscribe = springyRotation.subscribe(({ x, y, rotation, scale }) => {
    let transformStr: string = String(!prefersReducedMotion && `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`)
    node.style.transform = transformStr;
  })

  return {
    update({ isMouseHovering, animationParams: { x = 0, y = 0, rotation = 0, scale = 1 } }: HoverParams) {
      springyRotation.set(isMouseHovering ? { x, y, rotation, scale } : { x: 0, y: 0, rotation: 0, scale: 1 });
      if (!isMouseHovering) {
        setter(false)
      }
    },
    destroy() {
      unsubscribe();
    }
  }
}
