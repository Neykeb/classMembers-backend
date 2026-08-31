
```md
# Class Members Backend

Ein einfaches Express.js + MongoDB Backend zur Verwaltung von Class Members.

## Überblick

Dieses Projekt stellt eine REST-API für die Verwaltung von Mitgliedern bereit. Es ermöglicht:

- Mitglieder anzeigen
- Mitglieder nach Namen suchen
- Dashboard-Statistiken abrufen
- neues Mitglied anlegen
- Mitglied aktualisieren
- Mitglied löschen

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

---

## Projektstruktur

```text
mini-projekt/
├── src/
│   ├── controllers/
│   │   └── classMemberController.js
│   ├── database/
│   │   └── `connectDB.js`
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── `classMemberModel.js`
│   ├── routes/
│   │   └── `classMemberRoutes.js`
│   ├── `server.js`
│   └── app.js
├── .env
├── `package.json`
├── `README.md`
└── node_modules/
```

---

## Voraussetzungen

Bevor du das Projekt startest, benötigst du:

- Node.js installiert
- MongoDB lokal oder Remote
- npm

---

## Installation

1. Repository klonen oder in den Projektordner wechseln
2. Abhängigkeiten installieren:

```bash
npm install
```

---

## Umgebungsvariablen

Erstelle eine `.env`-Datei im Projektroot:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/classmembers
```

Wenn du eine andere MongoDB-Instanz verwendest, ersetze die URI entsprechend.

---

## Starten des Servers

Entwicklung:

```bash
npm run dev
```

Produktion:

```bash
npm start
```

Der Server startet dann auf:

```text
http://localhost:5000
```

---

## API-Endpunkte

### 1. Dashboard-Statistiken abrufen
```http
GET /api/class-members/dashboard
```

Beispielantwort:

```json
{
  "total": 12,
  "active": 7,
  "inactive": 3,
  "pending": 2
}
```

---

### 2. Alle Mitglieder abrufen
```http
GET /api/class-members
```

Optional mit Suche:

```http
GET /api/class-members?search=Max
```

---

### 3. Einzelnes Mitglied abrufen
```http
GET /api/class-members/:id
```

---

### 4. Neues Mitglied erstellen
```http
POST /api/class-members
```

Body-Beispiel:

```json
{
  "firstName": "Anna",
  "lastName": "Müller",
  "email": "anna.mueller@example.com",
  "className": "Webentwicklung A",
  "status": "active"
}
```

---

### 5. Mitglied aktualisieren
```http
PUT /api/class-members/:id
```

Body-Beispiel:

```json
{
  "status": "inactive",
  "className": "UX Design"
}
```

---

### 6. Mitglied löschen
```http
DELETE /api/class-members/:id
```

---

## Datenmodell

Das Mitgliedsmodell enthält folgende Felder:

```js
{
  firstName: String,
  lastName: String,
  email: String,
  className: String,
  status: "active" | "inactive" | "pending",
  joinedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Statuswerte
- `active`
- `inactive`
- `pending`

---

## Beispiel-Request mit curl

Mitglied erstellen:

```bash
curl -X POST http://localhost:5000/api/class-members \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Max",
    "lastName": "Mustermann",
    "email": "max@example.com",
    "className": "Frontend Kurs",
    "status": "pending"
  }'
```

Mitglieder abrufen:

```bash
curl http://localhost:5000/api/class-members
```

---

## Fehlerbehandlung

Das Backend verwendet einen zentralen Error-Handler, der Fehler sauber an den Client zurückliefert.

Beispiele:
- 404: Mitglied nicht gefunden
- 400: ungültige Anfrage/Daten
- 500: Serverfehler

---

## Erweiterungsideen

Mögliche zukünftige Erweiterungen:

- Rollenverwaltung (`admin`, `teacher`, `student`)
- Klassen-/Kursverwaltung
- CSV-Import
- Mitglieder-Suche mit Filter
- Pagination
- Aktivitätslog
- Soft Delete statt dauerhaftes Löschen

---

## Lizenz

Dieses Projekt steht unter der ISC-Lizenz.

