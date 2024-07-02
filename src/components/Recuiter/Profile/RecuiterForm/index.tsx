import { Button, FormControl, FormHelperText, FormLabel, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Input from 'components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PdfIcon } from 'assets/svg/pdf';
import { PreviewIcon } from 'assets/svg/preview';
import { DownloadIcon } from 'assets/svg/DownloadIcon';
import { DocumentsIcon } from 'assets/svg/document';
import { LockIcon, UnLockIcon } from 'assets/svg/lock';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ThemeButton from 'components/ui/Button';

const RecuiterForm = () => {
  const schema = z.object({
    company: z.string().min(1, 'Please Enter Company'),
    firstName: z.string().min(1, 'Please Enter First Name'),
    lastName: z.string().min(1, 'Please Enter Last Name'),
    website: z.string().optional(),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password should be at least 8 characters long')
  });

  const defaultValues: any = {};
  for (const [key] of Object.entries(schema.shape)) {
    defaultValues[key] = '';
  }

  console.log('Default Values:', defaultValues);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });

  console.log('errors', errors);

  const resets = {
    instructorName: ''
  };
  const onSubmit = (data: any) => {
    console.log('valsxsxues', data);
    // reset(defaultValues);
  };

  const DocumemtData = [
    {
      icon: <PdfIcon />,
      Name: 'Company Cretification',
      prevIcon: <PreviewIcon />,
      DownloadIcon: <DownloadIcon />
    },
    {
      icon: <DocumentsIcon />,
      Name: 'Company Cretification',
      prevIcon: <PreviewIcon />,
      DownloadIcon: <DownloadIcon />
    },
    {
      icon: <DocumentsIcon />,
      Name: 'Document',
      prevIcon: <PreviewIcon />,
      DownloadIcon: <DownloadIcon />
    }
  ];
  return (
    <MainCard>
      <Grid container gap={20}>
        <Grid item xs={7}>
          <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Input
                        error={errors}
                        labelStyle={{ fontWeight: '600' }}
                        name="firstName"
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
                        name="lastName"
                        control={control}
                        label="Last Name"
                        placeholder="Enter Name"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Input
                        error={errors}
                        labelStyle={{ fontWeight: '600' }}
                        name="email"
                        control={control}
                        label="Email"
                        placeholder="Enter  Email"
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Input
                        error={errors}
                        labelStyle={{ fontWeight: '600' }}
                        name="phoneNumber"
                        control={control}
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <Input
                        error={errors}
                        labelStyle={{ fontWeight: '600' }}
                        name="company"
                        control={control}
                        label="Company"
                        placeholder="Enter  Company"
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Stack spacing={1}>
                      <Input
                        error={errors}
                        labelStyle={{ fontWeight: '600' }}
                        name="address"
                        control={control}
                        label="Address"
                        placeholder="Enter Address"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Stack marginBottom={2}>
                  <Typography sx={{ color: '#5A667B', fontWeight: 600 }}>Office Hour:</Typography>
                </Stack>
                <Stack direction={'row'} gap={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>From</FormLabel>
                      <Controller
                        name={'office_start_time'}
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              onChange={(date) => {
                                field.onChange(date?.toISOString());
                              }}
                              slotProps={{ textField: { size: 'small' } }}
                            />
                          </LocalizationProvider>
                        )}
                      />
                      <FormHelperText sx={{ color: 'red', marginTop: 2 }}></FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ mb: 0.5 }}>To</FormLabel>
                      <Controller
                        name={'office_end_time'}
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              onChange={(date) => {
                                field.onChange(date?.toISOString());
                              }}
                              slotProps={{ textField: { size: 'small' } }}
                            />
                          </LocalizationProvider>
                        )}
                      />
                      <FormHelperText sx={{ color: 'red', marginTop: 2 }}></FormHelperText>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Documents Uploaded
          </Typography>

          <MainCard>
            {DocumemtData?.map((ite) => (
              <Stack direction={'row'} gap={2} justifyContent={'space-between'}>
                <Stack direction={'row'} gap={2} py={1}>
                  <Stack>{ite?.icon}</Stack>
                  <Stack>{ite?.Name}</Stack>
                </Stack>

                <Stack direction={'row'} gap={2} py={1} sx={{ cursor: 'pointer' }}>
                  <div>{ite?.prevIcon}</div>
                  <div>{ite?.DownloadIcon}</div>
                </Stack>
              </Stack>
            ))}
          </MainCard>
        </Grid>
      </Grid>

      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <Button variant="outlined" color="success">
          <div style={{ display: 'flex', gap: 3, justifyItems: 'center', padding: 3 }}>
            <LockIcon />

            <Typography>Active</Typography>
          </div>
        </Button>
        <Button variant="outlined" color="error">
          <div style={{ display: 'flex', gap: 3, justifyItems: 'center', padding: 3 }}>
            <UnLockIcon />
            <Typography> Deactivate</Typography>
          </div>
        </Button>
      </Stack>
    </MainCard>
  );
};

export default RecuiterForm;
