# GitHub Copilot Workshop — Work Order Management Exercises

This document contains hands-on exercises for learning how to leverage **GitHub Copilot** while building real features on a CMMS (Computerized Maintenance Management System) application. The app is built with **Spring Boot** (Java 17) + **Angular 17**.

Use Copilot Chat, inline suggestions, and agent mode throughout each exercise. The goal is to learn *how* to prompt and collaborate with Copilot, not just to get the feature done.

---

## How to Use This Guide

- **Skill level tags:** 🟢 Beginner · 🟡 Intermediate · 🔴 Advanced
- **Copilot hints** in each exercise suggest what to ask or how to prompt Copilot.
- Feel free to tackle exercises in any order.

---

## Exercise 1 — Add Work Order Tasks (Sub-tasks) 🟡

Work orders should support a checklist of tasks that technicians must complete. Add a `WorkOrderTask` entity with fields like `description`, `completed`, and `order` (sequence number), linked to a parent `WorkOrder`.

**What to build:**
- `WorkOrderTask` JPA entity with a `@ManyToOne` relationship to `WorkOrder`
- CRUD endpoints under `/api/work-orders/{id}/tasks`
- Angular component to display and check off tasks within a work order detail view

**Copilot hints:**
- Highlight the `WorkOrder` entity and ask Copilot to generate a related child entity
- Ask: *"Generate a Spring Data JPA repository and service for WorkOrderTask"*
- Ask Copilot to write an Angular component that renders a checklist

---

## Exercise 2 — Identify and Fix Bugs 🟢

Audit the existing codebase for bugs, missing validations, and bad practices. There are several intentional and unintentional issues hiding in the code.

**Things to look for:**
- Missing input validation on the backend (e.g., empty `title`, no length limits)
- The API returns JPA entities directly instead of response DTOs — this can leak internal fields and cause serialization issues
- Error responses have inconsistent structure
- The H2 console is enabled with no authentication — a security concern
- `WorkOrderPriority` is missing a `CRITICAL` level common in CMMS systems
- Frontend has no loading states or error handling on HTTP failures

**Copilot hints:**
- Open a file and ask: *"Review this code for bugs, security issues, and missing validations"*
- Ask: *"What are the risks of returning JPA entities directly from a REST controller?"*
- Use Copilot to generate `@NotBlank`, `@Size`, and `@NotNull` validation annotations on the request DTO

---

## Exercise 3 — Add Equipment / Asset Management 🟡

A core CMMS feature is tracking physical assets (equipment, machinery, vehicles). Add equipment records and link them to work orders.

**What to build:**
- `Equipment` entity with fields: `name`, `serialNumber`, `model`, `manufacturer`, `location`, `status` (`ACTIVE`, `INACTIVE`, `UNDER_MAINTENANCE`)
- Full CRUD API at `/api/equipment`
- A `@ManyToOne` relationship from `WorkOrder` to `Equipment` (a work order is performed on a piece of equipment)
- Angular page to manage equipment and select equipment when creating/editing a work order

**Copilot hints:**
- Ask: *"Design a JPA entity for equipment in a CMMS application"*
- Ask Copilot to generate the full Angular service and component for equipment management
- Ask: *"How do I add a foreign key relationship between WorkOrder and Equipment using Spring Data JPA?"*

---

## Exercise 4 — Connect to MySQL or PostgreSQL 🟡

The app currently uses an in-memory H2 database — data is lost on restart. Migrate it to a persistent relational database.

**What to build:**
- Add the appropriate JDBC driver dependency to `pom.xml`
- Update `application.properties` with a datasource URL, username, and password
- Add Flyway or Liquibase for schema migrations
- Create an initial migration script for the `work_orders` table

**Copilot hints:**
- Ask: *"Update my Spring Boot application.properties to use PostgreSQL instead of H2"*
- Ask: *"Generate a Flyway migration SQL script for the WorkOrder entity"*
- Ask: *"What is the difference between Flyway and Liquibase and which should I use?"*

