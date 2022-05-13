<script lang="ts">
  import DisclaimerPage from "../components/pages/DisclaimerPage.svelte";
  import authStore from "src/stores/auth";
  import type { AuthToken } from "$lib/types";
  import { onDestroy, onMount } from "svelte";
  import { goto } from "$app/navigation";

  // auth redirect
  let authToken: AuthToken;
  const unsubscribe = authStore.subscribe((v) => {
    authToken = v.authToken;
  });
  // memory leak if left subscribed
  onDestroy(unsubscribe);
  onMount(() => {
    if (authToken.jwt) {
      goto("/splash");
    }
  });
</script>

<DisclaimerPage />
