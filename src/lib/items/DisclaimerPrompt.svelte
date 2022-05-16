<script lang="ts">
  import Card, { Actions, Content } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import { auth_keycloak } from "$lib/stores/auth";

  function clickHandler() {
    $auth_keycloak.authenticate();
  }
</script>

<Card class="border-solid w-3/6 my-12 font-sans text-base">
  <Content>
    You are accessing a U.S. Government (USG) Information System (IS) that is
    provided for USG-authorized use only.
    <p>
      By using this IS (which includes any device attached to this IS), you
      consent to the following conditions:
    </p>
    <ul class="list-disc list-inside text-sm">
      <li>
        The USG routinely intercepts and monitors communications on this IS for
        purposes including, but not limited to, penetration testing, COMSEC
        monitoring, network operations and defense, personnel misconduct (PM),
        law enforcement (LE), and counterintelligence (CI) investigations.
      </li>
      <li>
        At any time, the USG may inspect and seize data stored on this IS.
      </li>
      <li>
        Communications using, or data stored on, this IS are not private, are
        subject to routine monitoring, interception, and search, and may be
        disclosed or used for any USG-authorized purpose.
      </li>
      <li>
        This IS includes security measures (e.g., authentication and access
        controls) to protect USG interests—not for your personal benefit or
        privacy.
      </li>
      <li>
        Notwithstanding the above, using this IS does not constitute consent to
        PM, LE or CI investigative searching or monitoring of the content of
        privileged communications, or work product, related to personal
        representation or services by attorneys, psychotherapists, or clergy,
        and their assistants. Such communications and work product are private
        and confidential. See User Agreement for details.
      </li>
    </ul>
  </Content>
  <div class="flex justify-end">
    <Actions fullBleed>
      <Button on:click={clickHandler}>
        <Label>I Agree</Label>
      </Button>
    </Actions>
  </div>
</Card>
