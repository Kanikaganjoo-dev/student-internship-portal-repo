import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Internships from "./pages/Internships";
import PostInternship from "./pages/PostInternship";
import MyApplications from "./pages/MyApplications";
import CompanyApplications from "./pages/CompanyApplications";
import CompanyPosts from "./pages/CompanyPosts";
import AdminPanel from "./pages/AdminPanel";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/internships" element={<ProtectedRoute><Internships /></ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute><PostInternship /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
        <Route path="/company-applications" element={<ProtectedRoute><CompanyApplications /></ProtectedRoute>} />
        <Route path="/company-posts" element={<ProtectedRoute><CompanyPosts /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

