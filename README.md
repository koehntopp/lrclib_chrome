# LRCLIB Clipboard Search

Eine kleine Chrome-Extension (Manifest V3), um schnell nach Songtexten zu
suchen — bei [lrclib.net](https://lrclib.net), [AZLyrics](https://www.azlyrics.com)
oder [Genius](https://genius.com).

## Funktionen

- Klick auf das Extension-Icon öffnet ein Eingabefeld mit dem zuletzt
  verwendeten Suchbegriff.
- 📋-Button fügt den Inhalt der Zwischenablage in das Eingabefeld ein
  (kein automatisches Auslesen — du hast die Kontrolle).
- „Suchen“ öffnet die Ergebnisseite bei lrclib.net in einem neuen Tab.
- Drei zusätzliche Buttons (mit den Favicons der jeweiligen Seite)
  suchen alternativ bei lrclib.net, AZLyrics oder Genius, falls einer
  der Anbieter keinen Treffer hat.
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
icons/          Generierte Extension-Icons + Favicons der Zielseiten
bg.jpeg         Hintergrundbild des Popups
```

## Design-Entscheidungen

Details zu Architektur- und UI-Entscheidungen siehe [CLAUDE.md](CLAUDE.md).

## Release-Automation

Bei Veröffentlichung eines GitHub-Release (`release: published`) packt
[`.github/workflows/release.yml`](.github/workflows/release.yml) die
Extension als ZIP und veröffentlicht sie automatisch im Chrome Web
Store (via [`mnao305/chrome-extension-upload`](https://github.com/mnao305/chrome-extension-upload)).

Dafür müssen folgende Repository-Secrets gesetzt sein
(Settings → Secrets and variables → Actions):

| Secret | Bedeutung |
| --- | --- |
| `CHROME_EXTENSION_ID` | ID der Extension im Chrome Web Store |
| `CHROME_CLIENT_ID` | OAuth-Client-ID (Google Cloud Console) |
| `CHROME_CLIENT_SECRET` | OAuth-Client-Secret |
| `CHROME_REFRESH_TOKEN` | OAuth-Refresh-Token mit Zugriff auf die Chrome Web Store API |

Die Extension muss vorher mindestens einmal manuell im
[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
angelegt worden sein, damit eine `CHROME_EXTENSION_ID` existiert.
