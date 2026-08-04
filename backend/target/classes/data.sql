INSERT INTO roles (name) VALUES ('ROLE_JOB_SEEKER');
INSERT INTO roles (name) VALUES ('ROLE_RECRUITER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO admin (username, password) VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

INSERT INTO companies (name, logo_url, description, industry, location, website) VALUES
('Northstar Labs', 'https://logo.clearbit.com/northstarlabs.com', 'Building developer-first tools for modern teams.', 'Technology', 'Remote', 'https://northstarlabs.com'),
('BrightPath', 'https://logo.clearbit.com/brightpath.io', 'A design-forward consultancy creating human-centered products.', 'Design', 'New York', 'https://brightpath.io'),
('Quantix', 'https://logo.clearbit.com/quantix.com', 'Data-driven decision making, at scale.', 'Analytics', 'Austin', 'https://quantix.com');

INSERT INTO jobs (title, description, category, location, type, experience, salary_range, posted_date, active, company_id) VALUES
('Senior Frontend Engineer', 'Build delightful, performant interfaces with React and TypeScript.', 'Engineering', 'Remote', 'Full-time', 'Senior', '$140k - $180k', CURRENT_DATE, TRUE, 1),
('Product Designer', 'Own end-to-end design for our core product experiences.', 'Design', 'New York', 'Full-time', 'Mid', '$110k - $140k', CURRENT_DATE, TRUE, 2),
('Data Analyst', 'Turn complex data into actionable insights for our clients.', 'Analytics', 'Austin', 'Full-time', 'Entry', '$90k - $120k', CURRENT_DATE, TRUE, 3);
