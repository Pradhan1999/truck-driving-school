import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { ArrowRight } from 'iconsax-react';
import { LocationIcon } from 'assets/svg/location';
import { ApplicationTwoIcon } from 'assets/svg/Application2';
import { TuitionIcon } from 'assets/svg/tuition';
import ThemeButton from 'components/ui/Button';
import { Intake } from 'assets/svg/Intake';

const Application = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Stack>
        <Box component="div" sx={{ borderRadius: '10px', bgcolor: 'white', border: '1px solid #C8D7F7' }}>
          <Box component="div" sx={{ bgcolor: '#F9FAFF', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', p: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack direction={'column'}>
                <Typography variant="h6" fontWeight="500">
                  {'type'}
                </Typography>
                <Typography variant="h5" style={{ textTransform: 'capitalize' }}>
                  {'prgram name'}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            <Stack direction="row" alignItems="center" spacing={6}>
              <Typography color={theme.palette.primary.main} fontWeight="500" variant="h6">
                {'name'}
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <LocationIcon />

                <Typography variant="caption" color="GrayText">
                  {`${'campus'}, ${'state'}, ${'country'} `}
                </Typography>
              </Box>
            </Stack>
            <Stack pt={2} pb={1} direction="row" gap={10}>
              <FeeSection title="Tuition" icon={<TuitionIcon />} fee={'tutionfee'} />
              <FeeSection title="Application" icon={<ApplicationTwoIcon />} fee={'applicationfee'} />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  bgcolor="#F2F6FF"
                  height="30px"
                  width="30px"
                  display="flex"
                  borderRadius="50%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Intake />
                </Box>
                <Stack>
                  <Typography color="GrayText" variant="caption">
                    Intake
                  </Typography>
                  <Typography fontWeight="600" variant="caption">
                    jan
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <ThemeButton endIcon={<ArrowRight />} buttonStyle={{ fontSize: 12, fontWeight: '600', pt: 1 }}>
              Program Details
            </ThemeButton>
          </Box>
        </Box>
      </Stack>

      <Stack fontSize={'17px'} color={'#394663'} fontWeight={600} py={3}>
        Requirements/Additional Information
      </Stack>
      <Box component="div" sx={{ borderRadius: '10px', bgcolor: 'white', border: '1px solid #C8D7F7' }}>
        <Box sx={{ px: 2, py: 1 }}>
          <CustomComponent name={'Minimum Level of Education'} value={'Grade 12'} />
          <CustomComponent name={'Minimum Grading'} value={'Grade 12'} />
          <CustomComponent name={'Minimum Language Score '} value={'Grade 12'} />
          <CustomComponent name={'Remarks'} value={'Grade 12'} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Application;

const FeeSection = ({ icon, title, fee }: any) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box bgcolor="#F2F6FF" height="30px" width="30px" display="flex" borderRadius="50%" alignItems="center" justifyContent="center">
        {icon}
      </Box>
      <Stack>
        <Typography color="GrayText" variant="caption">
          {title}
        </Typography>
        <Typography fontWeight="600" variant="caption">
          ${fee} CAD
        </Typography>
      </Stack>
    </Stack>
  );
};

export const CustomComponent = ({ name, value }: any) => {
  return (
    <>
      <Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-between">
        <Grid item xs={4}>
          <Typography color="#394663" fontWeight="600" fontSize="14px" py={1}>
            {name}
          </Typography>
        </Grid>

        <Grid item xs={8}>
          <Typography variant="caption" color="#394663" fontSize={'13px'}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
