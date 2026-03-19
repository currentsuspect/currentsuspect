#!/usr/bin/env python3
import json
import os
from pathlib import Path
from urllib.parse import urlparse, parse_qs

from google_auth_oauthlib.flow import Flow

SCOPES = [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.settings.basic",
    "https://www.googleapis.com/auth/drive",
]

CREDS_DIR = Path.home() / ".openclaw" / "credentials"
CLIENT_PATH = CREDS_DIR / "gmail-client.json"
TOKEN_PATH = CREDS_DIR / "gmail-token.json"


def load_client_config():
    env_path = os.getenv("GMAIL_OAUTH_CLIENT_JSON")
    if env_path and Path(env_path).exists():
        with open(env_path, "r", encoding="utf-8") as f:
            return json.load(f)

    client_id = os.getenv("GMAIL_OAUTH_CLIENT_ID")
    client_secret = os.getenv("GMAIL_OAUTH_CLIENT_SECRET")
    redirect_uri = os.getenv("GMAIL_OAUTH_REDIRECT_URI", "http://localhost:51121/oauth-callback")

    if client_id and client_secret:
        return {
            "web": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [redirect_uri],
            }
        }

    if CLIENT_PATH.exists():
        with open(CLIENT_PATH, "r", encoding="utf-8") as f:
            return json.load(f)

    raise SystemExit(
        "Missing OAuth client config. Set GMAIL_OAUTH_CLIENT_ID and GMAIL_OAUTH_CLIENT_SECRET or GMAIL_OAUTH_CLIENT_JSON."
    )


def main():
    CREDS_DIR.mkdir(parents=True, exist_ok=True)
    cfg = load_client_config()

    with open(CLIENT_PATH, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)

    redirect_uri = cfg.get("web", {}).get("redirect_uris", ["http://localhost:51121/oauth-callback"])[0]

    flow = Flow.from_client_config(cfg, scopes=SCOPES, redirect_uri=redirect_uri)
    auth_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )

    print("\nOpen this URL in your browser and complete login:\n")
    print(auth_url)
    print("\nAfter login, copy the FULL callback URL from the browser address bar and paste it below.")
    callback = input("Callback URL: ").strip()

    parsed = urlparse(callback)
    qs = parse_qs(parsed.query)
    code = qs.get("code", [None])[0]
    cb_state = qs.get("state", [None])[0]

    if not code:
        raise SystemExit("No code found in callback URL.")
    if cb_state != state:
        raise SystemExit("OAuth state mismatch. Restart and use a fresh URL.")

    flow.fetch_token(code=code)
    creds = flow.credentials

    token_data = {
        "token": creds.token,
        "refresh_token": creds.refresh_token,
        "token_uri": creds.token_uri,
        "client_id": creds.client_id,
        "client_secret": creds.client_secret,
        "scopes": creds.scopes,
    }

    with open(TOKEN_PATH, "w", encoding="utf-8") as f:
        json.dump(token_data, f, indent=2)

    os.chmod(TOKEN_PATH, 0o600)
    print(f"\nOAuth success. Token saved to: {TOKEN_PATH}")


if __name__ == "__main__":
    main()
