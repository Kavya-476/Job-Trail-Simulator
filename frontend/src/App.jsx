import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import SimulationPage from './pages/SimulationPage';
import ProfilePage from './pages/ProfilePage';
import FeedbackPage from './pages/FeedbackPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import LevelOverviewPage from './pages/LevelOverviewPage';
import NotificationsPage from './pages/NotificationsPage';
import CodeExplanationPage from './pages/CodeExplanationPage';
import SanitizeSimulation from './components/simulation/SanitizeSimulation';
import ToDoFeatureSimulation from './components/simulation/ToDoFeatureSimulation';
import RestApiSimulation from './components/simulation/RestApiSimulation';
import SystemDesignSimulation from './components/simulation/SystemDesignSimulation';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes (App Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="/jobs/:jobId/:level/overview" element={<LevelOverviewPage />} />
          <Route path="/simulation/:simId/:level" element={<SimulationPage />} />
          <Route path="/simulation/:jobId/:level/sanitize" element={<SanitizeSimulation />} />
          <Route path="/simulation/:jobId/:level/todo-feature" element={<ToDoFeatureSimulation />} />
          <Route path="/simulation/:jobId/:level/rest-api" element={<RestApiSimulation />} />
          <Route path="/simulation/:jobId/:level/system-design" element={<SystemDesignSimulation />} />
          <Route path="/simulation/:jobId/:level/explanation" element={<CodeExplanationPage />} />
          <Route path="/simulation/:simId/feedback" element={<FeedbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
