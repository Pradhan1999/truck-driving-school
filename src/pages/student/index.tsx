import { useState } from "react";

import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, Filter } from "iconsax-react";

import Page from "components/ui/PageLayout";
import ThemeButton from "components/ui/Button";
import StudentTable from "./studentTable";

const Student = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      <Page
        title="Students"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/student/add">
              <ThemeButton variant="contained" size="small" startIcon={<Add />}>
                Add Student
              </ThemeButton>
            </Link>
            <ThemeButton
              variant="outlined"
              size="small"
              startIcon={<Filter />}
              onClick={() => {
                setDrawer(true);
              }}
            >
              Filter
            </ThemeButton>
          </Stack>
        }
      >
        <StudentTable drawer={drawer} setDrawer={setDrawer} />
      </Page>
    </div>
  );
};

export default Student;
