import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../services/auth';

const RecruiterRegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', companyName: '', fullName: '', phone: '', location: '', website: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/recruiter/register', form);
      setAuth(response.data.token, response.data.role);
      navigate('/recruiter/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg rounded-4 p-4">
            <h3 className="fw-bold mb-3">Register your company</h3>
            <p className="text-muted">Create a recruiter account to post jobs.</p>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full name</label>
                  <input className="form-control" value={form.fullName} onChange={handleChange('fullName')} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Company name</label>
                  <input className="form-control" value={form.companyName} onChange={handleChange('companyName')} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={form.email} onChange={handleChange('email')} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={form.password} onChange={handleChange('password')} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input className="form-control" value={form.phone} onChange={handleChange('phone')} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input className="form-control" value={form.location} onChange={handleChange('location')} />
                </div>
                <div className="col-12">
                  <label className="form-label">Website</label>
                  <input className="form-control" value={form.website} onChange={handleChange('website')} />
                </div>
              </div>
              <button className="btn btn-primary mt-4 w-100">Create Recruiter Account</button>
            </form>
            <p className="text-muted small mt-3 mb-0">
              Already have an account? <Link to="/recruiter/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterRegisterPage;

