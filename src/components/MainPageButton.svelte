<script lang="ts">
  import HoverAction from "./animations/HoverAction/HoverAction.svelte";
</script>

<div class="w-1/3 px-5">
  <HoverAction animationParams={{ scale: 1.1 }}>
    <div
      class="flex justify-center items-center content-start bg-gray-400 h-44 px-1 rounded-lg"
    >
      <div class="text-gray-900 font-sans text-3xl font-medium">
        <slot />
      </div>
    </div>
  </HoverAction>
</div>
