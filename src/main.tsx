import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop.tsx'
import LandingPage from './pages/LandingPage.tsx'
import Resume from './pages/Resume.tsx'
import CoverLetter from './pages/CoverLetter.tsx'
import CoursesListPage from './pages/CoursesListPage.tsx'
import CourseDetail from './pages/CourseDetail.tsx'
import SkillsListPage from './pages/SkillsListPage.tsx'
import SkillDetail from './pages/SkillDetail.tsx'
import ServicesListPage from './pages/ServicesListPage.tsx'
import ServiceDetail from './pages/ServiceDetail.tsx'
import './index.css'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/skills" element={<SkillsListPage />} />
          <Route path="/skills/:skillId" element={<SkillDetail />} />
          <Route path="/services" element={<ServicesListPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/courses" element={<CoursesListPage />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
