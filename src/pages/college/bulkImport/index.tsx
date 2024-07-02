import { Avatar, Button, Grid, Link, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';
import PreviewData from 'components/college/bulkImport/previewData';
import UploadData from 'components/college/bulkImport/uploadData';
import Page from 'components/ui/PageLayout';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import success from 'assets/images/common/success.svg';

const getStepContent = (
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setActiveStep: Dispatch<SetStateAction<number>>,
  setBulkData: any,
  bulkData: any
) => {
  switch (step) {
    case 0:
      return <UploadData handleNext={handleNext} setActiveStep={setActiveStep} setBulkData={setBulkData} />;
    case 1:
      return <PreviewData handleNext={handleNext} handleBack={handleBack} bulkData={bulkData} setBulkData={setBulkData} />;
    case 2:
      return (
        <Stack alignItems="center" spacing={1}>
          <Typography>
            <Avatar src={success} sx={{ height: '120px', width: '120px', borderRadius: 0 }} />
          </Typography>
          <Typography fontWeight="600">Success!</Typography>
          <Typography variant="caption" color="GrayText">
            Institutes imported successfully.
          </Typography>
          <Link component={RouterLink} to="/college" color="text.primary">
            <Button sx={{ width: '40px', fontSize: 12, fontWeight: '500' }} variant="contained">
              Done
            </Button>
          </Link>
        </Stack>
      );
    default:
      throw new Error('Unknown step');
  }
};

const BulkImport = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [bulkData, setBulkData] = useState();

  //steps
  const steps = ['Upload Data', 'Preview & Edit', 'Done'];

  //step handlers
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Page title="Bulk Import" subtitle="Bulk import institutes by uploading the data in excel format">
      <MainCard>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => {
            const labelProps: { error?: boolean; optional?: ReactNode } = {};
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <>{getStepContent(activeStep, handleNext, handleBack, setActiveStep, setBulkData, bulkData)}</>
      </MainCard>
    </Page>
  );
};

export default BulkImport;
