import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third-party
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';
import { Typography, useTheme } from '@mui/material';
import Input from 'components/ui/Input';
import Date from 'components/ui/Date';
import { addRecruiter } from 'services/recruiter';
import { InfoCircle } from 'iconsax-react';
import { SnackbarProps } from 'types/snackbar';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { fontFamily, fontStyle, fontWeight } from '@mui/system';

const InviterRecruiterForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    company_name: z.string().min(1, 'Please Enter Company'),
    first_name: z.string().min(1, 'Please Enter First Name'),
    last_name: z.string().min(1, 'Please Enter Last Name'),
    website: z.string().optional(),
    email: z.string().email('Enter a valid email')
  });

  const defaultValues: any = {};
  for (const [key] of Object.entries(schema.shape)) {
    defaultValues[key] = '';
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    addRecruiter({
      body: { ...data, email: data?.email.toLowerCase() }
    })
      ?.then((res) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: res?.message,
          variant: 'alert',
          alert: {
            color: 'success'
          }
        } as SnackbarProps);
        reset(defaultValues);
        navigate('/manageRecruiters');
      })
      ?.catch((err) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: err?.data?.message || 'Something went wrong',
          variant: 'alert',
          alert: {
            color: 'error',
            icon: <InfoCircle />
          },
          transition: 'SlideDown',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        } as SnackbarProps);
      });
  };

  return (
    <div>
      <Grid container spacing={20}>
        <Grid item sm={5}>
          <Stack direction={'column'} spacing={2}>
            <Typography variant="h3" color={'#394663'}>
              Enter Recuiter Information
            </Typography>
            <Typography variant="caption" color="secondary">
              Give a new recruiter the access to workspace by sending them an invitation
            </Typography>
          </Stack>
        </Grid>

        <Grid item sm={7}>
          <MainCard title="">
            <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Input
                      error={errors}
                      labelStyle={{ fontWeight: '600' }}
                      name="company_name"
                      control={control}
                      label="Company"
                      placeholder="UNITRAVEL CANADA LTD"
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Input
                      error={errors}
                      labelStyle={{ fontWeight: '600' }}
                      name="website"
                      control={control}
                      label="Website(Optional)"
                      placeholder="www.example.com"
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <Input
                          error={errors}
                          labelStyle={{ fontWeight: '600' }}
                          name="first_name"
                          control={control}
                          label="First Name"
                          placeholder="Enter Name"
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <Input
                          error={errors}
                          labelStyle={{ fontWeight: '600' }}
                          name="last_name"
                          control={control}
                          label="Last Name"
                          placeholder="Enter Name"
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Input
                      error={errors}
                      labelStyle={{ fontWeight: '600' }}
                      name="email"
                      control={control}
                      label="Email"
                      placeholder="Enter Email"
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="caption" color="secondary">
                    An invitation email will be sent to the user on the email id mentioned in the form above
                  </Typography>

                  <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={6}>
                    <Button
                      variant="text"
                      sx={{ color: '#394663', fontWeight: '600' }}
                      onClick={() => {
                        navigate('/manageRecruiters');
                      }}
                    >
                      Cancel
                    </Button>

                    <AnimateButton>
                      <LoadingButton variant="contained" type="submit" loading={loading} sx={{ fontWeight: '600' }}>
                        Send Invite
                      </LoadingButton>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default InviterRecruiterForm;
