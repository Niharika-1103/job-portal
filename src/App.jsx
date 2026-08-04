import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RecruiterLoginPage from './pages/RecruiterLoginPage';
import RecruiterRegisterPage from './pages/RecruiterRegisterPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="recruiter/login" element={<RecruiterLoginPage />} />
          <Route path="recruiter/register" element={<RecruiterRegisterPage />} />
          <Route path="recruiter/dashboard" element={<RecruiterDashboardPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
