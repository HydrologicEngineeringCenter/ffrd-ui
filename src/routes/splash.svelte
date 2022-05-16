<script lang="ts">
  import MainPage from "$lib/pages/MainPage.svelte";
  import { auth_token, auth_keycloak } from "$lib/stores/auth";
  import { goto } from "$app/navigation";
  import { beforeUpdate, onMount } from "svelte";
  import { base } from "$app/paths";

  // auth redirect - TODO uncomment this in production
  beforeUpdate(() => {
    $auth_keycloak.checkForSession();
    // if (!$auth_token.jwt) {
    //   goto(base);
    // }
  });
  onMount(() => {});
</script>

<!-- don't show anything if not login -->
{#if $auth_token.jwt}
  <MainPage />
  $auth_token
{/if}
