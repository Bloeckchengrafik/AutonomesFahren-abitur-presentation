# Die Herausforderung "Autonomes Fahren" in der modernen Gesellschaft

## Zentrale Frage

Wie kann autonomes Fahren bei der Lösung aktueller gesellschaftlicher Fragen risikoarm unterstützen?

## Präsentation

SAE-Skala
Politisches Framework
Soziale Chancen und Risiken
Außerhalb des Personenverkehrs (Auch Nicht Auto)

Sonst vorallem Auto

## SAE-Skala

SAE = Society of Automotive Engineers

5 Stufen (6 Stufen mit "Keine Hilfen")

0. Keine Autonomie (Nur Auto, keine Hilfen, aber auch Warnungsfeatures wie Toter-Winkel-Warnung, etc.)
1. Assistenzsysteme (Denke ABS, Abstandsregeltempomat, etc.) - "Hands-on"
2. Teilautomation (Aktueller "Autopilot" von z.B. Tesla, merke auch) - "Immer Aufpassen"

--- SAE stuft als "Autonom" ein

3. Automatisierung unter bestimmten Bedingungen (Ab hier wenig kommerzielle Optionen, kontrovers) - "Kopf aus" aber "
   Immer Aufpassen"
4. Automatisierung unter meisten Bedingungen (Kein Fahrer benötigt, z.B. lokales Taxi, kann nicht alle Gebiete befahren)
5. Vollständige Automatisierung (kann alles befahren, immer, braucht keine Hilfe)

Umbruch weil Forschung Richtung Stufe 3

## Politisches Framework

Drei Hauptregelungen:

- EU-Verordnung 2019/2144
- AFGBV (Verordnung zur Genehmigung und zum Betrieb von Kraftfahrzeugen mit autonomer Fahrfunktion in festgelegten
  Betriebsbereichen)
- DSGVO (Datenschutzgrundverordnung)

### EU-Verordnung 2019/2144

- K2, Artikel 6 (Hochentwickelte Fahrerassistenzsysteme für alle Kraftfahrzeugklassen)
    - Nicht nur für vollautomatische Fahrzeuge
    - Gerne Später
    - intelligenter Geschwindigkeitsassistent (Abstandsregeltempomat)
    - alkoholempfindliche Wegfahrsperre (nVA)
    - Müdigkeitswarnsystem / Konzentrationswarnsystem (nVA)
    - Notbremslicht
    - Rückfahrassistent (nVA)
    - ereignisbezogene Datenaufzeichnung (wie oben)
    - => spezifiziert Anforderungen für diese Syteme
- Kap. 2 Artikel 11 (Besondere Anforderungen an automatisierte und vollautomatisierte Fahrzeuge)
    - "normale Autobestimmungen" (Zulassung wie bei nichtautomatisierten Fahrzeugen) ausser
      Fahrerverfügbarkeitsüberwachung bei vollautomatisierten Fahrzeugen
    - Sensorik zum Zustand Fahrzeug/Umgebung
    - Fahrerverfügbarkeitsüberwachung bei nicht vollautomatisierten Fahrzeugen
    - Datenaufzeichnung bei Ereignissen (z.B. Unfall)
    - Austausch von Daten in einem einheitlichen Format (Kommunikation zwischen Fahrzeugen)
- K2 A4 (Allgemeine Technische Anforderungen)
    - "normale Autobestimmungen", weniger autonom
- Anh. 2 (Technische Anforderungen)
    - Assistenzsysteme wie a. Notbremse und Spurhalteassistent
    - Insassenschutz + Verkehrsteilnehmerschutz (Lichter etc.)

### AFGBV (Verordnung zur Genehmigung und zum Betrieb von Kraftfahrzeugen mit autonomer Fahrfunktion in festgelegten Betriebsbereichen)

- AFGBV setzt u.a. EU 2019/2144 in deutsches Recht um
- Setzt auch UN-Regelung Nr. 152 um
- Beschränkter Bereich (Stufe 3-4), nicht 5
- Speziale Erlaubnis (nach technischer Prüfung)
- Auch Cybersecurity von Fahrzeugen angesprochen (Weitere Info: AC, killchain)
- Marktüberwachung (In Kooperation mit den Herstellern)
- Risikominimaler Zustand (wenn kein Lenkrad o.ä. eingebaut) - geringe Geschwindigkeit, Warnblinker etc.
- Datenspeicherung
    - ID
    - Position
    - Ist autonom?
    - Fahrmanöver
    - Systemüberwachungsdaten
    - Wetter/Umweltdaten
    - Netzwerkstärke
    - aktivierte Sicherheitssysteme
    - Beschleunigung
    - Geschwindigkeit
    - Blinker etc an?
    - Batteriespannung
    - Externe Datenkommunikation

### DSGVO (Datenschutzgrundverordnung)

- Weniger diskutiert als z.B. Trolley-Problem
- Massive Mengen an Daten (vs Datenminimierung)
- DSGVO fordert sichere Datenzugriffe
- Konflikt mit Data-Retention und Data-Sharing
- Wer darf Daten verarbeiten? Wie sind PPE gesichert?

### Zusatzinfos

- AFGBV setzt u.a. EU 2019/2144 in deutsches Recht um
- Dokumentationspflicht (EU: Technische Anforderung, AFGBV: Dokumentationspflicht)
- vereinfachte Cyberkillchain: Reconaissance, Manipulation, Umsetzung, Ausnutzung, C2 (Persistenz)

## Soziale Chancen und Risiken

- Soziale Chancen
    - Teilhabe in der Gesellschaft
        - Kinder, Familien, Senioren
        - "Go-Home" Funktion am Rollator
        - Fahrzeuge können besser reagieren
        - Unterstützung von Familien mit Kindern
        - Kinder-Statistik (Würde autonomes Fahren diese Situation verbessen?)
    - Verkehrssicherheit
        - Bessere Einschätzungen von Situationen
        - Schnellere Reaktionszeiten

- Soziale Risiken
    - "Trolley Problem" - Fahrzeuge können nicht alles bestimmen (Ethikfragen)
    - Akzeptanzprobleme (Angst vor Kontrollverlust)
    - Überwachung von Fahrzeugen (siehe DSGVO Sektion)

(Statistik)
116 Teilnehmer aus 6 Ländern, davon 111 DE

CH, DE, ES, FI, GB, NO

## Ausserhalb des Personenverkehrs

- Interview mit Stefan Thömmes (Operative Entwicklung Trans-O-Flex GmbH)
- In der Halle statische Wege oder auch Aufsatzfahrzeuge (z.B. Warehouse-Management aus China)
- LKWs würden reevaluiert bzgl höchstgeschwindigkeit + keine Steuerzeiten
- Günstiger, weil kein Fahrer + fährt länger pro Tag
- Schienenverkehr bringt nix, zu kleiner Teil der Logistik aktuell -> nicht wirklich relevant

## Zeitplan

```
2 min - Einführung und Themen
3 min - SAE
4 min - Politisches Framework
3 min - Soziale Chancen und Risiken
3 min - In der Logistik
= 15 min
```