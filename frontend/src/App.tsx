import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import CoursesPage from './pages/CoursesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ShopPage from './pages/ShopPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  );
}
