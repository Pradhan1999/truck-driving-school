import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import MainCard from "components/MainCard";
import Date from "components/ui/Date";
import ControlledField from "components/ui/ControlledField";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef, useState } from "react";

const PersonalInformation = ({ control, errors }: any) => {
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
    <MainCard content={false} title="Personal Information" sx={{ mt: 3 }}>
      <Stack padding={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="contactNumber"
              label="Contact Number"
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
            <ControlledField
              name="streetNo"
              label="Street Number"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="streetName"
              label="Street Name"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="city"
              label="City"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="province"
              label="Province"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="postalCode"
              label="Postal Code"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ControlledField
              name="educationalQualification"
              label="Educational Qualification"
              errors={errors}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Date
              label="Employment Date"
              name="employmentDate"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Date
              label="Unavailable From"
              name="unavailableFrom"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Date
              label="Unavailable To"
              name="unavailableTo"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Date
              label="Medical Due Date (if applicable)"
              name="medicalDue"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Date
              label="Criminal Record (if applicable)"
              name="criminalRecord"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <FormLabel>Instructor Profile Picture</FormLabel>
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
