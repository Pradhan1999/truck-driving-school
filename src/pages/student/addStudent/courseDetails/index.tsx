import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import MainCard from "components/MainCard";
import ControlledField from "components/ui/ControlledField";
import Date from "components/ui/Date";
import { Controller } from "react-hook-form";

const CourseDetails = ({ control, errors }: any) => {
  return (
    <>
      <MainCard content={false} title="Course Details" sx={{ mt: 3 }}>
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
              <Date
                label="Enrollment Date"
                name="enrollDate"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Commencement Date"
                name="commencementDate"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Expected Completion Date"
                name="completionDate"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="courseName"
                label="Course Name"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="practicumLoc"
                label="Practicum Location"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="campusLoc"
                label="Campus Location"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="internationalStudent"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Internation Student</FormLabel>
                    <Select
                      {...field}
                      size="small"
                      sx={{ mt: 1 }}
                      defaultValue=""
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                    <FormHelperText error={!!errors["internationalStudent"]}>
                      {errors["internationalStudent"]?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="classroomSch"
                label="Classroom Schedule"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="practicalSch"
                label="Practical Schedule"
                errors={errors}
                control={control}
              />
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
      <MainCard
        content={false}
        title="Admission Requirements Fees"
        sx={{ mt: 3 }}
      >
        <Stack padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="tutionFee"
                label="Tution Fees CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="bookFee"
                label="Book Fees CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="expendableFee"
                label="Expendable supplies CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="uniformFee"
                label="Uniform and Equipment CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="majorEquipmentFee"
                label="Major Equipment CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="fieldTrips"
                label="Field Trips CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="examFee"
                label="Professional/Exam Fees CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="otherFee"
                label="Other Compulsory CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="internationalFee"
                label="International Student Fees CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="optionalFee"
                label="Optional Fees CAN$"
                errors={errors}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <ControlledField
              name="optionalFee"
              label={
                <Typography variant="subtitle1">Total Fees CAN$</Typography>
              }
              disabled
              errors={errors}
              control={control}
            />
          </Grid>
        </Stack>
      </MainCard>
      {/* PAYMENT */}
      <MainCard content={false} title="Payment Schedule" sx={{ mt: 3 }}>
        <Stack padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label="Date"
                name="paymentDate"
                control={control}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="amount"
                label="Amount"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="remainingAmount"
                label="Remaining Amount"
                errors={errors}
                control={control}
              />
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
    </>
  );
};

export default CourseDetails;
