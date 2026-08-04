import { useEffect, useState } from 'react';
import api from '../services/api';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await api.get('/public/companies');
        setCompanies(response.data);
      } catch (error) {
        setCompanies(
          [
            { id: 1, name: 'Northstar Labs', industry: 'Technology', location: 'Remote', description: 'Building developer-first tools.' }, 
            { id: 2, name: 'BrightPath', industry: 'Design', location: 'New York', description: 'A design-forward consultancy.' },
            { id: 3, name: 'Quantix',industry: 'Analytics',location: 'Austin',description: 'Data-driven decision making through advanced analytics and business intelligence solutions.'},
            { id: 4, name: 'Skyline Tech', industry: 'Software', location: 'San Francisco', description: 'Developing scalable cloud-based applications.' },
            { id: 5, name: 'GreenCore Solutions', industry: 'Renewable Energy', location: 'Seattle', description: 'Creating sustainable energy management systems.' },
            { id: 6, name: 'NovaEdge', industry: 'Artificial Intelligence', location: 'Boston', description: 'Building AI-powered business automation tools.' },
            { id: 7, name: 'FinVerse', industry: 'FinTech', location: 'Chicago', description: 'Providing secure digital banking solutions.' },
            { id: 8, name: 'HealthSync', industry: 'Healthcare', location: 'Remote', description: 'Improving patient care through digital health platforms.' },
            { id: 9, name: 'CloudNest', industry: 'Cloud Computing', location: 'Dallas', description: 'Offering enterprise cloud infrastructure services.' },
            { id: 10, name: 'PixelWorks Studio', industry: 'Design', location: 'Los Angeles', description: 'Crafting modern UI/UX experiences for global brands.' },
            { id: 11, name: 'CodeCraft', industry: 'Technology', location: 'Bengaluru', description: 'Delivering full-stack software solutions for startups.' },
            { id: 12, name: 'SecureWave', industry: 'Cybersecurity', location: 'Hyderabad', description: 'Protecting organizations with advanced security solutions.' },
            { id: 13, name: 'LogiFlow', industry: 'Logistics', location: 'Singapore', description: 'Optimizing supply chain operations with smart technology.' },
            { id: 14, name: 'GreenLeaf Solutions', industry: 'Healthcare', location: 'Hyderabad', description: 'Delivering innovative digital healthcare platforms.' },
            { id: 15, name: 'SkyBridge Finance', industry: 'Finance', location: 'Bengaluru', description: 'Providing secure and scalable fintech solutions.' }
]);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Explore companies</h2>
        <p className="text-muted">Discover the teams behind the opportunities.</p>
      </div>

      {loading ? <div className="text-center py-5">Loading...</div> : (
        <div className="row g-4">
          {companies.map((company) => (
            <div className="col-lg-4 col-md-6" key={company.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                      {company.name?.charAt(0) || 'C'}
                    </div>
                    <h5 className="card-title mb-0">{company.name}</h5>
                  </div>
                  <p className="text-muted mb-2">{company.description || 'A growing company.'}</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {company.industry && <span className="badge bg-light text-dark border">{company.industry}</span>}
                    {company.location && <span className="badge bg-light text-dark border">{company.location}</span>}
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

export default CompaniesPage;

