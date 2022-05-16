<script lang="ts">
  import MainPageButton from "../items/MainPageButton.svelte";
  import NavBar from "../items/NavBar.svelte";
</script>

<svelte:head>
  <title>Welcome!</title>
</svelte:head>

<div class="w-screen h-screen">
  <!-- NavBar height should also be used in the div height calc -->
  <NavBar height={45} />
  <!-- <div -->
  <!--   class="flex items-center w-full mx-auto px-1 bg-gray-300 h-[calc(100%-45px)]" -->
  <!-- > -->
  <div
    class="flex items-center w-full mx-auto px-1 h-[calc(100%-45px)]"
  >
    <MainPageButton>Create New Project</MainPageButton>
    <MainPageButton>Open Existing Project</MainPageButton>
    <MainPageButton>Manage Project</MainPageButton>
  </div>
</div>
