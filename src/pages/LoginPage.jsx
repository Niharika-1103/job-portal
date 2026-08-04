import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../services/auth';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', form);
      setAuth(response.data.token, response.data.role);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 p-4">
            <h3 className="fw-bold mb-3">Welcome back</h3>
            <p className="text-muted">Log in to continue your job search.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input className="form-control" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <button className="btn btn-primary w-100">Sign In</button>
            </form>
            <p className="text-muted small mt-3 mb-0">
              New here? <Link to="/register">Create an account</Link> •{" "}
              <Link to="/recruiter/login">Recruiter?</Link> •{" "}
              <Link to="/admin/login">Admin</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
