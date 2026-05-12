import { Outlet } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export function AppShell() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="app-shell__main" id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
