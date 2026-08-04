import { useEffect, useState } from 'react';
import api from '../services/api';

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [appsRes, savedRes] = await Promise.all([
          api.get('/seeker/applications'),
          api.get('/seeker/saved')
        ]);
        setApplications(appsRes.data);
        setSavedJobs(savedRes.data);
      } catch (error) {
        setApplications([]);
        setSavedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUnsave = async (id) => {
    try {
      await api.delete(`/seeker/save/${id}`);
      setSavedJobs((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      // ignore
    }
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Seeker dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5>Saved jobs</h5>
            <p className="display-6 fw-bold">{savedJobs.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5>Applications</h5>
            <p className="display-6 fw-bold">{applications.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5>Profile completion</h5>
            <p className="display-6 fw-bold">85%</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h4 className="fw-semibold">Applications</h4>
            <ul className="list-group list-group-flush">
              {applications.map((application) => (
                <li key={application.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                  <div>
                    <div>{application.job?.title || 'Applied role'}</div>
                    <div className="text-muted small">{application.job?.company?.name || ''}</div>
                  </div>
                  <span className="badge bg-info-subtle text-info">{application.status}</span>
                </li>
              ))}
              {applications.length === 0 && <li className="list-group-item px-0 text-muted">No applications yet.</li>}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h4 className="fw-semibold">Saved jobs</h4>
            <ul className="list-group list-group-flush">
              {savedJobs.map((saved) => (
                <li key={saved.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                  <div>
                    <div>{saved.job?.title || 'Saved job'}</div>
                    <div className="text-muted small">{saved.job?.company?.name || ''} • {saved.job?.location || ''}</div>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleUnsave(saved.id)}>Remove</button>
                </li>
              ))}
              {savedJobs.length === 0 && <li className="list-group-item px-0 text-muted">No saved jobs yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

