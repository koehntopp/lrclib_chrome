# Quick Lyrics

Eine kleine Chrome-Extension (Manifest V3), um schnell nach Songtexten zu
suchen — über mehrere Datenbanken hinweg: [lrclib.net](https://lrclib.net),
[AZLyrics](https://www.azlyrics.com), [Genius](https://genius.com) und Google.

## Funktionen

- Klick auf das Extension-Icon öffnet ein Eingabefeld mit dem zuletzt
  verwendeten Suchbegriff.
- 📋-Button fügt bei Bedarf den Inhalt der Zwischenablage ein
  (kein automatisches Auslesen — du hast die Kontrolle).
- „Suchen“ öffnet die Ergebnisseite bei lrclib.net in einem neuen Tab.
- Vier zusätzliche Buttons (mit den Favicons der jeweiligen Seite)
  suchen alternativ bei lrclib.net, AZLyrics, Genius oder per Google
  (`lyrics <Suchbegriff>`), falls eine Quelle keinen Treffer hat.
- Der letzte Suchbegriff wird lokal gespeichert (`chrome.storage.local`)
  und beim nächsten Öffnen vorausgefüllt.

## Installation

1. Repository klonen oder herunterladen.
2. In Chrome `chrome://extensions` öffnen.
3. „Entwicklermodus“ oben rechts aktivieren.
4. „Entpackte Erweiterung laden“ und den Projektordner auswählen.

## Projektstruktur

```
manifest.json   Manifest V3 Konfiguration
popup.html      UI des Popups
popup.js        Logik (Clipboard, Suche, Storage)
icon.png        Quell-Icon der Extension
paste.png       Quell-Icon des Paste-Buttons
icons/          Generierte Extension-Icons + Favicons der Zielseiten
bg.jpeg         Hintergrundbild des Popups
```

## Design-Entscheidungen

Details zu Architektur- und UI-Entscheidungen siehe [CLAUDE.md](CLAUDE.md).
