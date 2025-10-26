import { Routes, Route, Outlet } from "react-router-dom"
import { ThemeProvider } from "./contexts/theme-context"
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"
import RoadmapPage from "./pages/RoadmapPage"
import CertificationPage from "./pages/CertificationPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import DashboardPage from "./pages/DashboardPage"
import TestsPage from "./pages/TestsPage"
import { DashboardLayout } from "./components/dashboard/dashboard-layout"
import CoursesPage from "./pages/CoursesPage"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/certification" element={<CertificationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Outlet /></DashboardLayout>}>
          <Route index element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="tests" element={<TestsPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
