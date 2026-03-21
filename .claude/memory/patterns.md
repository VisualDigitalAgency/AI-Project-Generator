# Approved Patterns

## Universal Backend Patterns

### Repository Pattern
All DB access through repository classes. Handlers never write queries directly.
```
Handler → Service → Repository → DB
```

### Result Type (no throws in business logic)
```typescript
type Result<T> = { data: T; error: null } | { data: null; error: AppError }
```

### JSON-RPC Dispatcher
Single POST endpoint maps `method` strings to handler functions.
```typescript
const handlers = { "resource.create": createHandler, ... }
app.post("/rpc", dispatch(handlers))
```

### Service Layer
Business logic lives in service classes, not in route handlers.
Handlers: parse → validate → call service → format response.

## Universal Frontend Patterns

### Server Components Default
Only use `"use client"` when interactivity or browser APIs are needed.

### Custom Hooks for API Calls
Never call fetch directly in components. Use hooks in `frontend/hooks/`.

### Optimistic Updates
Update UI immediately, rollback on server error.

## Testing Patterns

### Arrange-Act-Assert
Every test follows AAA structure with a blank line between sections.

### Factory Functions for Test Data
Never construct test objects inline. Use factory functions in `tests/factories/`.
