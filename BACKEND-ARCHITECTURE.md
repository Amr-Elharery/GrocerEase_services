# Backend Architecture Overview — GrocerEase

## Summary

The backend follows a **clean, modular, SOA-based architecture** with strict separation of concerns.
Each service owns its domain and business rules, and communicates with other services through well-defined APIs.

The architecture is designed to support:

- scalability
- maintainability

---

## High-Level Architecture

- Independent domain services (SOA)
- Shared architectural principles across services
- Shared database pattern

---

## Layers (Inside Each Service)

### 1. API Layer (Routes)

Express routes act as the **entry point** for HTTP requests.

Responsibilities:

- define endpoints
- attach middlewares (auth, validation, roles)
- delegate to controllers

Rules:

- no business logic
- no database access

---

### 2. Controller Layer

Controllers handle **request–response orchestration**.

Responsibilities:

- parse request data
- call service methods
- return HTTP responses
- handle HTTP-level concerns (status codes)

Controllers **do not** contain business logic.

---

### 3. Service Layer (Core Domain Logic)

The Service Layer represents the **heart of each microservice**.

Responsibilities:

- business rules
- domain validations
- transactional logic
- coordination between repositories
- emitting domain events (optional)

Services:

- are framework-agnostic
- do not know about Express
- throw domain errors instead of HTTP errors

---

### 4. Validation Layer

Validation is centralized and explicit.

Strategy:

- request shape validation using **Zod**
- validation executed **before** business logic
- same schemas can be reused for tests

This prevents invalid data from reaching the service layer.

---

### 5. Data Access Layer (Repository)

Repositories abstract database access.

Responsibilities:

- database queries
- persistence logic
- mapping DB rows → domain objects

Rules:

- no business logic
- no HTTP knowledge

---

### 6. Database Layer

Services share a **common database**.

- PostgreSQL is used for relational consistency
- JSONB used for metadata, AI outputs, and flexible attributes
- strong foreign keys and indexes enforced at the database level

---

## Cross-Cutting Concerns

### Authentication & Authorization

- JWT-based authentication
- role-based access via middleware
- enforced at API layer

---

### Error Handling

- services throw domain errors
- controllers translate them to HTTP responses
- a single global error handler per service

---

### Configuration

- environment-based configuration
- `.env` per service
- no hardcoded values

---

## Folder Structure (Generic per Service)

### Node.js (Express/TypeScript or JavaScript)

```txt
src/
├─ routes/
│ └─ user.routes.ts
├─ controllers/
│ └─ user.controller.ts
├─ services/
│ └─ user.service.ts
├─ repositories/
│ └─ user.repository.ts
├─ validators/
│ └─ createUser.schema.ts
├─ middlewares/
│ ├─ auth.middleware.ts
│ └─ error.middleware.ts
├─ db/
│ └─ postgres.ts
├─ app.ts
└─ server.ts
```

### Python (FastAPI/Flask)

```txt
src/
├─ routes/
│ └─ user_routes.py
├─ controllers/
│ └─ user_controller.py
├─ services/
│ └─ user_service.py
├─ repositories/
│ └─ user_repository.py
├─ validators/
│ └─ create_user_schema.py
├─ middlewares/
│ ├─ auth_middleware.py
│ └─ error_middleware.py
├─ db/
│ └─ postgres.py
├─ app.py
└─ server.py
```

---

## Validation Strategy

- **Request-level validation** → Zod schemas in `validators/`
- **Business-level validation** → inside services
- **Database constraints** → enforced by PostgreSQL

This creates **defense in depth**.

---

## Short Code Samples

### 1. Route

```ts
router.post(
  '/users',
  authMiddleware,
  validate(createUserSchema),
  userController.create,
);
```

---

### 2. Controller

```ts
export const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
```

---

### 3. Service (Business Logic)

```ts
export const create = async (data) => {
  if (await userRepo.existsByEmail(data.email)) {
    throw new DomainError('Email already exists');
  }

  return userRepo.create(data);
};
```

---

### 4. Repository

```ts
export const create = async (user) => {
  const { rows } = await db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [user.name, user.email],
  );
  return rows[0];
};
```

---

### 5. Validation Schema

```ts
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});
```

---

## Architectural Decisions

- **SOA** chosen to isolate domains while enabling shared platform capabilities
- **Express** used for fast MVP development
- **Service Layer enforced** to avoid logic leakage
- **PostgreSQL** selected for relational integrity and analytics
- **Zod** used for shared, explicit validation
- **Shared database** to simplify reporting and cross-domain queries

---

## Final Verdict

```
Route → Controller → Service → Repository → Database
```

This backend architecture:

- aligns with the frontend architecture
- supports MVP speed without sacrificing quality
- allows painless scaling and refactoring
- keeps business logic clean and testable
