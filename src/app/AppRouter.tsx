import { BrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { HomePage } from '../pages/HomePage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { Routes, Route } from 'react-router-dom'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')
const browserBasename = routerBasename === '' ? undefined : routerBasename

export function AppRouter() {
  return (
    <BrowserRouter basename={browserBasename}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="halls" element={<PlaceholderPage pageKey="halls" />} />
          <Route path="timeline" element={<PlaceholderPage pageKey="timeline" />} />
          <Route path="quiz" element={<PlaceholderPage pageKey="quiz" />} />
          <Route path="cabinet" element={<PlaceholderPage pageKey="cabinet" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
