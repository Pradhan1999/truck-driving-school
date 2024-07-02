import Button from '@mui/material/Button';
import { Box, Stack, Tab } from '@mui/material';
import { Add, Filter } from 'iconsax-react';
import Page from 'components/ui/PageLayout';
import MainCard from 'components/MainCard';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import ApplicationTable from './ApplicationTable';
import AddApplication from './AddApplication';

const Applications = () => {
  const [value, setValue] = useState('applicationSubmitted');
  const [openAddApplicationModal, setOpenAddApplicationModal] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const tabs = [
    { label: 'Application Submitted', value: 'applicationSubmitted', content: <ApplicationTable /> },
    { label: 'Application Started', value: 'applicationStarted', content: <ApplicationTable /> },
    { label: 'Ready to submit', value: 'readyToSubmit', content: <ApplicationTable /> },
    { label: 'Ready for Visa', value: 'readyForVisa', content: <ApplicationTable /> },
    { label: 'Follow Up', value: 'followUp', content: <ApplicationTable /> }
  ];
  return (
    <Page
      title="Application"
      primaryAction={
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAddApplicationModal(true)}>
            Add Application
          </Button>
          <Button variant="outlined" startIcon={<Filter />}>
            Filter
          </Button>
        </Stack>
      }
    >
      <TabContext value={value}>
        <MainCard
          content={false}
          headerSX={{ p: 0 }}
          title={
            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>
          }
        >
          {tabs.map((tab) => (
            <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
              {tab.content}
            </TabPanel>
          ))}
        </MainCard>
      </TabContext>

      {/* ADD APPLICATION MODAL */}
      <AddApplication open={openAddApplicationModal} handleClose={() => setOpenAddApplicationModal(false)} />
    </Page>
  );
};

export default Applications;
