// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Grid,
  InputLabel,
  Radio,
  Stack,
  Button,
  FormLabel,
  Select,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Container
} from '@mui/material';
import { RadioGroup, FormControlLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { object, z } from 'zod';
import { fontWeight } from '@mui/system';
import ThemeButton from 'components/ui/Button';
import { Add, InfoCircle } from 'iconsax-react';
import { FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Body from 'themes/overrides/Body';
import { addEducation, getEducation, updateEducation } from 'services/student';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import LoadingButton from 'components/@extended/LoadingButton';
import { useParams } from 'react-router';
import AutocompleteInput from 'components/ui/Autocomplete';
import countries from '../../../utils/countries.json';
import { trim } from 'lodash';
import { programLevels } from 'pages/college/collegeDetail/addProgram/options';

const EducationHistory = ({ studentId }: any) => {
  const { student_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdateId] = useState<any>();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  console.log('updateId', updateId);
  const schema = z.object({
    educationHistory: z.array(
      z.object({
        level_of_education: z.string().or(z.number()),
        country: z.string().min(1, 'Please select  countryInstitution'),
        name: z.string().min(1, 'Please enter  institutionName'),
        language: z.string().min(1, 'Please enter   primary language'),
        from: z.string(),
        to: z.string(),
        province: z.string().min(1, 'Please enter  province'),
        city: z.string().min(1, 'Please enter  city'),
        address: z.string().min(1, 'Please enter  address'),
        postal_zip: z.string().min(1, 'Please enter  postalCode'),
        graduated_flag: z.boolean().or(z.string()),
        id: z.number()?.optional()
      })
    )
  });

  const defaultValues: any = {
    educationHistory: [
      {
        level_of_education: '',
        country: '',
        name: '',
        language: '',
        from: '',
        to: '',
        province: '',
        city: '',
        address: '',
        postal_zip: '',
        graduated_flag: ''
      }
    ]
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  console.log('errors', errors);

  console.log('control', control);
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'educationHistory'
  });

  if (fields?.length === 0) {
    append({});
  }

  const onSubmit = (data: any) => {
    setLoading(true);
    const value = data?.educationHistory?.map((ite: any) => {
      return ite;
    });
    const allHaveId = data.educationHistory.every((obj) => obj.hasOwnProperty('id'));
    if (updateId && allHaveId) {
      updateEducation({
        body: [...value],
        pathParams: {
          student_id
        }
      })
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          setUpdateId(res?.data?.[0]?.student_id);
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
    } else {
      addEducation({
        body: [...value],
        pathParams: {
          student_id
        }
      })
        .then((res) => {
          getEducation({ pathParams: { student_id } })?.then((res) => {
            setUpdateId(res?.rows?.[0]?.student_id);
            const data = Object?.values(res?.rows)?.map((ite) => {
              return ite;
            });
            setValue('educationHistory', data);
          });
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
    }
  };

  useEffect(() => {
    getEducation({ pathParams: { student_id } })?.then((res) => {
      setUpdateId(res?.rows?.[0]?.student_id);
      const data = Object?.values(res?.rows)?.map((ite) => {
        return ite;
      });
      setValue('educationHistory', data);
    });
  }, [student_id, setValue, append]);

  console.log('fields', fields);
  const stateNames = countries?.flatMap((item: any) =>
    item.states.map((state: any) => {
      return {
        label: state.name,
        value: state.name,
        cities: state?.cities
      };
    })
  );

  const handleFilterCities = (e: any) => {
    setSelectedState(e);
    let citiesData = stateNames
      ?.find((val: any) => val?.label === e)
      ?.cities?.map((val: any) => {
        return {
          label: val?.name,
          value: val?.name
        };
      });
    setSelectedCity('');
    if (!citiesData?.[0]?.label) {
      setSelectedCity(e);
      setCities(() => [{ label: selectedState, value: selectedState }]);
    } else {
      setCities(citiesData);
    }
  };

  return (
    <div>
      <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        {fields?.map((item, index) => {
          return (
            <Stack mb={3} key={item?.id}>
              <MainCard
                key={item?.id}
                content={false}
                title="Education History"
                sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem', fontWeight: 600 } }}
              >
                <Stack maxWidth="md" padding={3}>
                  <Grid container>
                    <Grid container direction={'row'} xs={12} spacing={2}>
                      <Grid item xs={4}>
                        <Stack spacing={1}>
                          <FormControl>
                            <FormLabel sx={{ color: '#5A667B', mb: 0.5, fontWeight: 600 }}>Level Of Education</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.level_of_education`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  notched={false}
                                  sx={{ height: '40px' }}
                                  id={`levelEducation-${index}`}
                                  onChange={(e) => {
                                    field.onChange(e?.target?.value);
                                  }}
                                >
                                  {programLevels?.map((item: any, index: any) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.level_of_education?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
                        <Stack spacing={1}>
                          <FormControl>
                            <FormLabel sx={{ color: '#5A667B', mb: 0.5, fontWeight: 600 }}>Country of Institution</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.country`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  notched={false}
                                  sx={{ height: '40px' }}
                                  id={`countryInstitution-${index}`}
                                  onChange={(e) => {
                                    field.onChange(e?.target?.value);
                                  }}
                                >
                                  {[
                                    { label: 'Australia', value: 'australia' },
                                    { label: 'Canada', value: 'canada' }
                                  ]?.map((item: any, index: any) => (
                                    <MenuItem key={index} value={item.value}>
                                      {item.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.country?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
                        <Stack spacing={1}>
                          <FormControl fullWidth>
                            <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Name of Institution</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.name`}
                              control={control}
                              render={({ field }) => (
                                <OutlinedInput notched={false} {...field} required sx={{ height: '40px' }} fullWidth />
                              )}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.name?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid container direction={'row'} xs={12} spacing={2}>
                      <Grid item xs={4}>
                        <Stack spacing={1}>
                          <FormControl fullWidth>
                            <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Primary Language of Institution</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.language`}
                              control={control}
                              render={({ field }) => <OutlinedInput {...field} required sx={{ height: '40px' }} fullWidth />}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.language?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
                        <div>
                          <FormControl fullWidth>
                            <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Attention Institution From</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.from`}
                              control={control}
                              render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    onChange={(date) => {
                                      field.onChange(date?.toISOString());
                                    }}
                                    value={field?.value ? dayjs(field?.value) : null}
                                    slotProps={{ textField: { size: 'small' } }}
                                    className=""
                                  />
                                </LocalizationProvider>
                              )}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.from?.message}
                            </FormHelperText>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div>
                          <FormControl fullWidth>
                            {/* <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Date of Birth</FormLabel> */}
                            <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Attention Institution To</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.to`}
                              control={control}
                              render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    onChange={(date) => {
                                      field.onChange(date?.toISOString());
                                    }}
                                    value={field?.value ? dayjs(field?.value) : null}
                                    slotProps={{ textField: { size: 'small' } }}
                                    className=""
                                  />
                                </LocalizationProvider>
                              )}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.to?.message}
                            </FormHelperText>
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container direction={'row'} xs={12} spacing={2}>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <FormControl fullWidth>
                            {/* <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Province</FormLabel> */}
                            {/* <Controller
                              name={`educationHistory.${index}.province`}
                              control={control}
                              render={({ field }) => (
                                <AutocompleteInput
                                  control={control}
                                  label="Province/State"
                                  name={`educationHistory.${index}.state`}
                                  options={stateNames}
                                  error={errors}
                                  value={selectedState}
                                  onChange={(e) => {
                                    console.log('data', e);

                                    handleFilterCities(e);
                                  }}
                                /> */}

                            <Controller
                              name={`educationHistory.${index}.province`}
                              control={control}
                              render={({ field }) => (
                                <AutocompleteInput
                                  label="Province/State"
                                  name={field?.name}
                                  options={stateNames}
                                  error={errors[`educationHistory.${index}.province`]?.message}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFilterCities(e);
                                  }}
                                />
                              )}
                            />

                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.province?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <FormControl fullWidth>
                            {/* <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>City/Town</FormLabel> */}
                            {/* <Controller
                              name={`educationHistory.${index}.city`}
                              control={control}
                              render={
                                ({ field }) => (
                                  <AutocompleteInput
                                    control={control}
                                    label="City"
                                    name={`educationHistory.${index}.city`}
                                    options={cities}
                                    error={errors}
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e)}
                                  />
                                )

                                // <OutlinedInput {...field} required sx={{ height: '40px' }} fullWidth />
                              }
                            /> */}

                            <Controller
                              name={`educationHistory.${index}.city`}
                              control={control}
                              render={({ field }) => (
                                <AutocompleteInput
                                  label="City"
                                  name={field.name}
                                  options={cities}
                                  error={errors[`educationHistory.${index}.city`]}
                                  value={field.value}
                                  onChange={(e) => {
                                    setSelectedCity(e);
                                    field.onChange(e);
                                  }}
                                />
                              )}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.city?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container direction={'row'} xs={12} spacing={2}>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <FormControl fullWidth>
                            <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Address</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.address`}
                              control={control}
                              render={({ field }) => <OutlinedInput {...field} required sx={{ height: '40px' }} fullWidth />}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.address?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <FormControl fullWidth>
                            <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Postal/Zip Code</FormLabel>
                            <Controller
                              name={`educationHistory.${index}.postal_zip`}
                              control={control}
                              render={({ field }) => <OutlinedInput {...field} required sx={{ height: '40px' }} fullWidth />}
                            />
                            <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                              {errors && (errors as any)?.educationHistory?.[index]?.primaryLanguage?.message}
                            </FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} px={1} py={1}>
                      <Stack spacing={1}>
                        <FormControl>
                          <FormLabel sx={{ color: '#5A667B', fontWeight: 600 }} id="demo-form-control-label-placement">
                            I have graduated from this institution
                          </FormLabel>
                          <Controller
                            name={`educationHistory.${index}.graduated_flag`}
                            control={control}
                            render={({ field }) => (
                              <RadioGroup {...field} row aria-labelledby="demo-form-control-label-placement" defaultValue="public">
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                              </RadioGroup>
                            )}
                          />

                          <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                            {errors && (errors as any)?.educationHistory?.[index]?.term?.message}
                          </FormHelperText>
                        </FormControl>
                      </Stack>
                    </Stack>
                  </Grid>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={2}>
                  <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <Stack>
                      <ThemeButton variant="text" size="small" startIcon={<Add />} onClick={() => append({})}>
                        Add More School
                      </ThemeButton>
                    </Stack>
                    <Stack>
                      {index !== 0 && (
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => remove(index)}
                          className="mt-16 ml-2"
                          aria-label="Remove Education"
                        >
                          Remove School
                        </Button>
                      )}
                    </Stack>
                  </Stack>

                  <Stack direction={'row'} justifyContent={'end'} padding={2}>
                    <LoadingButton
                      loading={loading}
                      // disabled={!studentId}
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
            </Stack>
          );
        })}
      </form>
    </div>
  );
};

export default EducationHistory;
