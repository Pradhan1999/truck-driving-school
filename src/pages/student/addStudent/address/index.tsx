import {
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { Controller } from "react-hook-form";

const Address = ({ control, errors }: any) => {
  return (
    <>
      <MainCard content={false} title="Address" sx={{ mt: 3 }}>
        <Stack padding={3}>
          <Grid container spacing={2}>
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
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Province</FormLabel>
                    <Select
                      {...field}
                      size="small"
                      defaultValue=""
                      sx={{ mt: 1 }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                    <FormHelperText error={!!errors["province"]}>
                      {errors["province"]?.message}
                    </FormHelperText>
                  </FormControl>
                )}
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
          </Grid>
        </Stack>
      </MainCard>

      <MainCard
        content={false}
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
              Mailing Address
            </Typography>
            <Controller
              name="sameAddress"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ p: 0, mx: 1 }}
                      {...field}
                      checked={field.value}
                    />
                  }
                  label="Same as Permanent Address"
                />
              )}
            />
          </Stack>
        }
        sx={{ mt: 3 }}
      >
        <Stack padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="mailStreetNo"
                label="Street Number"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="mailStreetName"
                label="Street Name"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="mailCity"
                label="City"
                errors={errors}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="mailProvince"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Province</FormLabel>
                    <Select
                      {...field}
                      size="small"
                      sx={{ mt: 1 }}
                      defaultValue=""
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                    <FormHelperText error={!!errors["mailProvince"]}>
                      {errors["mailProvince"]?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ControlledField
                name="mailPostalCode"
                label="Postal Code"
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

export default Address;
