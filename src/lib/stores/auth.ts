import { readable, writable } from "svelte/store";
import type { AuthToken, KeycloakConfig } from "$lib/keycloak/types";
import Keycloak from "$lib/keycloak";
// import { base } from "$app/paths";

const keycloakHost = import.meta.env.SVELTE_APP_KEYCLOAK_HOST
const keycloakRealm = import.meta.env.SVELTE_APP_KEYCLOAK_REALM
const keycloakClient = import.meta.env.SVELTE_APP_KEYCLOAK_CLIENTID
const keycloakRedirect = import.meta.env.SVELTE_APP_KEYCLOAK_REDIRECT
const keycloakClientSecret = import.meta.env.SVELTE_APP_CLIENT_SECRET

const kcCfg: KeycloakConfig = {
  keycloakUrl: keycloakHost ? keycloakHost : "",
  realm: keycloakRealm ? keycloakRealm : "",
  sessionEndWarning: 600,
  refreshInterval: 300,
  client: keycloakClient ? keycloakClient : "",
  redirectUrl: keycloakRedirect ? keycloakRedirect : "",
  clientSecret: keycloakClientSecret ? keycloakClientSecret : "",
  onAuthenticate: (token?: string) => {
    processTokenResponse(token);
  },
  onGetToken: () => {
  },
  onError: () => {
    processTokenResponse(undefined);
  },
  onSessionEnding: (remainingTime: number) => {
    console.log(`Impending deauthentication: ${remainingTime}ms`)
  },
}

const initAuthToken: AuthToken = {
  jwt: "",
  roles: undefined,
  name: undefined,
  sub: undefined,
  fullName: "",
  userId: "",
  exp: "",
}

// keycloak obj should not be mutable
let auth_keycloak = readable(new Keycloak(kcCfg))
// auth_token should be mutable from methods in auth_keycloak
let auth_token = writable(initAuthToken)

export { auth_keycloak, auth_token };

/////////////////////////////////////////////////////////////////////
//  Private util functions
/////////////////////////////////////////////////////////////////////
function processTokenResponse(token?: string) {
  let newAuth: AuthToken;
  // token not available if called from onError()
  if (!token) {
    newAuth = {
      jwt: undefined,
      roles: undefined,
      name: undefined,
      sub: undefined,
      fullName: undefined,
      userId: undefined,
      exp: undefined,
    }
  } else {
    newAuth = JSON.parse(window.atob(token.split(".")[1]))
  }
  auth_token.set(newAuth)
}
