export type AnimationParams = {
  scale?: number;
  rotation?: number;
  x?: number;
  y?: number;
}

export type BoopParams = {
  animationParams: AnimationParams;
  timing: number;
  setter: (v: boolean) => void;
  isBooped: boolean;
}

export type HoverParams = {
  animationParams: AnimationParams;
  setter: (v: boolean) => void;
  isMouseHovering: boolean;
}

