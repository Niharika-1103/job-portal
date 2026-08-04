# HireSpark Job Portal - Completion Checklist

## A. Frontend
- [x] 0. Explore project structure and understand the codebase
- [x] 1. Import Bootstrap CSS/JS in `src/main.jsx`
- [x] 2. Add `src/services/auth.js` helper (setAuth/getRole/isAuthenticated/logout)
- [x] 3. Add 401 interceptor in `src/services/api.js`
- [x] 4. Add `CompaniesPage` & `AboutPage` + register routes in `App.jsx`
- [x] 5. Add Recruiter flow (login, register, dashboard)
- [x] 6. Add Admin flow (login, dashboard)
- [x] 7. Update `LoginPage`/`RegisterPage` to store role via auth helper
- [x] 8. Update `Layout` to be role-aware + logout
- [x] 9. Connect Save/Apply buttons in `JobsPage`
- [x] 10. Update `DashboardPage` to fetch real saved jobs + applications

## B. Backend
- [x] 11. Add `GET /api/public/companies` in PublicController
- [x] 12. Add saved-jobs GET/DELETE + duplicate-application guard in SeekerController
- [x] 13. Scope RecruiterController to recruiter's company + applications endpoint
- [x] 14. Hide passwords + prevent JSON recursion in model entities
- [x] 15. Improve GlobalExceptionHandler (401/404)
- [x] 16. Use 401 on auth failure in AuthService
- [x] 17. Add repository query methods
- [x] 18. Seed sample companies & jobs in data.sql

## C. Verification
- [x] 19. Compile backend
- [x] 20. Build frontend
- [x] 21. Update README with demo accounts & run instructions

