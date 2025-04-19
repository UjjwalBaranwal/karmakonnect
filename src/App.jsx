import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupUser from './pages/SignupUser';
import SignupNGO from './pages/SignupNGO';
import SignupAdmin from './pages/SignupAdmin';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/user" element={<SignupUser />} />
        <Route path="/signup/ngo" element={<SignupNGO />} />
        <Route path="/signup/admin" element={<SignupAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
