// third-party
import { FormattedMessage } from "react-intl";

// assets
import { Calendar2, Category, Profile2User, Teacher } from "iconsax-react";

// type
import { NavItemType } from "types/menu";

const icons = {
  maintenance: "",
  student: Profile2User,
  instructor: Teacher,
  batch: Category,
  attendance: Calendar2,
  // contactus: I24Support,
  // applications: Application,
  // college: Book,
  // recruiter: Recruiter,
};

// ===================|| MENU ITEMS - PAGES ||====================== //

const pages: NavItemType = {
  id: "group-pages",
  title: <FormattedMessage id="pages" />,
  type: "group",
  children: [
    {
      id: "Students",
      title: <FormattedMessage id="Students" />,
      type: "item",
      url: "/student",
      icon: icons.student,
      children: [
        {
          id: "Add Student",
          title: <FormattedMessage id="Add Student" />,
          type: "item",
          url: "/student/add",
          target: true,
        },
      ],
    },
    {
      id: "Instructors",
      title: <FormattedMessage id="Instructors" />,
      type: "item",
      url: "/instructor",
      icon: icons.instructor,
      children: [
        {
          id: "Add",
          title: <FormattedMessage id="Add" />,
          type: "item",
          url: "/instructor/add",
          target: true,
        },
      ],
    },
    {
      id: "Batch",
      title: <FormattedMessage id="Batch" />,
      type: "item",
      url: "/batch",
      icon: icons.batch,
      children: [
        {
          id: "Add",
          title: <FormattedMessage id="Add" />,
          type: "item",
          url: "/batch/add",
          target: true,
        },
      ],
    },
    {
      id: "Attendance",
      title: <FormattedMessage id="Attendance" />,
      type: "item",
      url: "/attendance",
      icon: icons.attendance,
      children: [
        {
          id: "Add",
          title: <FormattedMessage id="Add" />,
          type: "item",
          url: "/attendance/add",
          target: true,
        },
      ],
    },
    // {
    //   id: "Recruiters",
    //   title: <FormattedMessage id="Manage Recruiters" />,
    //   type: "item",
    //   url: "/manageRecruiters",
    //   icon: icons.recruiter,
    //   children: [
    //     {
    //       id: "invite",
    //       title: <FormattedMessage id="Invite" />,
    //       type: "item",
    //       url: "/manageRecruiters/invite",
    //       target: true,
    //     },
    //     {
    //       id: "profile",
    //       title: <FormattedMessage id="profile" />,
    //       type: "item",
    //       url: "/manageRecruiters/profile",
    //       target: true,
    //     },
    //   ],
    // },
    // {
    //   id: "Institutes",
    //   title: <FormattedMessage id="College/Institutes" />,
    //   type: "item",
    //   url: "/college",
    //   icon: icons.college,
    //   activeIcon: icons.college,
    // },
    // {
    //   id: "Applications",
    //   title: <FormattedMessage id="Applications" />,
    //   type: "item",
    //   url: "/applications",
    //   icon: icons.applications,
    // },
    // {
    //   id: 'maintenance',
    //   title: <FormattedMessage id="maintenance" />,
    //   type: 'collapse',
    //   icon: icons.maintenance,
    //   children: [
    //     {
    //       id: 'error-404',
    //       title: <FormattedMessage id="error-404" />,
    //       type: 'item',
    //       url: '/maintenance/404',
    //       target: true
    //     },
    //     {
    //       id: 'error-500',
    //       title: <FormattedMessage id="error-500" />,
    //       type: 'item',
    //       url: '/maintenance/500',
    //       target: true
    //     },
    //     {
    //       id: 'coming-soon',
    //       title: <FormattedMessage id="coming-soon" />,
    //       type: 'item',
    //       url: '/maintenance/coming-soon',
    //       target: true
    //     },
    //     {
    //       id: 'under-construction',
    //       title: <FormattedMessage id="under-construction" />,
    //       type: 'item',
    //       url: '/maintenance/under-construction',
    //       target: true
    //     }
    //   ]
    // },
    // {
    //   id: 'contact-us',
    //   title: <FormattedMessage id="contact-us" />,
    //   type: 'item',
    //   url: '/contact-us',
    //   icon: icons.contactus,
    //   target: true
    // },
  ],
};

export default pages;
