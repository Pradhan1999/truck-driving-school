import { useState } from "react";

import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, Filter } from "iconsax-react";

import Page from "components/ui/PageLayout";
import ThemeButton from "components/ui/Button";

const Batch = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      <Page
        title="Batch"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/instructor/add">
              <ThemeButton variant="contained" startIcon={<Add />}>
                Add Batch
              </ThemeButton>
            </Link>
            <ThemeButton
              variant="outlined"
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
        Batch
        {/* <InstructorTable drawer={drawer} setDrawer={setDrawer} /> */}
      </Page>
    </div>
  );
};

export default Batch;
