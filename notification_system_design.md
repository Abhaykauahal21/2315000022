# Notification System Design

## Architecture

```
Frontend (Next.js 15)
     │
     ▼   REST API
Backend (Express + TypeScript)
     │
     ▼   Bearer Auth
External API (evaluation-service)
```

## Backend

### Endpoints

| Endpoint | Params | Description |
|----------|--------|-------------|
| `GET /notifications` | `page`, `limit`, `notification_type` | Paginated notifications from external API |
| `GET /priority?n=10` | `n` | Top N notifications by priority + recency |

### Priority Algorithm

`Composite Score = (Type Weight × 10) + (Recency Score × 5)`

| Type | Weight |
|------|--------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

`Recency Score = max(0, 1 - hoursSinceCreation / 720)`

Tie-break: newer `created_at` first.

### Auth

Bearer token from `ACCESS_TOKEN` env var passed to external API.

## Frontend

### Pages

| Route | Component | Features |
|-------|-----------|----------|
| `/` | AllNotificationsPage | Pagination, filter by type, mark viewed/unviewed |
| `/priority` | PriorityInboxPage | Slider to select N, apply button |

### State

- Local React state (`useState` + `useEffect`)
- Viewed/unviewed tracked per session via `Record<string, boolean>`

## Logging Middleware

| Middleware | Logs |
|-----------|------|
| `requestLogger` | Method + URL |
| `responseLogger` | Status code |
| `errorLogger` | Error messages |
| `executionTimeLogger` | Duration in ms |

Uses `process.stdout`/`process.stderr` — no `console.log`.
