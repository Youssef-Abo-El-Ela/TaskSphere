# TaskSphere 🌐

A modular, RESTful backend API for task and project management. TaskSphere enables teams to collaborate effectively by organizing work into projects, assigning tasks, and tracking progress — all through a clean, layered Node.js architecture backed by both MongoDB and PostgreSQL.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Architecture Layers](#architecture-layers)
- [Setup & Installation](#setup--installation)
- [Database Setup & Configuration](#database-setup--configuration)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Projects](#projects)
  - [Teams](#teams)
  - [Tasks](#tasks)
  - [Analytics](#analytics)
  - [System Status](#system-status)
- [Example API Requests & Responses](#example-api-requests--responses)

---

## Project Overview

TaskSphere is a backend REST API that helps teams manage projects and tasks efficiently. Core capabilities include:

- **User management** — create, retrieve, update, and soft-delete users.
- **Project management** — users can own and manage multiple projects with deadlines and team assignments.
- **Team management** — create teams with leaders and members, link them to projects.
- **Task management** — create tasks inside projects, assign them to team members, and track their status (`To Do`, `In Progress`, `Done`).
- **Analytics** — aggregate insights per project (number of tasks, completed tasks, teams).
- **Data export** — export analytics and project task data to JSON report files.
- **System status page** — live view of server uptime, total requests, and average response time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Primary DB (Users, Projects, Teams) | MongoDB via Mongoose |
| Secondary DB (Tasks) | PostgreSQL via Sequelize |
| Validation | Joi |
| Logging | Morgan + Winston |
| Templating (Status Page) | EJS |
| Dev tooling | Nodemon |

---

## Folder Structure

```
TaskSphere/
├── src/
│   ├── app.js                    # Express app setup, middleware wiring, route mounting
│   ├── server.js                 # HTTP server entry point
│   ├── config/
│   │   ├── mongoose.js           # MongoDB connection setup
│   │   └── sequelize.js          # PostgreSQL connection & sync setup
│   ├── controllers/
│   │   ├── userController.js     # Request handling for user routes
│   │   ├── projectsController.js # Request handling for project routes
│   │   ├── teamController.js     # Request handling for team routes
│   │   ├── tasksController.js    # Request handling for task routes
│   │   ├── analyticsController.js# Request handling for analytics routes
│   │   └── statusController.js   # System status page handler
│   ├── services/
│   │   ├── usersService.js       # Business logic for users
│   │   ├── projectsService.js    # Business logic for projects
│   │   ├── teamsService.js       # Business logic for teams
│   │   ├── tasksService.js       # Business logic for tasks
│   │   └── analyticsService.js   # Business logic for analytics aggregation
│   ├── repositories/
│   │   ├── users.js              # DB queries for users (MongoDB)
│   │   ├── projects.js           # DB queries for projects (MongoDB)
│   │   ├── teams.js              # DB queries for teams (MongoDB)
│   │   └── tasks.js              # DB queries for tasks (PostgreSQL)
│   ├── models/
│   │   ├── mongodb/
│   │   │   ├── User.model.js     # Mongoose User schema
│   │   │   ├── Project.model.js  # Mongoose Project schema
│   │   │   └── Team.model.js     # Mongoose Team schema
│   │   └── postgresql/
│   │       └── Tasks.js          # Sequelize Task model
│   ├── routes/
│   │   ├── userRoutes.js         # /api/users routes
│   │   ├── userProjectsRoutes.js # /api/:userId/projects routes
│   │   ├── userTeamsRoutes.js    # /api/:userId/teams routes
│   │   ├── userTasksRoutes.js    # /api/:userId/projects/:projectId/tasks routes
│   │   └── analyticsRoutes.js    # /api/analytics routes
│   ├── middlewares/
│   │   ├── asyncWrapper.js       # Wraps async controllers for error forwarding
│   │   ├── errorhandler.js       # Global error handler middleware
│   │   ├── isValidUser.js        # Validates userId param on protected routes
│   │   ├── morganLogger.js       # HTTP request/error logging (Morgan)
│   │   ├── winstonLogger.js      # File/console logger (Winston)
│   │   ├── userValidation.js     # Joi validation for user requests
│   │   ├── projectValidation.js  # Joi validation for project requests
│   │   ├── taskValidation.js     # Joi validation for task requests
│   │   └── teamValidation.js     # Joi validation for team requests
│   └── views/
│       └── statusPage.ejs        # EJS template for /status page
├── reports/                      # Auto-generated JSON export files
├── TaskSphere.postman_collection.json
├── package.json
└── .env                          # Environment variables (not committed)
```

---

## Architecture Layers

TaskSphere follows a strict **layered (N-tier) architecture** to keep concerns separated and the codebase maintainable:

```
Request → Route → Middleware (validation / auth) → Controller → Service → Repository → Database
```

| Layer | Responsibility |
|---|---|
| **Routes** | Define URL paths and HTTP methods; mount middleware and controllers |
| **Middleware** | Handle cross-cutting concerns: auth checks, request validation, logging, error handling |
| **Controllers** | Parse the HTTP request/response; delegate business work to services |
| **Services** | Contain all business logic and orchestration; call repositories for data access |
| **Repositories** | Abstract all database queries; the only layer that directly touches Mongoose/Sequelize |
| **Models** | Define data schemas and structures for MongoDB (Mongoose) and PostgreSQL (Sequelize) |

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- [PostgreSQL](https://www.postgresql.org/) instance (local or cloud)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Youssef-Abo-El-Ela/TaskSphere.git
   cd TaskSphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create the environment file**
   ```bash
   cp .env.example .env
   ```
   Fill in the required values (see [Environment Variables](#environment-variables)).

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Database Setup & Configuration

### MongoDB

TaskSphere uses MongoDB to store **Users**, **Projects**, and **Teams**.

- Provide your MongoDB connection string in the `MONGODB_URI` environment variable.
- Mongoose will automatically handle schema creation on first connection.

**Local example:**
```
MONGODB_URI=mongodb://localhost:27017/tasksphere
```

**MongoDB Atlas example:**
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tasksphere?retryWrites=true&w=majority
```

### PostgreSQL

TaskSphere uses PostgreSQL to store **Tasks**.

- Provide your PostgreSQL connection string in the `POSTGRES_URI` environment variable.
- Sequelize will automatically sync (create) the `Tasks` table on startup via `sequelize.sync()`.

**Local example:**
```
POSTGRES_URI=postgres://postgres:yourpassword@localhost:5432/tasksphere
```

**Cloud example (e.g. Neon, Supabase, Railway):**
```
POSTGRES_URI=postgres://<user>:<password>@<host>/<dbname>?sslmode=require
```

---

## Environment Variables

Create a `.env` file in the project root with the following keys:

```env
# Server
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/tasksphere

# PostgreSQL
POSTGRES_URI=postgres://postgres:yourpassword@localhost:5432/tasksphere
```

---

## Running the Server

| Command | Description |
|---|---|
| `npm run dev` | Start with Nodemon (auto-restart on file changes) |
| `node src/server.js` | Start without auto-restart |

Once running, the API is available at `http://localhost:<PORT>`.

---

## API Endpoints

> **Note:** Routes prefixed with `/api/:userId/...` require the user to exist and be active. An `isValidUser` middleware validates the `userId` on every such request.

---

### Users

Base path: `/api/users`

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/users` | Create a new user |
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:userId` | Get a specific user by ID |
| `PATCH` | `/api/users/:userId` | Update a user's name or active status |
| `DELETE` | `/api/users/:userId` | Soft-delete (deactivate) a user |

---

### Projects

Base path: `/api/:userId/projects`

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/:userId/projects` | Get all projects for a user |
| `POST` | `/api/:userId/projects` | Create a new project |
| `GET` | `/api/:userId/projects/:projectId` | Get a specific project by ID |
| `PATCH` | `/api/:userId/projects/:projectId` | Update a project (creator or team leader only) |
| `DELETE` | `/api/:userId/projects/:projectId` | Delete a project (creator only) |

---

### Teams

Base path: `/api/:userId/teams`

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/:userId/teams` | Create a new team (requesting user becomes leader) |
| `GET` | `/api/:userId/teams` | Get all teams the user belongs to |
| `GET` | `/api/:userId/teams/:teamId` | Get a specific team by ID |
| `PUT` | `/api/:userId/teams/:teamId` | Update a team's name, members, or leader (leader only) |
| `DELETE` | `/api/:userId/teams/:teamId` | Delete a team (leader only) |

---

### Tasks

Base path: `/api/:userId/projects/:projectId/tasks`

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/:userId/projects/:projectId/tasks` | Create a new task in a project |
| `GET` | `/api/:userId/projects/:projectId/tasks/teams/:teamId` | Get all tasks assigned to a team within a project |
| `GET` | `/api/:userId/projects/:projectId/tasks/:taskId` | Get a specific task by ID |
| `PATCH` | `/api/:userId/projects/:projectId/tasks/:taskId` | Update a task (title, description, status, deadline, assignees, team) |
| `DELETE` | `/api/:userId/projects/:projectId/tasks/:taskId` | Delete a task |

---

### Analytics

Base path: `/api/analytics`

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/analytics` | Get aggregated analytics for all projects (tasks count, completed tasks, teams) |
| `GET` | `/api/analytics/:projectId/task-data` | Get detailed task data for a specific project |
| `GET` | `/api/analytics/export` | Export all analytics data to a JSON file in `/reports` |
| `GET` | `/api/analytics/export-project-tasks-data/:projectId` | Export task data for a specific project to a JSON file in `/reports` |

---

### System Status

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/status` | Render an HTML status page showing uptime, total requests, and average response time |

---

## Example API Requests & Responses

### Create a User

**Request**
```http
POST /api/users
Content-Type: application/json

{
  "name": "Alice"
}
```

**Response** `201 Created`
```json
{
  "data": {
    "_id": "64f1c2e3a1b2c3d4e5f67890",
    "name": "Alice",
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  },
  "message": "User created successfully"
}
```

---

### Get All Users

**Request**
```http
GET /api/users
```

**Response** `200 OK`
```json
{
  "data": [
    {
      "_id": "64f1c2e3a1b2c3d4e5f67890",
      "name": "Alice",
      "isActive": true,
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "message": "Users retrieved successfully"
}
```

> 📸 **Postman Screenshot — Get All Users**
> <!-- Insert your Postman screenshot here -->

---

### Create a Project

**Request**
```http
POST /api/64f1c2e3a1b2c3d4e5f67890/projects
Content-Type: application/json

{
  "title": "Website Redesign",
  "description": "Full redesign of the company website",
  "deadline": "2024-06-30",
  "teamId": "64f1c2e3a1b2c3d4e5f67891"
}
```

**Response** `201 Created`
```json
{
  "message": "Project created successfully",
  "data": {
    "_id": "64f1c2e3a1b2c3d4e5f67892",
    "title": "Website Redesign",
    "description": "Full redesign of the company website",
    "deadline": "2024-06-30T00:00:00.000Z",
    "tasks": [],
    "teams": ["64f1c2e3a1b2c3d4e5f67891"],
    "createdBy": "64f1c2e3a1b2c3d4e5f67890",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

> 📸 **Postman Screenshot — Create Project**
> <!-- Insert your Postman screenshot here -->

---

### Create a Team

**Request**
```http
POST /api/64f1c2e3a1b2c3d4e5f67890/teams
Content-Type: application/json

{
  "name": "Frontend Team"
}
```

**Response** `201 Created`
```json
{
  "message": "Team created successfully",
  "data": {
    "_id": "64f1c2e3a1b2c3d4e5f67891",
    "name": "Frontend Team",
    "members": ["64f1c2e3a1b2c3d4e5f67890"],
    "leader": "64f1c2e3a1b2c3d4e5f67890",
    "projects": [],
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

> 📸 **Postman Screenshot — Create Team**
> <!-- Insert your Postman screenshot here -->

---

### Create a Task

**Request**
```http
POST /api/64f1c2e3a1b2c3d4e5f67890/projects/64f1c2e3a1b2c3d4e5f67892/tasks
Content-Type: application/json

{
  "title": "Design homepage mockup",
  "description": "Create Figma mockups for the new homepage",
  "deadline": "2024-03-15",
  "assignedTo": ["64f1c2e3a1b2c3d4e5f67890"],
  "teamId": "64f1c2e3a1b2c3d4e5f67891"
}
```

**Response** `201 Created`
```json
{
  "message": "Task created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Design homepage mockup",
    "description": "Create Figma mockups for the new homepage",
    "status": "To Do",
    "deadline": "2024-03-15T00:00:00.000Z",
    "assignedTo": ["64f1c2e3a1b2c3d4e5f67890"],
    "assignedTeam": "64f1c2e3a1b2c3d4e5f67891",
    "createdBy": "64f1c2e3a1b2c3d4e5f67890",
    "projectId": "64f1c2e3a1b2c3d4e5f67892",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

> 📸 **Postman Screenshot — Create Task**
> <!-- Insert your Postman screenshot here -->

---

### Update a Task

**Request**
```http
PATCH /api/64f1c2e3a1b2c3d4e5f67890/projects/64f1c2e3a1b2c3d4e5f67892/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890
Content-Type: application/json

{
  "status": "In Progress"
}
```

**Response** `200 OK`
```json
{
  "message": "Task updated successfully"
}
```

> 📸 **Postman Screenshot — Update Task**
> <!-- Insert your Postman screenshot here -->

---

### Get Analytics

**Request**
```http
GET /api/analytics
```

**Response** `200 OK`
```json
{
  "message": "Analytics data retrieved successfully",
  "data": [
    {
      "projectId": "64f1c2e3a1b2c3d4e5f67892",
      "projectName": "Website Redesign",
      "numOfTasks": 5,
      "numOfCompletedTasks": 2,
      "numOfTeams": 1
    }
  ]
}
```

> 📸 **Postman Screenshot — Get Analytics**
> <!-- Insert your Postman screenshot here -->

---

### Error Response Example

When a validation error or resource is not found, the API returns a structured error:

```json
{
  "message": "User not found"
}
```

```json
{
  "message": "Validation error: \"name\" is required"
}
```

> 📸 **Postman Screenshot — Error Response**
> <!-- Insert your Postman screenshot here -->
