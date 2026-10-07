#!/usr/bin/env bash
# Lädt den aktuellen Fahrzeugbestand von www.bmw-jw-marhoffer.de und schreibt
# src/data/vehicles.json und src/data/equipment.json neu.
# Aufruf aus dem Projektordner: bash scripts/bestand/fetch.sh
set -euo pipefail

BASE="https://www.bmw-jw-marhoffer.de/fahrzeuge/fahrzeugbestand"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/details"

# Listenseiten durchgehen, bis keine neuen Fahrzeuge mehr kommen
page=0
: > "$TMP/urls.txt"
while :; do
  html="$(curl -fsS "$BASE/s:$page,12,,-")"
  found="$(grep -oE 'https://www\.bmw-jw-marhoffer\.de/fahrzeuge/fahrzeugdetail/fahrzeug/[^"#]+' <<<"$html" | sort -u || true)"
  new="$(comm -13 "$TMP/urls.txt" <(echo "$found") | grep . || true)"
  [ -z "$new" ] && break
  echo "$new" >> "$TMP/urls.txt"
  sort -u -o "$TMP/urls.txt" "$TMP/urls.txt"
  page=$((page + 1))
  sleep 1
done
echo "$(wc -l < "$TMP/urls.txt") Fahrzeuge gefunden"

n=0
while read -r url; do
  n=$((n + 1))
  curl -fsS -o "$TMP/details/$n.html" "$url"
  echo "$n $url" >> "$TMP/details/index.txt"
  sleep 0.8
done < "$TMP/urls.txt"

python3 -I "$(dirname "$0")/convert.py" "$TMP/details" src/data
echo "Fertig. Stand-Datum in src/lib/vehicles.ts (STOCK_DATE) anpassen."
