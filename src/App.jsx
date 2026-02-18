import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import WoodbineWednesdaysPage from './pages/WoodbineWednesdaysPage';
import StuffWeLikePage from './pages/StuffWeLikePage';
import GameDetailPage from './pages/GameDetailPage';
import NotFoundPage from './pages/NotFoundPage';

/*
  Top-level route table.
  All pages render inside SiteLayout so nav/logo stay consistent.
*/
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/woodbinewednesdays" element={<WoodbineWednesdaysPage />} />
        <Route path="/stuffwelike" element={<StuffWeLikePage />} />
        <Route path="/stuffwelike/:gameSlug" element={<GameDetailPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
