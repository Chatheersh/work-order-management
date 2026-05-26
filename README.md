# Work Order Management

A full-stack work order management application built with **Spring Boot (Java 17)** and **Angular 17**.

## Project Structure

```
work-order-management/
├── backend/                  # Spring Boot REST API
│   └── src/main/java/com/fiix/workorder/
│       ├── WorkOrderApplication.java
│       ├── config/           # CORS, future security config
│       ├── controller/       # REST endpoints
│       ├── dto/              # API request/response shapes
│       ├── exception/        # Error handling
│       ├── model/            # JPA entities and enums
│       ├── repository/       # Spring Data JPA
│       └── service/          # Business logic
├── frontend/                 # Angular 17 SPA
│   └── src/app/
│       ├── core/             # Models and shared services
│       └── work-orders/
│           ├── list/         # Work order list view
│           ├── detail/       # Work order detail view
│           └── form/         # Create / edit form
├── start-backend.sh
└── start-frontend.sh
```

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| Angular CLI | 17+ |

Install Angular CLI globally if needed:
```bash
npm install -g @angular/cli
```

## Running the Application

Open two terminals:

**Terminal 1 — Backend**
```bash
./start-backend.sh
```
API available at `http://localhost:8080/api/work-orders`  
H2 console at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:workorderdb`)

**Terminal 2 — Frontend**
```bash
./start-frontend.sh
```
App available at `http://localhost:4200`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/work-orders` | List all work orders |
| GET | `/api/work-orders?status=OPEN` | Filter by status |
| GET | `/api/work-orders/{id}` | Get by ID |
| POST | `/api/work-orders` | Create work order |
| PUT | `/api/work-orders/{id}` | Update work order |
| DELETE | `/api/work-orders/{id}` | Delete work order |

## Enums

**Status:** `OPEN`, `IN_PROGRESS`, `ON_HOLD`, `COMPLETED`, `CANCELLED`  
**Priority:** `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`

## Switching to PostgreSQL

Edit `backend/src/main/resources/application.properties` and follow the commented instructions at the bottom of the file. Add the PostgreSQL driver dependency to `pom.xml`:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## Adding Features

- **New entity** → add model, repository, service, controller, DTO in their respective packages
- **Frontend page** → add component in `frontend/src/app/`, register route in `app.routes.ts`
- **Shared UI** → add global styles to `frontend/src/styles.css`
