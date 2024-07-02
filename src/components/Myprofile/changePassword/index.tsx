import { useState, SyntheticEvent } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { Eye, EyeSlash } from 'iconsax-react';
import { FormLabel, Typography } from '@mui/material';

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <MainCard title="Change Password">
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} sm={6}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              {/* <Typography sx={{ color: '#5A667B', mb: 0.5, fontWeight: 900 }}>Current Password</Typography> */}
              {/* <InputLabel htmlFor="password-current">Current Password</InputLabel> */}
              <OutlinedInput
                id="password-current"
                placeholder="Enter Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                      color="secondary"
                    >
                      {showCurrentPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="password-old"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-password">New Password</InputLabel>
              <OutlinedInput
                id="password-password"
                placeholder="Enter New Password"
                type={showNewPassword ? 'text' : 'password'}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                      color="secondary"
                    >
                      {showNewPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="password-password"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
              <OutlinedInput
                id="password-confirm"
                placeholder="Enter Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                      color="secondary"
                    >
                      {showConfirmPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="password-confirm"
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ChangePassword;