---

## Exercise 5 — Generate Unit and Integration Tests 🟢

Use Copilot to dramatically speed up test coverage. The project currently has minimal tests.

**What to build:**
- JUnit 5 unit tests for `WorkOrderServiceImpl` using Mockito
- Integration tests for `WorkOrderController` using `@SpringBootTest` and `MockMvc`
- Jasmine/Karma unit tests for the Angular `WorkOrderService` and components

**Copilot hints:**
- Place your cursor inside any service method and press `Ctrl+I` — ask Copilot to generate a test
- Ask: *"Write a MockMvc integration test for the POST /api/work-orders endpoint"*
- Open a `.spec.ts` file and ask: *"Generate Jasmine tests for this Angular service with mocked HttpClient"*

---

## Exercise 6 — Add Due Dates and SLA Tracking 🟡

Work orders need deadlines. Add due date support and flag work orders that are overdue.

**What to build:**
- Add `dueDate` and `estimatedHours` fields to `WorkOrder`
- Add a backend method to query all overdue open work orders
- A new endpoint `GET /api/work-orders/overdue`
- Frontend highlighting (e.g., red row) for overdue work orders
- Optional: add an SLA status field (`ON_TIME`, `AT_RISK`, `BREACHED`)

**Copilot hints:**
- Ask: *"Write a Spring Data JPA query to find all work orders where dueDate is before today and status is not COMPLETED"*
- Ask Copilot to write an Angular pipe that formats and color-codes a due date

---

## Exercise 7 — Add Comments and Notes 🟡

Allow technicians and managers to add comments to a work order, creating a running conversation thread.

**What to build:**
- `WorkOrderComment` entity with `text`, `author`, and `createdAt`
- `@ManyToOne` relationship to `WorkOrder`
- REST endpoint `POST /api/work-orders/{id}/comments` and `GET /api/work-orders/{id}/comments`
- Angular UI to display and post comments within a work order detail view

**Copilot hints:**
- Ask: *"Generate a Spring Boot REST endpoint for adding comments to a work order"*
- Ask: *"Create an Angular component for a comment thread that posts to a REST API"*

---

## Exercise 8 — Add Search, Filtering, and Sorting 🟡

The current list of work orders has no filtering. Add the ability to search and filter from both the API and the UI.

**What to build:**
- Backend: support query parameters on `GET /api/work-orders` for `status`, `priority`, `assignee`, and a `search` keyword (searches title and description)
- Use Spring Data JPA `Specification` or a custom JPQL query
- Frontend: add a filter bar above the work order list with dropdowns and a search input

**Copilot hints:**
- Ask: *"How do I implement dynamic query filtering with Spring Data JPA Specifications?"*
- Ask: *"Generate an Angular reactive form for filtering a list by status, priority, and keyword"*

---

## Exercise 9 — Add Pagination Support 🟡

When the work order list grows, loading all records at once becomes a problem. Add server-side pagination.

**What to build:**
- Update `GET /api/work-orders` to accept `page` and `size` query parameters
- Return a `Page<WorkOrder>` response with total count and page metadata
- Update the Angular component to render a paginator (Angular Material `mat-paginator` or similar)

**Copilot hints:**
- Ask: *"Update my Spring Boot controller to return paginated results using Spring Data's Pageable"*
- Ask: *"Add Angular Material paginator to my existing work order list component"*

---

## Exercise 10 — Add Preventive Maintenance Scheduling 🔴

Beyond reactive work orders, a CMMS must support scheduled preventive maintenance. Add recurring maintenance plans.

**What to build:**
- `MaintenancePlan` entity with fields: `name`, `description`, `linkedEquipment`, `frequency` (`DAILY`, `WEEKLY`, `MONTHLY`, `ANNUAL`), `nextDueDate`, `lastCompletedDate`
- A scheduled job (Spring `@Scheduled`) that automatically generates work orders when a maintenance plan comes due
- Angular page to manage maintenance plans

