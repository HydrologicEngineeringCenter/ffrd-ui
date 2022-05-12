export type KeycloakConfig = {
  onAuthenticate: (accessToken: Nullable<string>) => void;
  onGetToken: () => void;
  onError: (res: any) => void;
  onSessionEnding: (remainingTime: number) => void;
  keycloakUrl: string;
  realm: string;
  sessionEndWarning: number;
  refreshInterval: number;
  client: string;
  redirectUrl: string;
  clientSecret: string;
}
