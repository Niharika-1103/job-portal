import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { isAuthenticated } from '../services/auth';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSave = async (jobId) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/seeker/save/${jobId}`);
      setMessage('Job saved successfully.');
    } catch (error) {
      setMessage('Failed to save job.');
    }
  };

  const handleApply = async (jobId) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/seeker/apply/${jobId}`);
      setMessage('Application submitted successfully.');
    } catch (error) {
      setMessage('Failed to apply. You may have already applied.');
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await api.get('/public/jobs');
        setJobs(response.data);
      } catch (error) {
        setJobs([
          { id: 1, title: 'Frontend Engineer', company: { name: 'Northstar' }, location: 'Remote', salaryRange: '$120k', category: 'Engineering' },
          { id: 2, title: 'Product Designer', company: { name: 'BrightPath' }, location: 'New York', salaryRange: '$95k', category: 'Design' },
          { id: 3, title: 'Backend Developer', company: { name: 'TechNova' }, location: 'San Francisco', salaryRange: '$130k', category: 'Engineering' },
          { id: 4, title: 'Full Stack Developer', company: { name: 'CodeCraft' }, location: 'Austin', salaryRange: '$125k', category: 'Engineering' },
          { id: 5, title: 'Data Analyst', company: { name: 'Insight Labs' }, location: 'Chicago', salaryRange: '$90k', category: 'Data Science' },
          { id: 6, title: 'Machine Learning Engineer', company: { name: 'AI Vision' }, location: 'Remote', salaryRange: '$145k', category: 'AI & ML' },
          { id: 7, title: 'DevOps Engineer', company: { name: 'CloudWorks' }, location: 'Seattle', salaryRange: '$135k', category: 'Engineering' },
          { id: 8, title: 'UI/UX Designer', company: { name: 'Pixel Studio' }, location: 'Los Angeles', salaryRange: '$100k', category: 'Design' },
          { id: 9, title: 'QA Automation Engineer', company: { name: 'Quality First' }, location: 'Boston', salaryRange: '$105k', category: 'Testing' },
          { id: 10, title: 'Cybersecurity Analyst', company: { name: 'SecureNet' }, location: 'Washington, DC', salaryRange: '$115k', category: 'Security' },
          { id: 11, title: 'Mobile App Developer', company: { name: 'AppSphere' }, location: 'Remote', salaryRange: '$118k', category: 'Engineering' },
          { id: 12, title: 'Cloud Engineer', company: { name: 'SkyTech' }, location: 'Denver', salaryRange: '$140k', category: 'Cloud' }

        ]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Explore jobs</h2>
          <p className="text-muted">Search, filter, and save your next opportunity.</p>
        </div>
      </div>

      {message && <div className="alert alert-info py-2">{message}</div>}

      {loading ? <div className="text-center py-5">Loading...</div> : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-lg-6" key={job.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">{job.title}</h5>
                      <p className="text-muted mb-2">{job.company?.name || 'Company'}</p>
                    </div>
                    <span className="badge bg-primary-subtle text-primary">{job.category}</span>
                  </div>
                  <p className="text-muted small">{job.location}</p>
                  <p className="fw-semibold text-success">{job.salaryRange}</p>
                  <div className="mt-3">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleSave(job.id)}>Save</button>
                    <button className="btn btn-primary btn-sm ms-2" onClick={() => handleApply(job.id)}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
