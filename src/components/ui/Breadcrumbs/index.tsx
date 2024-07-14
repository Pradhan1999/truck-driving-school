import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbComponentProps {
  breadcrumbs: BreadcrumbItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  breadcrumbs,
}) => {
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    event.preventDefault();
    navigate(link);
  };

  const defaultDashboard: BreadcrumbItem = {
    label: "Dashboard",
    link: "/dashboard",
  };
  const allBreadcrumbs = [defaultDashboard, ...breadcrumbs];

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {allBreadcrumbs.map((crumb, index) => {
        const isLast = index === allBreadcrumbs.length - 1;

        return isLast ? (
          <Typography key={crumb.label} color="text.primary">
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={crumb.label}
            component={RouterLink}
            to={crumb.link}
            onClick={(event) => handleClick(event, crumb.link)}
            color="inherit"
            underline="hover"
          >
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;
