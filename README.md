# Work Order Management

A full-stack work order management application built with **Spring Boot** (Java 17) and **Angular 17**.

## Project Structure

```
work-order-management/
├── backend/                  # Spring Boot REST API
│   └── src/main/java/com/workorder/
│       ├── config/           # CORS and web configuration
│       ├── controller/       # REST controllers
│       ├── dto/              # Request/response DTOs
│       ├── exception/        # Global error handling
│       ├── model/            # JPA entities and enums
│       ├── repository/       # Spring Data JPA repositories
│       └── service/          # Business logic (interface + impl)
├── frontend/                 # Angular SPA
│   └── src/app/
│       ├── components/       # work-order-list, work-order-form
│       ├── models/           # TypeScript interfaces
│       └── services/         # HTTP service layer
├── start-backend.sh
├── start-frontend.sh
└── start-all.sh
```

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- Angular CLI 17+

## Running the Application

### Start both services together
```bash
./start-all.sh
```

### Or start individually

**Backend** (http://localhost:8080):
```bash
./start-backend.sh
```

**Frontend** (http://localhost:4200):
```bash
./start-frontend.sh
```

## API Endpoints

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| GET    | /api/work-orders          | List all work orders  |
| GET    | /api/work-orders/{id}     | Get a work order      |
| POST   | /api/work-orders          | Create a work order   |
| PUT    | /api/work-orders/{id}     | Update a work order   |
| DELETE | /api/work-orders/{id}     | Delete a work order   |

The H2 console is available at http://localhost:8080/h2-console (dev only).

## Data Model

| Field       | Type              | Notes                          |
|-------------|-------------------|--------------------------------|
| id          | Long              | Auto-generated                 |
| title       | String            | Required                       |
| description | String            | Optional, up to 2000 chars     |
| status      | WorkOrderStatus   | OPEN, IN_PROGRESS, COMPLETED, CANCELLED |
| priority    | WorkOrderPriority | LOW, MEDIUM, HIGH              |
| assignee    | String            | Optional                       |
| createdAt   | LocalDateTime     | Auto-set on create             |
| updatedAt   | LocalDateTime     | Auto-set on update             |
