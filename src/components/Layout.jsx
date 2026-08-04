import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, getRole, logout } from '../services/auth';

const Layout = () => {
  const [auth, setAuth] = useState(isAuthenticated());
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAuth(false);
    navigate('/');
  };

  const dashboardPath = role === 'RECRUITER'
    ? '/recruiter/dashboard'
    : role === 'ADMIN'
      ? '/admin/dashboard'
      : '/dashboard';

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">HireSpark</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navCollapse">
            <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
              <li className="nav-item"><NavLink className="nav-link" to="/jobs">Jobs</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/companies">Companies</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
              {!auth ? (
                <>
                  <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                  <li className="nav-item"><NavLink className="btn btn-light btn-sm" to="/register">Join Now</NavLink></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><NavLink className="btn btn-outline-light btn-sm" to={dashboardPath}>Dashboard</NavLink></li>
                  <li className="nav-item"><button className="btn btn-link nav-link text-light" onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer py-5 mt-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5>HireSpark</h5>
              <p className="text-muted">Connecting ambitious professionals with opportunity-driven companies.</p>
            </div>
            <div className="col-md-4">
              <h5>Explore</h5>
              <ul className="list-unstyled text-muted">
                <li>Featured jobs</li>
                <li>Top companies</li>
                <li>Career resources</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <ul className="list-unstyled text-muted">
                <li>hello@hirespark.com</li>
                <li>+1 800 555 0199</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
