import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InvEnter from './InvEnter.tsx'
import InvTable from './InvTable.tsx'
import InvWatchlist from './InvWatchlist.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import BasePage from './BasePage.tsx'

// created a router constant that holds the browser router data
// including paths for additional pages and the elements to pass in upon load.
const router = createBrowserRouter([
  {
    path: "/",
    Component: BasePage,
    children: [
      {
        path: "/",
        element: <InvTable />
      },
      {
        path: "/enter",
        element: <InvEnter />
      },
      {
        path: "/watchlist",
        element: <InvWatchlist />
      }
    ]
  }
])

// changed the <App /> to the RouterProvider passing in the const router.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
