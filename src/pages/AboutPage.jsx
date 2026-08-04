import { Link } from 'react-router-dom';

const AboutPage = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm rounded-4 p-5">
          <h2 className="fw-bold mb-3">About HireSpark</h2>
          <p className="lead text-muted">
            HireSpark is on a mission to make finding your next role feel effortless and human.
          </p>
          <p>
            We connect ambitious professionals with opportunity-driven companies through curated job
            listings, smart matching, and a clean, focused experience. Whether you're taking your first
            step or your next big leap, HireSpark is here to help you build the career you deserve.
          </p>
          <h5 className="fw-semibold mt-4 mb-2">Why candidates choose us</h5>
          <ul className="text-muted">
            <li>Curated jobs from leading companies</li>
            <li>Smart matching and recommendations</li>
            <li>One-click applications and tracking</li>
          </ul>
          <h5 className="fw-semibold mt-4 mb-2">Why companies choose us</h5>
          <ul className="text-muted">
            <li>Reach qualified, engaged candidates</li>
            <li>Simple tools to manage listings and applications</li>
            <li>Transparent hiring process</li>
          </ul>
          <div className="mt-4">
            <Link className="btn btn-primary" to="/register">Create your free account</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;

