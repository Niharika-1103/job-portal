import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, jobsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/jobs')
        ]);
        setUsers(usersRes.data);
        setJobs(jobsRes.data);
      } catch (error) {
        setUsers([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">Admin dashboard</h2>
      <p className="text-muted mb-4">Platform overview and management.</p>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5>Total users</h5>
            <p className="display-6 fw-bold">{users.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5>Total jobs</h5>
            <p className="display-6 fw-bold">{jobs.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5>Active jobs</h5>
            <p className="display-6 fw-bold">{jobs.filter((j) => j.active).length}</p>
          </div>
        </div>
      </div>

      {loading ? <div className="text-center py-5">Loading...</div> : (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-semibold mb-3">Users</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.fullName || user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.location || '—'}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan="3" className="text-muted">No users registered yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-semibold mb-3">Jobs</h5>
              <ul className="list-group list-group-flush">
                {jobs.map((job) => (
                  <li key={job.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{job.title}</div>
                      <div className="text-muted small">{job.company?.name || 'Company'} • {job.location}</div>
                    </div>
                    <span className={`badge ${job.active ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                      {job.active ? 'Active' : 'Inactive'}
                    </span>
                  </li>
                ))}
                {jobs.length === 0 && <li className="list-group-item px-0 text-muted">No jobs posted yet.</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;

