import { Button, OutlinedInput, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import SchoolCommissionTable from 'components/profile/schoolCommissionTable';
import React from 'react';

const SchoolCommission = () => {
  return (
    <MainCard title={<Typography sx={{ fontSize: '19px', color: '#394663', fontWeight: '600' }}>School Commissions</Typography>}>
      <Stack direction="row" alignItems="center" width="100%">
        <OutlinedInput
          placeholder="Search by school name"
          sx={{
            height: '30px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            bgcolor: 'white'
          }}
          fullWidth
        />
        <Button variant="contained" size="small" sx={{ height: '30px', px: 4, borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
          Search
        </Button>
      </Stack>
      <SchoolCommissionTable />
    </MainCard>
  );
};

export default SchoolCommission;
