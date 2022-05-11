<script lang="ts">
  import MainPageButton from "../components/MainPageButton.svelte";
  import NavBar from "../components/NavBar.svelte";
  // int -> px
  let navbarHeight = 45
</script>

<svelte:head>
  <title>Welcome!</title>
</svelte:head>

<div class="w-screen h-screen">
  <NavBar height={navbarHeight} />
  <div class="flex items-center w-full mx-auto px-1 h-[calc(100%-{navbarHeight}px)] bg-gray-300">
    <MainPageButton>Create New Project</MainPageButton>
    <MainPageButton>Open Existing Project</MainPageButton>
    <MainPageButton>Manage Project</MainPageButton>
  </div>
</div>
