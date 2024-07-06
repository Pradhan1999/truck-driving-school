import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import MainCard from "components/MainCard";
import ControlledField from "components/ui/ControlledField";
import Date from "components/ui/Date";
import { Controller } from "react-hook-form";

const OtherDetails = ({ control, errors }: any) => {
  return (
    <>
      <MainCard content={false} title="" sx={{ mt: 3 }}>
        <Stack padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="campus"
                label="Campus"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="course"
                label="Course"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="subject"
                label="Subject"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="instructorName"
                label="Instructor Name"
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
                name="licNo"
                label="Licence/Certification Number"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="licExpiryNo"
                label="Licence/Certification Expiry"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="licClass"
                label="Licence/Certification Class"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Driver History (if applicable)"
                name="driverHistory"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Driver Abstract (if applicable)"
                name="driverAbstract"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="dermitPoints"
                label="Dermit Points (if applicable)"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="experience"
                label="Years of Experience"
                errors={errors}
                control={control}
              />
            </Grid>
          </Grid>
        </Stack>
      </MainCard>

      {/* Qualification */}
      <MainCard
        content={false}
        title="Instructor Qualification Course (if applicable)"
        sx={{ mt: 3 }}
      >
        <Stack padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="couseName"
                label="Course Name"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="provider"
                label="Provider"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="authorizedBy"
                label="Authorized by Lead Instructor"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Certification Date"
                name="certificationDate"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="recertification"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Recertification</FormLabel>
                    <Select {...field} size="small" sx={{ mt: 1 }}>
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                    <FormHelperText error={!!errors["fundingStatus"]}>
                      {errors["fundingStatus"]?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Stack>
      </MainCard>

      {/* References */}
      <MainCard content={false} title="References" sx={{ mt: 3 }}>
        <Stack padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="refName"
                label="Name"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="refContactNo"
                label="Contact Number"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Date Verified"
                name="dateVerified"
                control={control}
                error={errors}
              />
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
    </>
  );
};

export default OtherDetails;
