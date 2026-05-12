import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { HomePage } from '../pages/HomePage'
import { TimelinePage } from '../pages/TimelinePage'
import { QuizPage } from '../pages/QuizPage'
import { CabinetPage } from '../pages/CabinetPage'
import { GamesPage } from '../pages/GamesPage'
import { HallsPage } from '../pages/HallsPage'
import { HallDetailPage } from '../pages/HallDetailPage'
import { ExhibitDetailPage } from '../pages/ExhibitDetailPage'
import { useKiosk } from '../providers/KioskProvider'

function CabinetRoute() {
  const { kioskLayout } = useKiosk()
  if (kioskLayout) return <Navigate to="/halls" replace />
  return <CabinetPage />
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')
const browserBasename = routerBasename === '' ? undefined : routerBasename

export function AppRouter() {
  return (
    <BrowserRouter basename={browserBasename}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="halls" element={<HallsPage />} />
          <Route path="halls/:hallSlug" element={<HallDetailPage />} />
          <Route path="halls/:hallSlug/exhibit/:exhibitId" element={<ExhibitDetailPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="cabinet" element={<CabinetRoute />} />
          <Route path="games" element={<GamesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
