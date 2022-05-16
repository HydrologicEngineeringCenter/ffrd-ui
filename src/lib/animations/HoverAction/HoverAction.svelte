<script lang="ts">
  import type { AnimationParams } from "./types";

  import hover from "./hover.js";
  export let animationParams: AnimationParams;

  let mouseHovering: boolean = false;

  function setMouseMotion(val: boolean) {
    mouseHovering = val;
  }
</script>

<!-- trigger onclick so demo works on mobile -->
<span
  class="w-full"
  on:mouseenter={() => setMouseMotion(true)}
  on:mouseleave={() => setMouseMotion(false)}
  use:hover={{
    isMouseHovering: mouseHovering,
    animationParams: animationParams,
    setter: setMouseMotion,
  }}
>
  <slot />
</span>
