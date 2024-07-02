import { Box, Grid, Step, StepLabel, Stepper } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/ui/PageLayout';
import DocumentDetails from './DocumentDetails';
import SideProfileDetails from './SideProfile';

const ViewApplication = () => {
  // const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    'Pay Application Fee',
    'Prepare Application',
    'Submission in Progress',
    'Decision',
    'Post-Decision Requirements',
    'Enrollment Confirmed'
  ];

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  // const getStepContent = (step: number, handleNext: () => void, handleBack: () => void) => {
  //   switch (step) {
  //     case 0:
  //       return <UploadData handleNext={handleNext} />;
  //     default:
  //       throw new Error('Unknown step');
  //   }
  // };

  return (
    <Page title="Show Applications">
      <MainCard>
        {/* STATUS */}
        {/* <Stack direction="row" spacing={1} mb={4}>
          <Typography>Current Status</Typography> <Chip label="Post - Submission" color="primary" size="small" variant="light" />
          <Chip label="Post - Submission" color="success" size="small" variant="light" />
        </Stack> */}

        {/* STEPS */}
        <Box sx={{ width: '100%' }} mb={3}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* CONTENT */}
        <Grid container spacing={2} justifyContent="center">
          {/* LEFT CONTENT */}
          <Grid item xs={12} sm={10} md={4}>
            <SideProfileDetails />
          </Grid>
          {/* RIGHT CONTNET */}
          <Grid item xs={12} sm={12} md={8}>
            <DocumentDetails />
          </Grid>
        </Grid>
      </MainCard>
    </Page>
  );
};

export default ViewApplication;
