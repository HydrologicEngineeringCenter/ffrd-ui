import type { KeycloakConfig } from "./types";

function urlencodeFormData(fd: FormData) { return new URLSearchParams(fd as any) }

class Keycloak {
  accessToken?: string;
  refreshToken?: string;
  identityToken?: string;
  config: KeycloakConfig;
  authCallback: (accessToken?: string) => void;
  tokenCallback: (t: string) => void;
  errCallback: (res: any) => void;
  sessionEndWarning: number;
  sessionEndingCallback: (remainingTime: number) => void;
  keycloakUrl: string;
  code: Nullable<string>;
  sessionState: Nullable<string>;

  constructor(config: KeycloakConfig) {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.identityToken = undefined;
    this.config = config;
    this.authCallback = config.onAuthenticate;
    this.tokenCallback = config.onGetToken;
    this.errCallback = config.onError;
    this.sessionEndWarning = config.sessionEndWarning || 60;
    this.sessionEndingCallback = config.onSessionEnding;
    this.keycloakUrl = `${config.keycloakUrl}/realms/${config.realm}/protocol/openid-connect`;
    this.code = null;
    this.sessionState = null;
  }

  refreshInterval(expiresIn: number): number {
    if (this.config.refreshInterval) {
      return this.config.refreshInterval * 1000;
    } else {
      const interval = (expiresIn - 60) * 1000;
      if (interval <= 0) {
        console.log(`Warning: Invalid Refresh Interval of ${interval} computed for token that expires in ${expiresIn}`);
        return 900 * 1000; //use default of 15 minutes
      }
      return interval;
    }
  }

  /**
   *  Send request to /auth endpoint
   */
  authenticate() {
    let url = `${this.config.keycloakUrl}/realms/${this.config.realm}/protocol/openid-connect/auth?response_type=code&client_id=${this.config.client}&scope=openid&nocache=${(new Date()).getTime()}&redirect_uri=${this.config.redirectUrl}`
    window.location.href = url;
  }

  checkForSession() {
    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get('code');
    this.sessionState = urlParams.get('session_state');
    if (this.code && this.sessionState) {
      this.codeFlowAuth();
      window.history.pushState(null, "", document.location.pathname);
    }
  }

  /*
  * Fetch token from Keycloak
  * @param formData passable argument into URLSearchParams ie. string literal
  * sequence of pairs or record object
  */
  fetchToken(formData: FormData) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', `${this.keycloakUrl}/token`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    let self = this;
    let resp = null;

    xhr.onload = function() {
      switch (xhr.status) {
        case (400): // 400 - bad request
          self.accessToken = undefined;
          self.refreshToken = undefined;
          resp = JSON.parse(xhr.responseText);
          self.errCallback(resp);
          break;

        case 200:
          let keycloakResp: {
            access_token: string;
            identity_token: string;
            refresh_token: string;
            refresh_expires_in: number;
          };
          try {
            keycloakResp = JSON.parse(xhr.responseText);
          }
          catch (err) {
            console.error(`Error parsing authentication token: ${err}`)
            return
          }
          self.accessToken = keycloakResp.access_token;
          self.identityToken = keycloakResp.identity_token;
          const remainingTime = keycloakResp.refresh_expires_in;
          if (remainingTime && remainingTime <= self.sessionEndWarning) {
            if (self.sessionEndingCallback)
              self.sessionEndingCallback(remainingTime);
          }
          setTimeout(function() {
            self.refresh(keycloakResp.refresh_token);
          }, self.refreshInterval(keycloakResp.refresh_expires_in));
          self.authCallback(keycloakResp.access_token);
          break;

        default:
          resp = JSON.parse(xhr.responseText);
          // self.errCallback(resp);
          break;

      }
    };

    xhr.onerror = function() {
      if (xhr.responseText) {
        self.errCallback(JSON.parse(xhr.responseText));
      } else {
        self.errCallback({ "error": "Unable to fetch the token due to a Network Error" });
      }
    }
    xhr.send(urlencodeFormData(formData).toString().replaceAll("%0D", "")); // URL encoding do not remove %0D escape characters
  }

  codeFlowAuth() {
    console.log("fetching token");
    var data = new FormData();
    data.append('code', this.code ? this.code : '');
    data.append('grant_type', 'authorization_code');
    data.append('client_id', this.config.client);
    data.append('client_secret', this.config.clientSecret); // required depending on keycloak client authentication config
    data.append('redirect_uri', this.config.redirectUrl);

    this.fetchToken(data);
  }

  refresh(refreshToken: string) {
    console.log("refreshing token");
    var data = new FormData();
    data.append('refresh_token', refreshToken ? refreshToken : "");
    data.append('grant_type', 'refresh_token');
    data.append('client_id', this.config.client);
    data.append('client_secret', this.config.clientSecret); // keycloak configured to authenticate client with only id and secret
    this.fetchToken(data);
  }

  directGrantAuthenticate(user: string, pass: string) {
    var data = new FormData();
    data.append('grant_type', 'password');
    data.append('client_id', this.config.client);
    data.append('scope', 'openid profile');
    data.append('username', user);
    data.append('password', pass);
    this.fetchToken(data);
  }

  directGrantX509Authenticate() {
    var data = new FormData();
    data.append('grant_type', 'password');
    data.append('client_id', this.config.client);
    data.append('scope', 'openid profile');
    data.append('username', '');
    data.append('password', '');
    this.fetchToken(data);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdentityToken() {
    return this.identityToken;
  }
}

const tokenToObject = function(token: string) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export { Keycloak as default, tokenToObject };