**Copilot hints:**
- Ask: *"Design a JPA entity for a preventive maintenance schedule in a CMMS"*
- Ask: *"Write a Spring @Scheduled task that checks maintenance plans daily and creates work orders"*
- Ask: *"What cron expression do I use to run a Spring scheduled task every day at midnight?"*

---

## Exercise 11 — Add Technician / User Management 🟡

Replace the free-text `assignee` field with a proper user/technician model.

**What to build:**
- `Technician` entity with `name`, `email`, `phone`, `specialization`, `department`
- Replace the `assignee` string on `WorkOrder` with a `@ManyToOne` to `Technician`
- REST API for managing technicians
- Angular dropdown to select a technician when creating or editing a work order

**Copilot hints:**
- Ask: *"Refactor the WorkOrder entity to use a ManyToOne relationship to a Technician entity instead of a plain assignee string"*
- Ask: *"Generate the Angular service, model, and dropdown component for technician selection"*

---

## Exercise 12 — Add Inventory and Parts Management 🔴

Technicians need parts to complete work orders. Add an inventory system and link parts usage to work orders.

**What to build:**
- `Part` entity with `partNumber`, `name`, `description`, `quantityOnHand`, `unitCost`, `reorderThreshold`
- `WorkOrderPart` join entity to track parts consumed on a work order (quantity used, cost)
- Low-stock alerts: a query that returns parts below `reorderThreshold`
- Angular inventory screen

**Copilot hints:**
- Ask: *"Design a parts inventory JPA model that supports tracking consumption per work order"*
- Ask: *"Write a Spring Data query to find all parts with quantity below their reorder threshold"*

---

## Exercise 13 — Add Audit Trail and Change History 🔴

Track every change made to a work order — who changed what and when. This is a compliance requirement in many industries.

**What to build:**
- `WorkOrderAuditLog` entity capturing `fieldChanged`, `oldValue`, `newValue`, `changedBy`, `changedAt`
- Intercept updates in `WorkOrderServiceImpl` to compare old and new values and write audit records
- Alternatively, explore using **Hibernate Envers** for automatic auditing
- An endpoint to retrieve the audit log for a given work order

**Copilot hints:**
- Ask: *"How do I implement audit logging in Spring Boot using Hibernate Envers?"*
- Ask: *"Write code to compare two WorkOrder objects and log which fields changed"*

---

## Exercise 14 — Add a Reporting Dashboard 🔴

Management needs visibility into operational metrics. Build a reporting page with key CMMS KPIs.

**What to build:**
- Backend aggregate endpoints:
  - Work orders by status (count per status)
  - Average time to complete a work order
  - Open work orders by priority
  - Top 5 most-maintained equipment
- Angular dashboard page with charts (e.g., using Chart.js or ng2-charts)

**Copilot hints:**
- Ask: *"Write a JPQL query to count work orders grouped by status"*
- Ask: *"Generate an Angular dashboard component using Chart.js with a bar chart and pie chart"*
- Ask Copilot to design a `DashboardSummaryDTO` that bundles all metrics into one response

---

## Exercise 15 — Add Email Notifications 🔴

Notify technicians when they are assigned a work order and remind them of upcoming due dates.

**What to build:**
- Add Spring Boot Mail (`spring-boot-starter-mail`) dependency
- Configure SMTP settings in `application.properties` (use Mailtrap or similar for testing)
- Send an email when a work order is created with an assignee
- Send a daily digest of overdue work orders to a configured manager address

**Copilot hints:**
- Ask: *"How do I configure Spring Boot to send emails with Gmail SMTP?"*
- Ask: *"Write a Spring Boot service that sends an HTML email when a work order is assigned"*
- Ask: *"Generate an HTML email template for a work order assignment notification"*

---

## Exercise 16 — Add Location and Facility Management 🟡

