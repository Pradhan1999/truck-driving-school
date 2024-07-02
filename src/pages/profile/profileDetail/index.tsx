import MainCard from 'components/MainCard';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Divider, FormControl, FormLabel, Grid, Stack, Typography, useTheme } from '@mui/material';
import Input from 'components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import Dropdown from 'components/ui/Dropdown';
import { LoadingButton } from '@mui/lab';
import Date from 'components/ui/Date';
import { EditIcon } from 'assets/svg/edit';
import { ProfileIcon } from 'assets/svg/profile';
import useAuth from 'hooks/useAuth';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { openSnackbar } from 'api/snackbar';
import { InfoCircle } from 'iconsax-react';
import { SnackbarProps } from 'types/snackbar';
import dayjs from 'dayjs';

const ProfileInformation = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const formSchema = z.object({
    first_name: z.string().min(2, { message: 'Pleas Enter FirstName' }),
    last_name: z.string().min(2, { message: 'Pleas Enter LastName' }),
    phone: z.string().min(2, { message: 'Pleas Enter Phone' }),
    email: z.string().min(2, { message: 'Pleas Enter Email' }),
    country: z.string()?.optional(),
    state: z.string()?.optional(),
    city: z.string()?.optional(),
    office_end_time: z.date().or(z.string()),
    office_start_time: z.date().or(z.string())
  });
  const dummyArr = [
    { label: 'Alberta', value: 'Alberta' },
    { label: 'Winnipeg', value: 'winnipeg' }
  ];

  const dummyArr2 = [
    { label: 'Alberta', value: 'ALBERTA' },
    { label: 'Winnipeg', value: 'WINNIPEG' }
  ];

  const defaultValues: any = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    office_end_time: '',
    office_start_time: ''
  };
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
    setValue
  }: any = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema)
  });

  console.log('errors', errors);

  useEffect(() => {
    if (user) {
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('address', user.company_address);
      setValue('company', user.company_name);
      setValue('country', user.country);
      setValue('state', user.state);
      setValue('city', user.city);
      setValue('office_start_time', dayjs(`2022-04-17T${user.office_start_time}`).toDate());
      setValue('office_end_time', dayjs(`2022-04-18T${user.office_end_time}`).toDate());
    }
  }, [user, setValue]);

  const onSubmit = (data: any) => {
    setLoading(true);
    updateProfile({
      body: {
        ...data,
        office_start_time: dayjs(data?.office_start_time).format('HH:mm:ss'),
        office_end_time: dayjs(data?.office_end_time).format('HH:mm:ss')
      }
    })
      .then((res: any) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: 'Profile Updated',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        } as SnackbarProps);
      })
      .catch((err: any) => {
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
    <MainCard
      title={
        <Stack>
          <Typography sx={{ fontSize: '19px', color: '#394663', fontWeight: '600' }}>Profile Information</Typography>
          <Typography variant="caption" color={'#778194'} fontWeight={400} fontSize={'14px'}>
            Here you can update user settings
          </Typography>
        </Stack>
      }
    >
      <Grid item xs={12} mt={2}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction={'row'} xs={12} spacing={2}>
            <Grid item xs={8}>
              <Typography color={'InfoText'} sx={{ fontWeight: '500' }}>
                Upload Profile Picture
              </Typography>
              <Stack
                direction={'row'}
                justifyContent={'center'}
                gap={1}
                sx={{ py: 1.5, px: 1, mt: 0.5, borderRadius: '10px', width: '12rem', fontSize: '12px', bgcolor: '#F3F3F3' }}
              >
                <ProfileIcon /> Browse Files
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Input control={control} label={'First Name'} name={'first_name'} placeholder="Enter first name" error={errors} />
            </Grid>
            <Grid item xs={6}>
              <Input control={control} label={'Last Name'} name={'last_name'} placeholder="Enter last name" error={errors} />
            </Grid>
            <Grid item xs={6}>
              <Input control={control} label={'Email'} name={'email'} placeholder="Enter email" error={errors} />
            </Grid>
            <Grid item xs={6}>
              <Input control={control} label={'Mobile No.'} name={'phone'} placeholder="Enter mobile no." error={errors} />
            </Grid>
            <Grid item xs={4}>
              <Input control={control} label={'Company'} name={'company'} placeholder="Enter company" error={errors} />
            </Grid>
            <Grid item xs={8}>
              <Input control={control} label={'Address'} name={'address'} placeholder="Enter address" error={errors} />
            </Grid>
            <Grid item xs={4}>
              <Dropdown control={control} label="Country" name="country" options={dummyArr} error={errors} />
            </Grid>
            <Grid item xs={4}>
              <Dropdown control={control} label="Province/State" name="state" options={dummyArr2} error={errors} />
            </Grid>
            <Grid item xs={4}>
              <Dropdown control={control} label="City/Town" name="city" options={dummyArr} error={errors} />
            </Grid>
            <Grid item xs={12}>
              <Typography color={'GrayText'} variant="subtitle2">
                Set your office hours:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 0.5, fontWeight: 600, color: '#5A667B' }}>From</FormLabel>
                <Controller
                  name={'office_start_time'}
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        name="office_start_time"
                        onChange={(date) => {
                          field.onChange(date ? date.toISOString() : null);
                        }}
                        value={field?.value ? dayjs(field?.value) : null}
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
                <FormLabel sx={{ mb: 0.5, fontWeight: 600, color: '#5A667B' }}>To</FormLabel>
                <Controller
                  name={'office_end_time'}
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        name="office_end_time"
                        onChange={(date) => {
                          field.onChange(date ? date.toISOString() : null);
                        }}
                        value={field?.value ? dayjs(field?.value) : null}
                        slotProps={{ textField: { size: 'small' } }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <FormHelperText sx={{ color: 'red', marginTop: 2 }}></FormHelperText>
              </FormControl>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" width="100%">
              <LoadingButton loading={loading} type="submit" variant="contained">
                Save & Continue
              </LoadingButton>
            </Stack>
          </Grid>
        </form>
      </Grid>
    </MainCard>
  );
};

export default ProfileInformation;
