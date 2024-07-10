import { lazy } from "react";

// project-imports
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";
import PagesLayout from "layout/Pages";
import SimpleLayout from "layout/Simple";
import { SimpleLayoutType } from "config";
import Student from "pages/student";
import College from "pages/college";
import ManageRecrutires from "pages/manageRecruiters";
import InviterRecruiterForm from "pages/manageRecruiters/InviteRecruiter";
import Applications from "pages/applications";
import BulkImport from "pages/college/bulkImport";
import CollegeDetail from "pages/college/collegeDetail";
import ViewApplication from "pages/applications/ViewApplication";
import RecruiterProfile from "pages/manageRecruiters/recuiterProfile";
import Profile from "pages/profile";
import ManageStaff from "pages/profile/manageStaff";
import ChangePassword from "pages/profile/changePassword";
import RoleManager from "pages/profile/roleManager";
import ProfileInformation from "pages/profile/profileDetail";
import SchoolCommission from "pages/profile/schoolCommission";
import Notification from "pages/profile/notification";
import AddStudent from "pages/student/addStudent";
import Instructor from "pages/instructor";
import AddInstructor from "pages/instructor/addInstructor";
import Batch from "pages/batches";
import Attendance from "pages/attendance";
import ViewStudent from "pages/student/viewStudent";

const MaintenanceError = Loadable(
  lazy(() => import("pages/maintenance/error/404"))
);
const MaintenanceError500 = Loadable(
  lazy(() => import("pages/maintenance/error/500"))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import("pages/maintenance/under-construction/under-construction"))
);
const MaintenanceComingSoon = Loadable(
  lazy(() => import("pages/maintenance/coming-soon/coming-soon"))
);

const AppContactUS = Loadable(lazy(() => import("pages/contact-us")));
// render - sample page
const SamplePage = Loadable(
  lazy(() => import("pages/extra-pages/sample-page"))
);

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "student",
          element: <Student />,
        },
        {
          path: "student/:id",
          element: <ViewStudent />,
        },
        {
          path: "student/add",
          element: <AddStudent />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "instructor",
          element: <Instructor />,
        },
        {
          path: "instructor/:id",
          element: <Student />,
        },
        {
          path: "instructor/add",
          element: <AddInstructor />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "batch",
          element: <Batch />,
        },
        {
          path: "batch/:id",
          element: <Student />,
        },
        {
          path: "batch/add",
          element: <AddInstructor />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "attendance",
          element: <Attendance />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "detail",
              element: <ProfileInformation />,
            },

            {
              path: "changePassword",
              element: <ChangePassword />,
            },
            {
              path: "manageStaff",
              element: <ManageStaff />,
            },

            {
              path: "roleManager",
              element: <RoleManager />,
            },
            {
              path: "schoolCommission",
              element: <SchoolCommission />,
            },

            {
              path: "notification",
              element: <Notification />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <SamplePage />,
        },
        {
          path: "applications",
          element: <Applications />,
        },
        {
          path: "applications/:applicationId",
          element: <ViewApplication />,
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "college",
          element: <College />,
        },
        {
          path: "college/bulkImport",
          element: <BulkImport />,
        },
        {
          path: "college/:id",
          element: <CollegeDetail />,
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "manageRecruiters",
          element: <ManageRecrutires />,
        },

        {
          path: "manageRecruiters/invite",
          element: <InviterRecruiterForm />,
        },

        {
          path: "manageRecruiters/profile",
          element: <RecruiterProfile />,
        },
      ],
    },

    {
      path: "/",
      element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      children: [
        {
          path: "contact-us",
          element: <AppContactUS />,
        },
      ],
    },

    {
      path: "/maintenance",
      element: <PagesLayout />,
      children: [
        {
          path: "404",
          element: <MaintenanceError />,
        },
        {
          path: "500",
          element: <MaintenanceError500 />,
        },
        {
          path: "under-construction",
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: "coming-soon",
          element: <MaintenanceComingSoon />,
        },
      ],
    },

    { path: "*", element: <MaintenanceError /> },
  ],
};

export default MainRoutes;