Work orders and equipment are associated with physical locations. Add a location hierarchy.

**What to build:**
- `Location` entity with `name`, `building`, `floor`, `room`, and an optional `@ManyToOne` parent `Location` for hierarchy (e.g., Site > Building > Floor > Room)
- Link `Equipment` and `WorkOrder` to a `Location`
- Breadcrumb display in the UI (e.g., "Main Campus > Building A > Floor 2 > Server Room")

**Copilot hints:**
- Ask: *"Design a self-referencing JPA entity for a hierarchical location model"*
- Ask: *"How do I query a recursive tree structure in Spring Data JPA?"*

---

## Exercise 17 — Add File Attachments 🔴

Technicians should be able to attach photos and documents to work orders (e.g., photos of damaged equipment).

**What to build:**
- Backend: `POST /api/work-orders/{id}/attachments` endpoint accepting multipart file uploads
- Store files on disk or in an S3-compatible bucket (use LocalStack for local testing)
- `WorkOrderAttachment` entity tracking `fileName`, `contentType`, `storagePath`, `uploadedBy`, `uploadedAt`
- Angular file upload component with preview for images

**Copilot hints:**
- Ask: *"Write a Spring Boot REST endpoint that accepts multipart file uploads and saves them to disk"*
- Ask: *"Generate an Angular component with a file drop zone that uploads to a REST API"*

---

## Exercise 18 — Add API Documentation with OpenAPI / Swagger 🟢

Self-documenting APIs help teams onboard faster. Use Copilot to annotate the existing API.

**What to build:**
- Add `springdoc-openapi-starter-webmvc-ui` dependency to `pom.xml`
- Annotate controllers with `@Operation`, `@Parameter`, and `@ApiResponse`
- Add `@Schema` to DTOs and models
- Verify Swagger UI is accessible at `http://localhost:8080/swagger-ui.html`

**Copilot hints:**
- Highlight a controller method and ask: *"Add OpenAPI 3 annotations to this endpoint"*
- Ask: *"Generate the OpenAPI configuration bean for a Spring Boot application"*
- Ask Copilot to write descriptions for each field in the `WorkOrderRequest` DTO

---

## Exercise 19 — Containerize with Docker 🟡

Package the application so it can be run anywhere without installing Java or Node.js locally.

**What to build:**
- `Dockerfile` for the Spring Boot backend (multi-stage build: Maven build → slim JRE image)
- `Dockerfile` for the Angular frontend (multi-stage build: Node build → Nginx serving)
- `docker-compose.yml` that starts the backend, frontend, and a PostgreSQL database together
- Environment variable support for database credentials (no hardcoded secrets)

**Copilot hints:**
- Ask: *"Write a multi-stage Dockerfile for a Spring Boot Maven application"*
- Ask: *"Write a multi-stage Dockerfile for an Angular application served by Nginx"*
- Ask: *"Generate a docker-compose.yml for a Spring Boot backend, Angular frontend, and PostgreSQL"*

---

## Tips for Getting the Most Out of GitHub Copilot

| Technique | How to Use It |
|---|---|
| **Inline suggestion** | Start typing — accept with `Tab` |
| **Copilot Chat** | Open with `Ctrl+Shift+I` — ask anything about your code |
| **Ask about selection** | Highlight code → right-click → *Copilot: Explain* or *Fix* |
| **Agent mode** | Use `@workspace` to ask questions about the whole project |
| **Generate from comment** | Write a comment describing what you want, then let Copilot fill in the code |
| **Iterate** | If the first suggestion isn't right, tell Copilot what's wrong and ask it to try again |

---

## Getting Started

```bash
# Clone and start the application
./start-all.sh

# Backend runs at:  http://localhost:8080
# Frontend runs at: http://localhost:4200
# H2 Console at:    http://localhost:8080/h2-console
```

Happy building — and let Copilot do the heavy lifting!
