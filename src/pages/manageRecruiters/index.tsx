import React, { useState } from 'react';
import RecruitersTable from './table';
import { Box, Button, OutlinedInput, Stack, Tab } from '@mui/material';
import Page from 'components/ui/PageLayout';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import ThemeButton from 'components/ui/Button';
import { Filter, UserAdd } from 'iconsax-react';
import { debounce } from 'lodash';
import SearchIcon from 'assets/svg/search';

const ManageRecruiters = () => {
  const [value, setValue] = useState('allRecruiter');
  const [searchText, setSearchText] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  const tabs = [
    { label: 'All Recruiter', value: 'allRecruiter', content: <RecruitersTable value={value} searchText={searchText} /> },
    { label: 'Pending Request', value: 'pendingRequest', content: <RecruitersTable value={value} searchText={searchText} /> },
    { label: 'Invited', value: 'invited', content: <RecruitersTable value={value} searchText={searchText} /> },
    { label: 'Approved', value: 'approved', content: <RecruitersTable value={value} searchText={searchText} /> }
  ];

  return (
    <div>
      <Page
        title="Manage Recruiter"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/manageRecruiters/invite">
              <ThemeButton variant="contained" size="small" startIcon={<UserAdd size="32" />}>
                Invite Recruiter
              </ThemeButton>
            </Link>
          </Stack>
        }
      >
        <TabContext value={value}>
          <MainCard
            content={false}
            headerSX={{ p: 0 }}
            title={
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} px={1}>
                <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    {tabs.map((tab) => (
                      <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                  </TabList>
                </Box>
                <Stack direction={'row'} alignItems={'center'} gap={2} width={' 33%'}>
                  <OutlinedInput
                    startAdornment={<SearchIcon />}
                    placeholder="Search by name or email or recruiter ID..."
                    onChange={(e) => debouncedSearch(e?.target?.value)}
                    sx={{
                      width: '100%',
                      height: '30px',
                      borderRadius: 1,
                      bgcolor: 'white'
                    }}
                    fullWidth
                  />
                  <ThemeButton variant="outlined" size="small" startIcon={<Filter size="32" variant="TwoTone" />}>
                    Filter
                  </ThemeButton>
                </Stack>
              </Stack>
            }
          >
            {tabs.map((tab) => (
              <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
                {tab.content}
              </TabPanel>
            ))}
          </MainCard>
        </TabContext>
      </Page>
    </div>
  );
};

export default ManageRecruiters;
