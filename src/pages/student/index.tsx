import StudentTable from './table';
import { useState } from 'react';
import Button from '@mui/material/Button';

import { Stack } from '@mui/material';
import Page from 'components/ui/PageLayout';
import { Add, Filter } from 'iconsax-react';
import { Link } from 'react-router-dom';
import ThemeButton from 'components/ui/Button';

const Student = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      <Page
        title="Student"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/student/createStudent">
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
