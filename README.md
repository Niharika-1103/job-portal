# HireSpark Job Portal

## Overview
HireSpark is a premium-looking job portal built with a React + Vite frontend and a Spring Boot backend. It includes home, jobs, authentication, dashboard, recruiter, and admin flows in a production-ready structure.

## Folder Structure
- src: React frontend pages and components
- backend: Spring Boot API

## Tech Stack
- Frontend: React, React Router, Bootstrap, Axios
- Backend: Spring Boot 3, Spring Security, Spring Data JPA, JWT, H2/MySQL

## Run the frontend
```bash
npm install
npm run dev
```
The app will be served at http://localhost:5173.

## Run the backend
```bash
cd backend
# Using the bundled Maven (Windows):
..\maven\apache-maven-3.9.9\bin\mvn.cmd spring-boot:run -s settings.xml
# Or if Maven is on your PATH:
mvn spring-boot:run -s settings.xml
```
The API will be served at http://localhost:8080/api.

## Build
```bash
# Backend
cd backend
..\maven\apache-maven-3.9.9\bin\mvn.cmd clean package -s settings.xml

# Frontend
npm run build
```

## API Base URL
http://localhost:8080/api

## Database
The backend uses H2 by default for local development. Update application.properties to use MySQL in production.

## Demo accounts
| Role | Username/Email | Password |
| ---- | -------------- | -------- |
| Job Seeker | Register via the UI (e.g. `seeker` / `password`) | self-set |
| Recruiter | Register via the UI (e.g. `recruiter@company.com` / `password`) | self-set |
| Admin | `admin` | `password` |

Sample companies (Northstar Labs, BrightPath, Quantix) and jobs are seeded automatically on startup via `data.sql`.

## API overview
### Authentication
- `POST /api/auth/register` — register job seeker
- `POST /api/auth/login` — login job seeker
- `POST /api/auth/recruiter/register` — register recruiter
- `POST /api/auth/recruiter/login` — login recruiter
- `POST /api/auth/admin/login` — login admin

### Public
- `GET /api/public/jobs` — active job listings
- `GET /api/public/companies` — all companies

### Seeker (JWT required)
- `GET /api/seeker/jobs` — available jobs
- `POST /api/seeker/apply/{jobId}` — apply to a job
- `GET /api/seeker/applications` — submitted applications
- `GET /api/seeker/saved` — saved jobs
- `POST /api/seeker/save/{jobId}` — save a job
- `DELETE /api/seeker/save/{savedJobId}` — remove a saved job

### Recruiter (JWT required)
- `GET /api/recruiter/jobs` — jobs for the recruiter's company
- `POST /api/recruiter/jobs` — create a job
- `PUT /api/recruiter/jobs/{id}` — update a job
- `DELETE /api/recruiter/jobs/{id}` — delete a job
- `GET /api/recruiter/jobs/{id}/applications` — applications for a job

### Admin (JWT required)
- `GET /api/admin/users` — all users
- `GET /api/admin/jobs` — all jobs

## Notes
- Authentication uses JWT.
- Role-based access is implemented via Spring Security.
- The current frontend uses local fallback data when the backend is not running.
