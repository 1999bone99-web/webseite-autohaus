#!/usr/bin/env bash
# Lädt den aktuellen Fahrzeugbestand von www.bmw-jw-marhoffer.de und schreibt
# src/data/vehicles.json und src/data/equipment.json neu.
# Aufruf aus dem Projektordner: bash scripts/bestand/fetch.sh
set -euo pipefail

BASE="https://www.bmw-jw-marhoffer.de/fahrzeuge/fahrzeugbestand"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/details"

# Listenseiten durchgehen. Die Quelle zählt ab 1, die höchste Seite steht in der Blätterleiste.
first="$(curl -fsS "$BASE/s:1,12,,-")"
last="$(grep -oE 'fahrzeugbestand/s:[0-9]+,12' <<<"$first" | grep -oE '[0-9]+,' | tr -d , | sort -n | tail -1)"
: > "$TMP/urls.txt"
for page in $(seq 1 "${last:-1}"); do
  html="$(curl -fsS "$BASE/s:$page,12,,-")"
  grep -oE 'https://www\.bmw-jw-marhoffer\.de/fahrzeuge/fahrzeugdetail/fahrzeug/[^"#]+' <<<"$html" >> "$TMP/urls.txt" || true
  sleep 1
done
sort -u -o "$TMP/urls.txt" "$TMP/urls.txt"
echo "$(wc -l < "$TMP/urls.txt") Fahrzeuge gefunden"

n=0
while read -r url; do
  n=$((n + 1))
  curl -fsS -o "$TMP/details/$n.html" "$url"
  echo "$n $url" >> "$TMP/details/index.txt"
  sleep 0.8
done < "$TMP/urls.txt"

python3 -I "$(dirname "$0")/convert.py" "$TMP/details" src/data
echo "Fertig."
