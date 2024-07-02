import { Autocomplete, Box, FormLabel, Grid, Input, Stack, TextField, Typography } from '@mui/material';
import AutocompleteInput from 'components/ui/Autocomplete';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { checkEligible } from 'services/application';
import { GetAllProgram } from 'services/institute';
import { getAllStudent } from 'services/student';

const StudentEligibility = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [keyword, setKeyword] = useState();
  const [program_id, setProgram_id] = useState<any>({});
  const [student_id, setStudent_id] = useState<any>({});

  useEffect(() => {
    getAllStudent({ query: { limit: 2000, keyword } })?.then((res) => {
      setStudentDetails(res?.rows);
    });
  }, [keyword]);

  useEffect(() => {
    GetAllProgram({ query: {} })?.then((res) => {
      setProgramData(res?.rows);
    });
  }, []);

  const debouncedSearch = debounce((value: any) => {
    setKeyword(value);
  }, 500);

  checkEligible({ body: { student_id: '', program_id: '' } });

  const programOption = programData?.map((ite: any) => {
    return {
      label: `${ite?.program_name}`,
      value: ite?.id
    };
  });

  const studentOptions = studentDetails?.map((ite: any) => {
    return {
      label: `[${ite?.id}]: ${ite?.first_name} ${ite?.last_name} ${ite?.email}`,
      value: ite?.id
    };
  });

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <FormLabel sx={{ color: '#5A667B', fontWeight: 600, mb: 0.5 }}>Program</FormLabel>
            <Autocomplete
              id="country-select-demo"
              sx={{
                '& .MuiOutlinedInput-root': {}
              }}
              options={programOption}
              onChange={(event, selectedOption: any) => {
                setProgram_id(selectedOption);
              }}
              value={program_id?.label}
              autoHighlight
              getOptionLabel={(option: any) => option.label}
              renderOption={(props, option) => {
                return (
                  <>
                    <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props}>
                      <Typography fontSize={'15px'} fontWeight={500} color={'#394663'}>
                        {option?.label}
                      </Typography>
                    </Box>
                  </>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ borderRadius: 0 }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password'
                  }}
                />
              )}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack py={2} sx={{ color: '#565B68', fontWeight: 400 }}>
            Please select a student to check their eligibility for this program.
          </Stack>
          <Stack spacing={1}>
            <FormLabel sx={{ color: '#5A667B', fontWeight: 600, mb: 0.5 }}>Student</FormLabel>
            <Autocomplete
              id=""
              sx={{
                '& .MuiOutlinedInput-root': {}
              }}
              options={studentOptions}
              onChange={(event, selectedOption: any) => {
                setStudent_id(selectedOption);
              }}
              autoHighlight
              getOptionLabel={(option: any) => option.label}
              renderOption={(props, option) => {
                return (
                  <>
                    <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props}>
                      <Typography fontSize={'15px'} fontWeight={500} color={'#394663'}>
                        {option?.label}
                      </Typography>
                    </Box>
                  </>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ borderRadius: 0 }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password'
                  }}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentEligibility;
