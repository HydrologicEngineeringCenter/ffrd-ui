import type Keycloak from "./keycloak";

export type KeycloakConfig = {
  keycloakUrl: string;
  realm: string;
  sessionEndWarning: number;
  refreshInterval: number;
  client: string;
  redirectUrl: string;
  clientSecret: string;
  onAuthenticate: (accessToken?: string) => void;
  onGetToken: () => void;
  onError: (res: any) => void;
  onSessionEnding: (remainingTime: number) => void;
};

export type AuthToken = {
  jwt?: string;
  roles?: string[];
  name?: string;
  sub?: number;
  fullName?: string;
  userId?: string;
  exp?: string;
};

export type KeycloakStore = {
  keycloak: Keycloak;
  authToken: AuthToken;
  config: KeycloakConfig;
}
