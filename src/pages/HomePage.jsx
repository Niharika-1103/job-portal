import { Link } from 'react-router-dom';
import heroBanner from '../assets/hero-banner.svg';

const featuredJobs = [
  { title: 'Senior Frontend Engineer', company: 'Northstar Labs', location: 'Remote', salary: '$140k - $180k' },
  { title: 'Product Designer', company: 'BrightPath', location: 'New York', salary: '$110k - $140k' },
  { title: 'Data Analyst', company: 'Quantix', location: 'Austin', salary: '$90k - $120k' }
];

const companies = ['Google', 'Microsoft', 'Stripe', 'Notion', 'Shopify'];
const categories = ['Engineering', 'Design', 'Marketing', 'Operations', 'Sales'];
const testimonials = [
  { quote: 'The experience felt premium and effortless.', author: 'Ava, Product Manager' },
  { quote: 'I found my next role in under two weeks.', author: 'Noah, Software Engineer' }
];

const HomePage = () => (
  <div>
    <section className="hero-section py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge bg-primary-subtle text-primary fw-semibold mb-3">Trusted by 25k+ professionals</span>
            <h1 className="display-4 fw-bold mb-3">Find your next role with confidence.</h1>
            <p className="lead text-muted mb-4">Discover high-growth opportunities, connect with top employers, and build the career you deserve.</p>
            <div className="d-flex flex-wrap gap-3">
              <Link className="btn btn-primary btn-lg" to="/jobs">Explore Jobs</Link>
              <Link className="btn btn-outline-primary btn-lg" to="/register">Create Account</Link>
            </div>
</div>
          <div className="col-lg-5">
            <img
              src={heroBanner}
              alt="Modern office workspace with diverse developers collaborating on code"
              className="img-fluid rounded-4 shadow-lg"
              style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>

    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Featured jobs</h3>
        <Link to="/jobs" className="text-primary fw-semibold">View all</Link>
      </div>
      <div className="row g-4">
        {featuredJobs.map((job) => (
          <div className="col-md-4" key={job.title}>
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="text-muted mb-2">{job.company}</p>
                <p className="mb-2"><strong>{job.location}</strong></p>
                <p className="text-success fw-semibold">{job.salary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-5">
      <h3 className="fw-bold mb-4">Top companies</h3>
      <div className="d-flex flex-wrap gap-3">
        {companies.map((company) => (
          <span key={company} className="badge rounded-pill bg-light text-dark px-3 py-2 border">{company}</span>
        ))}
      </div>
    </section>

    <section className="container py-5">
      <h3 className="fw-bold mb-4">Popular categories</h3>
      <div className="row g-3">
        {categories.map((category) => (
          <div className="col-md-2 col-sm-4 col-6" key={category}>
            <div className="card text-center border-0 shadow-sm rounded-4 py-3">{category}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-5">
      <h3 className="fw-bold mb-4">What candidates say</h3>
      <div className="row g-4">
        {testimonials.map((item) => (
          <div className="col-md-6" key={item.author}>
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <p className="mb-3">“{item.quote}”</p>
              <strong>{item.author}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default HomePage;
