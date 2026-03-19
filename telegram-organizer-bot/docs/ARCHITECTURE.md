# Architecture

## Ingest
Telethon user session reads history from a target group/channel.

## Index
Each media item becomes a record with:
- message id
- chat id
- date
- caption
- filename
- mime type
- file size
- duration
- width/height if available
- local sha256 if downloaded

## Librarian model
The model receives only a JSON record and returns:
- category
- tags
- canonical title
- rename suggestion
- confidence
- action (`keep`, `review`, `archive`)

## Execution modes
- `review_only` — generate manifest only
- `plan_moves` — generate plan but do not move files
- `apply_moves` — future mode; disabled by default

## Group setup
Recommended pattern:
- use a Telethon user session for reading history (best for private groups/channels)
- optionally add a separate bot later for admin commands or digest posting
- let the indexer read and classify messages
- post digest/manifests back into a private admin thread or just keep them local
