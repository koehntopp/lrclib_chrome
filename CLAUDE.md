# Quick Lyrics — Design-Entscheidungen

Chrome-Extension (Manifest V3), die einen Suchbegriff bei lrclib.net,
azlyrics.com, genius.com oder Google öffnet.

## Naming
- Ursprünglich hieß die Extension „LRCLIB Clipboard Search“. Umbenannt zu
  „Quick Lyrics“, weil lrclib.net nur eine von vier durchsuchbaren
  Quellen ist (nicht die alleinige Kernfunktion) und die Zwischenablage
  nur eine unterstützende Eingabehilfe ist, kein Namens-Feature.

## Architektur
- Kein Background-Service-Worker: die gesamte Logik läuft im Popup
  (`popup.html` + `popup.js`), da keine Hintergrundaufgaben nötig sind.
- Suche öffnet immer einen neuen Tab im aktuellen Fenster
  (`chrome.tabs.create` ohne `windowId`).

## Zwischenablage
- Ursprünglich gab es einen eigenen 📋/Paste-Button
  (`navigator.clipboard.readText()`), der bewusst nur auf Klick las,
  nie automatisch. Der Button wurde später wieder entfernt (samt
  `clipboardRead`-Permission) zugunsten des simpleren UI-Layouts mit
  vier gleichwertigen Quell-Buttons — Einfügen per natives Cmd/Ctrl+V
  ins Eingabefeld funktioniert weiterhin ohne jede Permission.

## Persistenz
- Der zuletzt verwendete Suchbegriff wird in `chrome.storage.local`
  gespeichert (`lastQuery`) und beim nächsten Öffnen des Popups
  vorbelegt und selektiert.

## Such-URLs
- lrclib.net: `https://lrclib.net/search/<query>` (URL-encodiert,
  Leerzeichen als `%20`; ermittelt durch Live-Test der Such-UI).
- azlyrics.com: `https://www.google.com/search?q=site:azlyrics.com <query>`.
  Zwei vorherige Versuche haben sich als nicht funktionsfähig erwiesen:
  `search.azlyrics.com/search.php?q=<query>` (falsche/alte URL) und
  danach `https://www.azlyrics.com/search/?q=<query>` (die Seite ist
  eine Client-Side-App, die `?q=` bei einem direkten Seitenaufruf nicht
  auswertet — nur eine echte Suche über AZLyrics' eigenes Suchfeld
  funktioniert). Eine site-eingeschränkte Google-Suche umgeht das.
- genius.com: `https://genius.com/search?q=<query>`.

## Internationalisierung
- Sprachen: Deutsch (`de`, `default_locale`), Englisch (`en`), Französisch
  (`fr`) via Chrome-i18n-Mechanismus (`_locales/<lang>/messages.json`).
  Chrome wählt die Sprache automatisch anhand der Browser-Spracheinstellung.
- `manifest.json` nutzt `__MSG_extName__` / `__MSG_extDescription__`
  statt Klartext.
- `popup.html`-Elemente tragen `data-i18n` (Textinhalt) bzw.
  `data-i18n-placeholder` (Eingabefeld-Placeholder) statt hartcodiertem
  Text; `popup.js` ersetzt diese beim Laden per
  `chrome.i18n.getMessage()`. Die dynamische Statusmeldung (leeres
  Suchfeld) läuft ebenfalls darüber.
- Achtung beim lokalen Vorschau-Rendern (z. B. per `qlmanage`/Quick
  Look): Externe `<script>`-Dateien werden dort nicht ausgeführt, JS-
  gesetzter Text bleibt leer. Für optische Kontrollen ohne echten
  Extension-Kontext den Text testweise direkt ins HTML schreiben statt
  über `chrome.i18n.getMessage()` zu verlassen.
- Domain-Namen (lrclib.net, azlyrics.com, genius.com) und der Markenname
  „Quick Lyrics“ bleiben in allen Sprachen unübersetzt.

## Icons
- Favicons der vier Ziel-Seiten (`icons/lrclib.png`, `icons/azlyrics.png`,
  `icons/genius.png`, `icons/google.png`) werden **lokal mitgeliefert**,
  nicht zur Laufzeit von Google/den Zielseiten geladen — vermeidet
  Netzwerkfehler und CSP-Probleme im Popup.
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
  Site-Buttons, Fokus-Ring am Eingabefeld, dezente Hover-/Klick-
  Animationen.
- Layout: Eingabefeld über einem 2×2-Grid aus vier gleichwertigen
  Buttons (Icon + Text: lrclib.net, AZLyrics, Genius, Google) statt
  vorher einem hervorgehobenen "Suchen"-Button plus separater Reihe
  reiner Icon-Buttons — bewusst gleichwertig, weil keine Quelle
  gegenüber den anderen priorisiert werden soll.
