import { Avatar, Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Stack, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';

const SideProfileDetails = () => {
  const theme = useTheme();
  return (
    <MainCard content={false}>
      <Box p={2}>
        {/* HEADER */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Avatar sx={{ bgcolor: theme.palette.primary.lighter, width: 60, height: 60 }}>N</Avatar>
          </Grid>
          <Grid item xs={9}>
            <Stack>
              <Typography variant="h4" mb={2} color={theme.palette.primary.main}>
                Conestoga College - Doon
              </Typography>

              <Typography sx={{ fontWeight: 500, mb: 1 }}>
                [3320801] College Diploma - Nutrition and Food Service Management (1570)
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} mb={1}>
              <Typography width="50%" fontWeight={500}>
                Level:
              </Typography>
              <Typography variant="caption" width="50%">
                2 - years undergraduate diploma
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} mb={1}>
              <Typography width="50%" fontWeight={500}>
                Required Level:
              </Typography>
              <Typography variant="caption" width="50%">
                Grade 12
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} mb={1}>
              <Typography width="50%" fontWeight={500}>
                Application ID:
              </Typography>
              <Typography variant="caption" width="50%">
                69505131
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2}>
          <Typography width="50%" fontWeight={500}>
            Intake(s):
          </Typography>
          <Typography variant="caption" width="50%">
            69505131
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* STATUS */}
        <Typography variant="subtitle1" mb={2}>
          Status
        </Typography>
        <Stack>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Ready to Submit" />
            <FormControlLabel control={<Checkbox />} label="Ready for Visa" />
            <FormControlLabel control={<Checkbox />} label="Submitted to School" />
            <FormControlLabel control={<Checkbox />} label="Ready to Enroll" />
          </FormGroup>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* STUDENT */}
        <Stack direction="row" spacing={2} mb={1}>
          <Typography width="50%" variant="subtitle2">
            Student
          </Typography>
          <Typography variant="caption" width="50%">
            28 | Ram RAM Ram
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} mb={1}>
          <Typography width="50%" variant="subtitle2">
            Primary Email
          </Typography>
          <Typography variant="caption" width="50%">
            ram111@gmail.com
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} mb={1}>
          <Typography width="50%" variant="subtitle2">
            Birthday
          </Typography>
          <Typography variant="caption" width="50%">
            Sep 09, 2022 (0 years old)
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} mb={1}>
          <Typography width="50%" variant="subtitle2">
            Phone Number
          </Typography>
          <Typography variant="caption" width="50%">
            +91- 8855669988
          </Typography>
        </Stack>
      </Box>
      <Divider />
      {/* Footer */}
      <Grid sx={{ backgroundColor: theme.palette.primary.lighter }}>
        <Stack direction="row" justifyContent="space-between" py={1.5} px={3} alignItems="center">
          <Typography fontWeight={500}>Payment</Typography>
          <Stack>
            <Typography variant="caption">Not Paid</Typography>
            <Typography sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>Application Fee $100.00</Typography>
          </Stack>
        </Stack>
      </Grid>
    </MainCard>
  );
};

export default SideProfileDetails;
