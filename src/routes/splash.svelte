<script lang="ts">
  import MainPage from "../components/pages/MainPage.svelte";
  import authStore from "../stores/auth";
  import type { AuthToken } from "$lib/types";
  import { goto } from "$app/navigation";
  import { onDestroy, onMount } from "svelte";

  // auth redirect
  let authToken: AuthToken;
  const unsubscribe = authStore.subscribe((v) => {
    authToken = v.authToken;
  });
  // memory leak if left subscribed
  onDestroy(unsubscribe);
  onMount(() => {
    if (!authToken.jwt) {
      goto("/disclaimer");
    }
  });
</script>

<MainPage />
