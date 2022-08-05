import { Navigate, useRoutes } from "react-router-dom";
import WrapperAdmin from "./WrapperAdmin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import WeeklyMenus from "./pages/admin/WeeklyMenus";
import AddWeeklyMenu from "./pages/admin/AddWeeklyMenu";
import Users from "./pages/admin/Users";
import Invoices from "./pages/admin/Invoices";
import TodayMeal from "./pages/admin/TodayMeal";
import WrapperUser from "./WrapperUser";
import DashboardUser from "./pages/user/DashboardUser";
import InvoicesUser from "./pages/user/InvoicesUser";
import CancelMeal from "./pages/user/CancelMeal";
import PurchasePlan from "./pages/user/PurchasePlan";
import SubscriptionUser from "./pages/user/SubscriptionUser";

const Routes = () => {
  return useRoutes([
    {
      path: "/admin",
      element: <WrapperAdmin />,
      children: [
          {path: 'dashboard', element: <DashboardAdmin />},
          {path: 'weekly-menus', element: <WeeklyMenus />},
          {path: 'add-weekly-menu', element: <AddWeeklyMenu />},
          {path: 'users', element: <Users />},
          {path: 'invoices', element: <Invoices />},
          {path: 'today-meal', element: <TodayMeal />},
      ]
    },
    {
      path: "/user",
      element: <WrapperUser />,
      children: [
          { path: "dashboard", element: <DashboardUser /> },
          { path: "subscription", element: <SubscriptionUser /> },
          { path: "purchase-plan", element: <PurchasePlan /> },
          { path: "invoices", element: <InvoicesUser /> },
          { path: "cancel-meal", element: <CancelMeal /> },
      ],
    },
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Routes;
