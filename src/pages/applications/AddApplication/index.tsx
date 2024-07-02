import { Button, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Input from 'components/ui/Input';
import Modal from 'components/ui/Modal';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import LoadingButton from 'components/@extended/LoadingButton';
import StudentEligibility from './StudentEligibility';
import Application from './Application';

interface AddCollegeProps {
  open: boolean;
  handleClose: any;
}

const formSchema = z.object({});

const AddApplication = ({ open, handleClose }: AddCollegeProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  // use-form

  const getStepContent = (
    step: number,
    handleNext: () => void,
    handleBack: () => void,
    setActiveStep: Dispatch<SetStateAction<number>>
  ) => {
    switch (step) {
      case 0:
        return <StudentEligibility />;
      case 1:
        return <Application />;
    }
  };

  const { control, handleSubmit }: any = useForm({
    defaultValues: {},
    resolver: zodResolver(formSchema)
  });

  //handle-submit
  const onSubmit = (data: any) => {
    console.log('values', data);
  };

  const steps = ['Eligibility', 'Prerequisites'];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      handleSubmit={() => {}}
      maxWidth="md"
      closeIcon
      title="New Application"
      sx={{
        '& .MuiDialog-paper': { p: 0, minWidth: { xl: 800, sm: 'calc(100% - 20%)' } },
        '& .MuiBackdrop-root': { opacity: '0.5 !important' }
      }}
      footerActions={
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" width={'100%'}>
          <AnimateButton>
            <Button size="medium" type="submit" variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </AnimateButton>
          <Stack direction={'row'} gap={2}>
            {activeStep === 1 && (
              <AnimateButton>
                <Button
                  size="medium"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  startIcon={<ArrowLeft />}
                  onClick={() => {
                    handleBack();
                  }}
                >
                  Previous
                </Button>
              </AnimateButton>
            )}

            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              endIcon={activeStep === 0 && <ArrowRight />}
              onClick={() => {
                handleSubmit(onSubmit);
                handleNext();
              }}
            >
              {activeStep === 0 ? 'Next ' : 'Create Application'}
            </LoadingButton>
          </Stack>
        </Stack>
      }
    >
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
      {getStepContent(activeStep, handleNext, handleBack, setActiveStep)}
    </Modal>
  );
};

export default AddApplication;
