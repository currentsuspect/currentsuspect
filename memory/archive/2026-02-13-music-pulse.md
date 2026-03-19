# Music Pulse — 2026-02-13

⚠️ **Spotify data unavailable**

The Spotify API call failed with **401 Unauthorized** followed by **400 Bad Request** on token refresh. This usually means the stored token is expired and refresh failed (credentials changed or revoked).

## Next step to restore access
Run re-auth:
```bash
python3 skills/spotify-history/scripts/spotify-auth.py --headless
```
Then re-run:
```bash
python3 skills/spotify-history/scripts/spotify-api.py recent
python3 skills/spotify-history/scripts/spotify-api.py top-tracks short_term
python3 skills/spotify-history/scripts/spotify-api.py top-artists short_term
python3 skills/spotify-history/scripts/spotify-api.py recommend
```

Once access is restored, I can generate the full morning pulse (vibe summary, 10-track queue, playlist tweaks).
