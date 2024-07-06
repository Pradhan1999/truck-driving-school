import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import MainCard from "components/MainCard";
import Date from "components/ui/Date";
import ControlledField from "components/ui/ControlledField";
import { Controller } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef, useState } from "react";

const PersonalInformation = ({ control, errors }: any) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const [profilePicture, setProfilePicture] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleRemove = () => {
    setProfilePicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <MainCard content={false} title="Personal Information">
      <Stack padding={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="firstName"
              label="First Name"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="middleName"
              label="Middle Name"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="lastName"
              label="Last Name"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="email"
              label="Email"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup {...field} row sx={{ pt: 1, pl: 1 }}>
                    {genderOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText error={!!errors["gender"]}>
                    {errors["gender"]?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="userName"
              label="Username"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="contactNo"
              label="Contact Number"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="altContactNo"
              label="Alternative Contact Number"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="licenceNo"
              label="Licence/ID Number"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Date
              label="Date of Birth"
              name="dob"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="sin"
              label="S.I.N"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="fundingStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormLabel>Funding Status</FormLabel>
                  <Select {...field} size="small" sx={{ mt: 1 }}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                  <FormHelperText error={!!errors["fundingStatus"]}>
                    {errors["fundingStatus"]?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="referredBy"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormLabel>Referred By</FormLabel>
                  <Select {...field} size="small" sx={{ mt: 1 }}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                  <FormHelperText error={!!errors["fundingStatus"]}>
                    {errors["fundingStatus"]?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormLabel>Language of Instruction</FormLabel>
                  <Select {...field} size="small" sx={{ mt: 1 }}>
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="hindi">Hindi</MenuItem>
                  </Select>
                  <FormHelperText error={!!errors["fundingStatus"]}>
                    {errors["fundingStatus"]?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <FormLabel>Student Profile Picture</FormLabel>
              <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                id="profile-picture-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="profile-picture-upload">
                <Button variant="outlined" component="span" sx={{ mt: 1 }}>
                  Upload Picture
                </Button>
              </label>
              {profilePicture && (
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 1, px: 1 }}
                >
                  <Grid item xs>
                    <Typography variant="body1" noWrap>
                      {profilePicture.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<AiOutlineDelete />}
                      onClick={handleRemove}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default PersonalInformation;
