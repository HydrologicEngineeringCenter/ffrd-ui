<script lang="ts">
  import DisclaimerPage from "$lib/pages/DisclaimerPage.svelte";
  import { auth_token } from "$lib/stores/auth";
  import { beforeUpdate } from "svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  beforeUpdate(() => {
    if ($auth_token.jwt) {
      goto(base + "/splash");
    }
  });
</script>

{#if !$auth_token.jwt}
  <DisclaimerPage />
{/if}
