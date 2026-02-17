#!/usr/bin/env bash
# Copies markdown files from ../docs/ into docs-site/docs/
# Run from the docs-site/ directory: bash sync-docs.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC="$SCRIPT_DIR/../docs"
DEST="$SCRIPT_DIR/docs"

if [ ! -d "$SRC" ]; then
  echo "Error: Source directory $SRC not found."
  exit 1
fi

# Files that only exist in docs-site/docs/ (VitePress-specific, not synced)
EXCLUDE="feature-estimator.md top-and-local-escape-room-websites.md"

count=0
for f in "$SRC"/*.md; do
  [ -f "$f" ] || continue
  basename="$(basename "$f")"
  if echo "$EXCLUDE" | grep -qw "$basename"; then
    continue
  fi
  cp "$f" "$DEST/"
  count=$((count + 1))
done

echo "Synced $count markdown files from $SRC to $DEST"
