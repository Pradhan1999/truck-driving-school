import { Box, Grid, Typography } from "@mui/material";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import { ArrowRight2 } from "iconsax-react";
import React from "react";
import BreadcrumbComponent from "../Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface PageProps {
  title: string;
  subtitle?: string;
  primaryAction?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}

const Page = ({
  title,
  subtitle,
  primaryAction,
  breadcrumbs,
  children,
}: PageProps) => {
  return (
    <Box component="body" style={{ backgroundColor: "transparent" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        {/* TITLE */}
        <Grid item alignItems="center">
          <Typography variant="h4" color={"#394663"} pb={1}>
            {title}
          </Typography>
          {/* BREADCRUMBS */}
          {/* <Breadcrumbs icon titleBottom={false} title={false} /> */}
          {breadcrumbs && <BreadcrumbComponent breadcrumbs={breadcrumbs} />}
        </Grid>
        {/* PRIMARY ACTION */}
        <Grid sx={{ display: "flex", gap: 1 }}>{primaryAction}</Grid>
      </Grid>
      {/* SUBTITLE */}
      <Grid marginBottom={2}>
        <Typography variant="subtitle2" color={"GrayText"}>
          {subtitle}
        </Typography>
      </Grid>

      <Grid>{children}</Grid>
    </Box>
  );
};

export default Page;
