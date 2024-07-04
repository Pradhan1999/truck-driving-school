import { FormLabel, Grid, Stack, Button, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useParams } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getSingleStudent, updateStudent } from 'services/student';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { InfoCircle } from 'iconsax-react';
import { LoadingButton } from '@mui/lab';

const OtherInformation = () => {
  const [loading, setLoading] = useState(false);
  const { student_id } = useParams();
  const [previous_Data, setPerviousData] = useState({});
  function MinHeightTextarea() {
    const blue = {
      100: '#DAECFF',
      200: '#b6daff',
      400: '#3399FF',
      500: '#007FFF',
      600: '#0072E5',
      900: '#003A75'
    };

    const grey = {
      50: '#F3F6F9',
      100: '#E5EAF2',
      200: '#DAE2ED',
      300: '#C7D0DD',
      400: '#B0B8C4',
      500: '#9DA8B7',
      600: '#6B7A90',
      700: '#434D5B',
      800: '#303740',
      900: '#1C2025'
    };
  }

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width:"100%";
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
   

   
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const schema = z.object({
    other_info: z.string().optional()
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    // reset,
    setValue
  } = useForm({
    resolver: zodResolver(schema)
  });

  console.log('errors', errors);

  useEffect(() => {
    if (student_id)
      getSingleStudent({
        pathParams: {
          student_id
        }
      })?.then((res) => {
        setValue('other_info', res?.other_info);
        setPerviousData(res);
      });
  }, [student_id]);

  console.log('previous_Data', previous_Data);

  const onSubmit = (data: any) => {
    setLoading(true);
    const previousItem: any = { ...previous_Data };
    delete previousItem?.id;
    delete previousItem?.created_by;
    delete previousItem?.created_by_staff;
    delete previousItem?.createdAt;
    delete previousItem?.user_id;
    delete previousItem?.updatedAt;
    delete previousItem?.recruiter_id;
    // delete previousItem
    updateStudent({ body: { ...previousItem, other_info: data?.other_info }, pathParams: { id: student_id } })
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
      })
      .catch((err) => {
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
    <MainCard content={false} title="Other Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack maxWidth="md" padding={3}>
          <Grid container>
            <Grid container direction={'row'} xs={12} spacing={2} marginBottom={2}>
              <Grid item xs={12}>
                <FormLabel sx={{ fontWeight: '600' }}>
                  Please provide more information about your current study permit/visa and any past refusals, if any
                </FormLabel>
              </Grid>
            </Grid>
            {/* <Textarea aria-label="minimum height" minRows={5} placeholder="Minimum 3 rows" /> */}
            <Controller
              name={'other_info'}
              control={control}
              render={({ field }) => <TextField {...field} placeholder="Provide Details" multiline rows={7} maxRows={7} fullWidth />}
            />
          </Grid>
        </Stack>
        <Stack direction={'row'} justifyContent={'end'} padding={2}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            className=" mt-16 "
            aria-label="Sign in"
            type="submit"
            size="large"
          >
            Save and Continue
          </LoadingButton>
        </Stack>
      </form>
    </MainCard>
  );
};

export default OtherInformation;
