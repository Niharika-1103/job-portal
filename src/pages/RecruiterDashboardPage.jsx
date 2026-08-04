import { useEffect, useState } from 'react';
import api from '../services/api';

const emptyJob = { title: '', description: '', category: '', location: '', type: '', experience: '', salaryRange: '', companyId: null };

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState(null);
  const [applications, setApplications] = useState(null);
  const [message, setMessage] = useState('');

  const loadJobs = async () => {
    try {
      const response = await api.get('/recruiter/jobs');
      setJobs(response.data);
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const startCreate = () => {
    setForm(emptyJob);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (job) => {
    setForm({
      title: job.title || '',
      description: job.description || '',
      category: job.category || '',
      location: job.location || '',
      type: job.type || '',
      experience: job.experience || '',
      salaryRange: job.salaryRange || '',
      companyId: job.company?.id ?? null
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await api.put(`/recruiter/jobs/${editingId}`, form);
        setMessage('Job updated successfully.');
      } else {
        await api.post('/recruiter/jobs', form);
        setMessage('Job created successfully.');
      }
      setShowForm(false);
      setForm(emptyJob);
      setEditingId(null);
      loadJobs();
    } catch (error) {
      setMessage('Failed to save job.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await api.delete(`/recruiter/jobs/${id}`);
      loadJobs();
    } catch (error) {
      setMessage('Failed to delete job.');
    }
  };

  const viewApplications = async (jobId) => {
    try {
      const response = await api.get(`/recruiter/jobs/${jobId}/applications`);
      setApplications(response.data);
    } catch (error) {
      setApplications([]);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold">Recruiter dashboard</h2>
          <p className="text-muted">Manage your job listings and applicants.</p>
        </div>
        <button className="btn btn-primary" onClick={startCreate}>+ Post a Job</button>
      </div>

      {message && <div className="alert alert-info py-2">{message}</div>}

      {showForm && (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <h5 className="fw-semibold mb-3">{editingId ? 'Edit job' : 'Post a new job'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input className="form-control" value={form.title} onChange={handleChange('title')} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input className="form-control" value={form.category} onChange={handleChange('category')} />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="3" value={form.description} onChange={handleChange('description')} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Location</label>
                <input className="form-control" value={form.location} onChange={handleChange('location')} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Type</label>
                <input className="form-control" value={form.type} onChange={handleChange('type')} placeholder="Full-time" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Experience</label>
                <input className="form-control" value={form.experience} onChange={handleChange('experience')} />
              </div>
              <div className="col-12">
                <label className="form-label">Salary range</label>
                <input className="form-control" value={form.salaryRange} onChange={handleChange('salaryRange')} placeholder="$100k - $130k" />
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-primary">{editingId ? 'Update Job' : 'Create Job'}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setForm(emptyJob); setEditingId(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-5">Loading...</div> : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-lg-6" key={job.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">{job.title}</h5>
                      <p className="text-muted mb-2">{job.company?.name || 'Your company'}</p>
                    </div>
                    <span className="badge bg-primary-subtle text-primary">{job.category || 'General'}</span>
                  </div>
                  <p className="text-muted small">{job.location} • {job.type}</p>
                  <p className="fw-semibold text-success mb-3">{job.salaryRange}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => viewApplications(job.id)}>Applications</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => startEdit(job)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                <p className="text-muted mb-0">No jobs posted yet. Click &ldquo;Post a Job&rdquo; to get started.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {applications && (
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold mb-0">Applications</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setApplications(null)}>Close</button>
          </div>
          {applications.length === 0 ? (
            <p className="text-muted mb-0">No applications yet for this job.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {applications.map((app) => (
                <li key={app.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{app.user?.fullName || app.user?.username || 'Candidate'}</div>
                    <div className="text-muted small">{app.user?.email}</div>
                  </div>
                  <span className="badge bg-info-subtle text-info">{app.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboardPage;

