import { JSX, lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/authLayout";
import Login from "@/pages/auth/login";
import { RouteGuard } from "./route.guard";
import { DashboardGuard } from "./dashboard.guard";
import DashboardPage from "@/pages/dashboard/dashboard";
import { PageSkeleton } from "@/components/loaders/page-skeleton";


const NotFound = lazy(() => import("@/components/layouts/not-found"));
const Unauthorized = lazy(() => import("@/components/layouts/unauthorized"));
const UsersStaffPage = lazy(() => import("@/pages/users-staff/users-staff.page"));

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<PageSkeleton />}>{element}</Suspense>
);


export const router = createBrowserRouter([


  // --- Main app routes ---
  {
    element: <RouteGuard />,
    children: [
      {
        index: true,
        element: (
          <DashboardGuard>
            {withSuspense(<DashboardPage />)}
          </DashboardGuard>
        ),
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: (
              <DashboardGuard>
                {withSuspense(<DashboardPage />)}
              </DashboardGuard>
            ),
          },
        ],
      },
      {
        path: "utilisateurs",
        element: withSuspense(<UsersStaffPage />),
      }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  // --- Error pages ---
  {
    path: "unauthorized",
    element: withSuspense(<Unauthorized />),
  },

  // --- 404 ---
  {
    path: "*",
    element: withSuspense(<NotFound shouldRedirect />),
  },
]);
