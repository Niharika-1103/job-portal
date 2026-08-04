# API Documentation

## Authentication
### POST /api/auth/register
Registers a job seeker.

### POST /api/auth/login
Logs in a job seeker.

### POST /api/auth/recruiter/register
Registers a recruiter.

### POST /api/auth/recruiter/login
Logs in a recruiter.

### POST /api/auth/admin/login
Logs in an admin.

## Public
### GET /api/public/jobs
Returns active job listings.

## Seeker
### GET /api/seeker/jobs
Returns available jobs.

### POST /api/seeker/apply/{jobId}
Applies to a job.

### GET /api/seeker/applications
Returns submitted applications.

## Recruiter
### GET /api/recruiter/jobs
Returns recruiter-managed jobs.

## Admin
### GET /api/admin/users
Returns users.

### GET /api/admin/jobs
Returns all jobs.
