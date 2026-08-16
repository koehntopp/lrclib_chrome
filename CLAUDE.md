# LRCLIB Clipboard Search — Design-Entscheidungen

Chrome-Extension (Manifest V3), die einen Suchbegriff bei lrclib.net,
azlyrics.com oder genius.com öffnet.

## Architektur
- Kein Background-Service-Worker: die gesamte Logik läuft im Popup
  (`popup.html` + `popup.js`), da keine Hintergrundaufgaben nötig sind.
- Suche öffnet immer einen neuen Tab im aktuellen Fenster
  (`chrome.tabs.create` ohne `windowId`).

## Zwischenablage
- Clipboard wird **nicht automatisch** beim Öffnen des Popups gelesen,
  sondern nur auf expliziten Klick auf den 📋-Button
  (`navigator.clipboard.readText()` im Klick-Handler, damit die
  User-Geste für die Berechtigung vorhanden ist).
- Grund: automatisches Auslesen beim Öffnen wurde als unerwünscht
  empfunden — der Nutzer soll die Kontrolle behalten, was gesucht wird.

## Persistenz
- Der zuletzt verwendete Suchbegriff wird in `chrome.storage.local`
  gespeichert (`lastQuery`) und beim nächsten Öffnen des Popups
  vorbelegt und selektiert.

## Such-URLs
- lrclib.net: `https://lrclib.net/search/<query>` (URL-encodiert,
  Leerzeichen als `%20`; ermittelt durch Live-Test der Such-UI).
- azlyrics.com: `https://www.azlyrics.com/search/?q=<query>`
  (die zunächst verwendete `search.azlyrics.com/search.php`-URL war
  falsch und wurde korrigiert).
- genius.com: `https://genius.com/search?q=<query>`.

## Icons
- Favicons der drei Ziel-Seiten (`icons/lrclib.png`, `icons/azlyrics.png`,
  `icons/genius.png`) werden **lokal mitgeliefert**, nicht zur Laufzeit
  von Google/den Zielseiten geladen — vermeidet Netzwerkfehler und
  CSP-Probleme im Popup.
- Das Extension-Icon selbst kommt aus `icon.png` (vom Nutzer geliefert)
  und wird per `sips` in 16/32/48/128px nach `icons/icon*.png`
  gerendert, da Chrome-Extension-Icons kein SVG unterstützen (Manifest
  V3 verlangt Raster-Formate).

## Optik
- `bg.jpeg` ist der Popup-Hintergrund (nicht nur im Suchfeld). Die
  Popup-Größe (480×268px) ist exakt auf das Seitenverhältnis von
  `bg.jpeg` (2752×1536 ≈ 1.792:1) abgestimmt, damit das Bild
  unbeschnitten dargestellt wird.
- UI-Elemente sitzen im oberen, ruhigen (dunklen) Bereich des Bildes;
  der untere Bildbereich mit der Wellen-/Noten-Grafik bleibt frei
  sichtbar.
- Modernes UI: abgerundete Ecken, halbtransparente/"glassige"
  Site-Buttons, Farbverlauf beim primären Suchen-Button, Fokus-Ring
  am Eingabefeld, dezente Hover-/Klick-Animationen.
