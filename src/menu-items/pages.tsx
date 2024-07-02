// third-party
import { FormattedMessage } from "react-intl";

// assets
import { Teacher } from "iconsax-react";

// type
import { NavItemType } from "types/menu";
// import Recruiter from "../../public/svg/recruiter";
// import Student from "../../public/svg/student";
// import Application from "../../public/svg/application";

const icons = {
  maintenance: "",
  student: Teacher,
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
      title: <FormattedMessage id="Student" />,
      type: "item",
      url: "/student",
      icon: icons.student,
      children: [
        {
          id: "add student",
          title: <FormattedMessage id="Add Student" />,
          type: "item",
          url: "/student/addStudent",
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
