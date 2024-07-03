import { useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// types
import { SnackbarProps } from 'types/snackbar';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { InfoCircle } from 'iconsax-react';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn, resetPassword } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await resetPassword(values?.email).then(
              (res: any) => {
                setStatus({ success: true });
                setSubmitting(false);
                console.log('res', res);
                openSnackbar({
                  open: true,
                  message: res?.message,
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                } as SnackbarProps);
                // setTimeout(() => {
                //   navigate(isLoggedIn ? '/auth/check-mail' : '/check-mail', { replace: true });
                // }, 1500);

                // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                // github issue: https://github.com/formium/formik/issues/2430
              },
              (err: any) => {
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

                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            );
          } catch (err: any) {
            console.log(err, 'errrrrr');
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-forgot">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              {/* <Grid item xs={12} sx={{ mb: -2 }}>
                <Typography variant="caption">Do not forgot to check SPAM box.</Typography>
              </Grid> */}
              <Grid item xs={12}>
                <AnimateButton>
                  <LoadingButton
                    disableElevation
                    loading={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Send Password Reset Email
                  </LoadingButton>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}