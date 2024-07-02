import {
  Grid,
  InputLabel,
  Radio,
  Stack,
  Button,
  Typography,
  FormHelperText,
  FormControl,
  FormLabel,
  Divider,
  Autocomplete,
  Box,
  TextField
} from '@mui/material';
import Input from 'components/ui/Input';
import Dropdown from 'components/ui/Dropdown';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import Date from 'components/ui/Date';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import AutocompleteInput from 'components/ui/Autocomplete';
import { OutlinedInput } from '@mui/material';
import { countriesPhone } from 'utils/locales/phone';
import { CountryList } from 'utils/locales/countryList';

const PersonalInformation = ({
  control,
  errors,
  loading,
  handleFilterCities,
  handleFilterStates,
  selectedCity,
  cities,
  selectedCountry,
  states,
  countriesData,
  selectedState,
  setSelectedCity,
  genderData,
  setGenderData,
  martialData,
  setMartialData
}: any) => {
  const dummyArr = [
    { label: 'Alberta', value: 'Alberta' },
    { label: 'Winnipeg', value: 'winnipeg' }
  ];

  return (
    <div>
      <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
        <Stack maxWidth="md" padding={3}>
          <Grid container>
            <Grid container direction={'row'} xs={12} spacing={2}>
              <Grid item xs={4}>
                <Input error={errors} labelStyle={{ fontWeight: '600' }} name="first_name" control={control} label="First Name" />
              </Grid>
              <Grid item xs={4}>
                <Input error={errors} labelStyle={{ fontWeight: '600' }} name="last_name" control={control} label="Last Name" key={''} />
              </Grid>

              <Grid item xs={4}>
                <Date label={'Date of Birth'} labelStyle={{ fontWeight: '600' }} name="dob" control={control} error={errors} />
              </Grid>
            </Grid>

            <Grid container direction={'row'} xs={12} spacing={2}>
              {/* <Grid item xs={4}>
                <Dropdown
                  labelStyle={{ fontWeight: '600' }}
                  label="Country of CitizenShip"
                  id="country"
                  name="countryCitizenShip"
                  options={dummyArr}
                  error={errors}
                  control={control}
                />
              </Grid> */}

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Controller
                    name={`countryCitizenShip`}
                    control={control}
                    render={({ field }) => (
                      <AutocompleteInput
                        label="Country of CitizenShip"
                        name={field?.name}
                        options={CountryList?.map((ite) => {
                          return {
                            label: ite?.name,
                            value: ite?.name
                          };
                        })}
                        error={errors?.countryCitizenShip?.message}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.countryCitizenShip?.message}</FormHelperText>
              </Grid>
              <Grid item xs={4}>
                <Input error={errors} labelStyle={{ fontWeight: '600' }} name="passport_number" control={control} label="Passport Number" />
              </Grid>
              <Grid item xs={4}>
                <Date
                  label={'Passport ExpiryDate'}
                  labelStyle={{ fontWeight: '600' }}
                  name="passport_exp"
                  control={control}
                  error={errors}
                />
              </Grid>
            </Grid>

            <Grid container direction={'row'} xs={12} spacing={2}>
              <Grid item xs={4}>
                <Input error={errors} labelStyle={{ fontWeight: '600' }} name="email" control={control} label="Email" />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Phone Number</FormLabel>
                  <Stack direction={'row'} alignItems={'center'} width={'100%'} gap={0}>
                    <Controller
                      name="isd"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          id="country-select-demo"
                          sx={{
                            '& .MuiOutlinedInput-root': { borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 },
                            width: 70
                          }}
                          disableClearable
                          options={countriesPhone}
                          onChange={(event, selectedOption: any) => field.onChange(selectedOption?.phone || '')}
                          value={countriesPhone.find((option) => option.phone === field.value || null)}
                          autoHighlight
                          getOptionLabel={(option: any) => option.phone}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props}>
                              {/* <img
                                loading="lazy"
                                width="20"
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                alt=""
                              /> */}
                              {option.phone}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="isd"
                              sx={{ borderRadius: 0 }}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password'
                              }}
                            />
                          )}
                        />
                      )}
                    />

                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput
                          notched={false}
                          {...field}
                          sx={{
                            height: '41px',
                            borderRadius: '0',
                            borderTopRightRadius: '6px',
                            borderBottomRightRadius: '6px',
                            borderTopLeftRadius: '0',
                            borderBottomLeftRadius: '0'
                          }}
                          fullWidth
                        />
                      )}
                    />
                  </Stack>

                  <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.isd?.message}</FormHelperText>
                  <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.phone?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <Input error={errors} labelStyle={{ fontWeight: '600' }} name="first_language" control={control} label="First Lanuage" />
              </Grid>
            </Grid>

            <Stack direction={'column'} width={'100%'}>
              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} pr={1.5} py={2}>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel sx={{ color: '#5A667B', fontWeight: 600 }} id="demo-form-control-label-placement">
                      Marital Status
                    </FormLabel>
                    <Controller
                      name="marital_status"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          name="marital_status"
                          value={field?.value}
                          row
                          aria-labelledby="demo-form-control-label-placement"
                          defaultValue="public"
                          onChange={(e) => {
                            field?.onChange(e?.target?.value);

                            setMartialData({ martial: '', isActive: ['Others']?.includes(e?.target?.value) });
                          }}
                        >
                          <FormControlLabel value="single" control={<Radio />} label="Single" />
                          <FormControlLabel value="married" control={<Radio />} label="Married" />
                          <FormControlLabel value="unMarried" control={<Radio />} label="Un Married" />
                          <FormControlLabel value={'Others'} control={<Radio />} label="Other" />
                          {martialData?.isActive && (
                            <FormControlLabel
                              label=""
                              control={
                                <OutlinedInput
                                  value={martialData?.martial}
                                  onChange={(e) => {
                                    setMartialData({ ...martialData, martial: e?.target?.value });
                                  }}
                                  sx={{ height: '30px', width: '8rem' }}
                                />
                              }
                            />
                          )}
                        </RadioGroup>
                      )}
                    />

                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.marital_status?.message}</FormHelperText>
                  </FormControl>
                </Stack>
              </Stack>

              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} pr={1.5}>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel sx={{ color: '#5A667B', fontWeight: 600 }} id="demo-form-control-label-placement">
                      Gender
                    </FormLabel>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          value={field?.value}
                          aria-labelledby="demo-form-control-label-placement"
                          name="gender"
                          defaultValue="public"
                          onChange={(e) => {
                            field?.onChange(e?.target?.value);
                            setGenderData({ gender: '', isActive: ['Other']?.includes(e?.target?.value) });
                          }}
                        >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="Other" control={<Radio />} label="Other" />
                          {genderData?.isActive && (
                            <FormControlLabel
                              label=""
                              control={
                                <OutlinedInput
                                  value={genderData?.gender}
                                  onChange={(e) => {
                                    setGenderData({
                                      ...genderData,
                                      gender: e?.target?.value
                                    });
                                  }}
                                  sx={{ height: '30px', width: '8rem' }}
                                />
                              }
                            />
                          )}
                        </RadioGroup>
                      )}
                    />

                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.gender?.message}</FormHelperText>
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>

            <Divider />
            <Grid container direction={'row'} xs={12} spacing={2} marginTop={2} mb={2}>
              <Grid item xs={4}>
                <AutocompleteInput
                  control={control}
                  label="Country"
                  name="country"
                  error={errors}
                  onChange={(e: any) => handleFilterStates(e)}
                  options={countriesData}
                  value={selectedCountry}
                />
              </Grid>
              <Grid item xs={4}>
                <AutocompleteInput
                  control={control}
                  label="Province/State"
                  name="state"
                  options={states}
                  error={errors}
                  value={selectedState}
                  onChange={(e) => handleFilterCities(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <AutocompleteInput
                  control={control}
                  label="City"
                  name="city"
                  options={cities}
                  error={errors}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e)}
                />
              </Grid>
            </Grid>

            <Grid container direction={'row'} xs={12} spacing={2}>
              <Grid item xs={4}>
                <Input labelStyle={{ fontWeight: '600' }} error={errors} name="zip" control={control} label="PostalCode" />
              </Grid>
              <Grid item xs={8}>
                <Input labelStyle={{ fontWeight: '600' }} error={errors} name="address" control={control} label="Address" />
              </Grid>
            </Grid>
          </Grid>

          <Stack direction={'row'} justifyContent={'end'} mt={4}>
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
        </Stack>
      </MainCard>
    </div>
  );
};

export default PersonalInformation;
