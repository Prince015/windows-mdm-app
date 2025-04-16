import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplashScreen from './screens/splash-screen/SplashScreen';
import Login from './screens/login/Login';
import Dashboard from './screens/dashboard/Dashboard';

export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
