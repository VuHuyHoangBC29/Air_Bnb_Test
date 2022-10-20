import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import AdminGuard from "../guards/admin.guard";
import AuthGuard from "../guards/auth-guard";
import NoAuthGuard from "../guards/no-auth.guard";
import RoomForm from "../modules/room-form/room-form";
import Booking from "../pages/booking/booking";
import CreateLocation from "../pages/create-location/create-location";
import CreateRoom from "../pages/create-room/create-room";
import CreateUser from "../pages/create-user/create-user";
import EditLocation from "../pages/edit-location/edit-location";
import EditUser from "../pages/edit-user/edit-user";
import Home from "../pages/home/home";
import LocationManagement from "../pages/location-management/location-management";
import Locations from "../pages/locations/locations";
import Login from "../pages/login/login";
import ProfileInfo from "../pages/profile-info/profile-info";
import RoomManagement from "../pages/room-management/room-management";
import UserManagement from "../pages/user-management/user-management";

const Register = lazy(() => import("../pages/register/register"));
const HomeLayout = lazy(() => import("../layouts/home-layout"));
const AdminLayout = lazy(() => import("../layouts/admin-layout"));

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },

        {
          path: "/locations",
          element: <Locations />,
        },

        {
          path: "/locations/:provinceId",
          element: <Locations />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:roomId",
              element: <Booking />,
            },
            {
              path: "/profile/:userId",
              element: <ProfileInfo />,
            },
          ],
        },
      ],
    },

    {
      path: "/",
      element: <NoAuthGuard />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
            {
              path: "/admin/user-management/create-user",
              element: <CreateUser />,
            },
            {
              path: "/admin/user-management/:id/edit-user",
              element: <EditUser />,
            },
            {
              path: "/admin/location-management",
              element: <LocationManagement />,
            },
            {
              path: "/admin/location-management/create-location",
              element: <CreateLocation />,
            },
            {
              path: "/admin/location-management/:id/edit-location",
              element: <EditLocation />,
            },
            {
              path: "/admin/room-management",
              element: <RoomManagement />,
            },
            {
              path: "/admin/room-management/create-room",
              element: <CreateRoom />,
            },

            {
              path: "/admin/room-management/:id/edit-room",
              element: <RoomForm />,
            },
          ],
        },
      ],
    },
  ]);

  return routing;
}
