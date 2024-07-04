// @ts-nocheck

import { Grid, InputLabel, Radio, Stack, Button, FormHelperText, OutlinedInput, Select, MenuItem } from '@mui/material';
import Input from 'components/ui/Input';
import Dropdown from 'components/ui/Dropdown';

import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import Date from 'components/ui/Date';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ThemeButton from 'components/ui/Button';
import { Add, InfoCircle } from 'iconsax-react';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import LoadingButton from 'components/@extended/LoadingButton';
import { addEmployment, getEmployment, updateEmployment } from 'services/student';
import { useEffect, useState } from 'react';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { useParams } from 'react-router';
import AutocompleteInput from 'components/ui/Autocomplete';
import countries from '../../../utils/countries.json';

interface Props {
  control: any;
  errors: any;
}

const EmploymentHistory = ({ studentId }: any) => {
  const [loading, setLoading] = useState(false);
  const { student_id } = useParams();
  const [updateId, setUpdateId] = useState();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const schema = z.object({
    employmentHistory: z.array(
      z.object({
        name: z.string().min(1, ' Please select company name '),
        position: z.string().min(1, 'Please select  position'),
        start_date: z.string()?.min(1, 'Please select start  date'),
        end_date: z.string()?.min(1, 'Please select end date'),
        city: z.string().min(1, 'Please enter  city'),
        address: z.string().min(1, 'Please enter  address'),
        province: z.string().min(1, 'Please enter  province'),
        currently_working: z.boolean().or(z.string()),
        id: z.number()?.optional()
      })
    )
  });

  const defaultValues: any = {
    employmentHistory: [
      {
        name: '',
        position: '',
        start_date: '',
        end_date: '',
        province: '',
        city: '',
        address: '',
        currently_working: ''
      }
    ]
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'employmentHistory'
  });

  if (fields && fields.length === 0) {
    append({});
  }

  const onSubmit = (data: any) => {
    const value = data?.employmentHistory?.map((ite: any) => {
      return ite;
    });
    const allHaveId = data?.employmentHistory?.every((obj: any) => obj.hasOwnProperty('id'));

    setLoading(true);

    if (updateId && allHaveId) {
      updateEmployment({
        body: [...value],
        pathParams: {
          student_id
        }
      })
        .then((res) => {
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
      addEmployment({
        body: [...value],

        pathParams: {
          student_id
        }
      })
        .then((res) => {
          getEmployment({ pathParams: { student_id } })?.then((res) => {
            setUpdateId(res?.rows?.[0]?.student_id);
            const data = Object?.values(res?.rows)?.map((ite) => {
              return ite;
            });
            setValue('employmentHistory', data);
            setLoading(false);
          });
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

  useEffect(() => {
    getEmployment({ pathParams: { student_id } })?.then((res) => {
      setUpdateId(res?.rows?.[0]?.student_id);
      const data = Object?.values(res?.rows)?.map((ite) => {
        return ite;
      });
      setValue('employmentHistory', data);
    });
  }, [student_id]);

  return (
    <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <Stack mb={3}>
          <MainCard content={false} title="Employment History" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }} key={item?.id}>
            <Stack maxWidth="md" padding={3}>
              <Grid container>
                <Grid container direction={'row'} xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel sx={{ color: '#5A667B', mb: 0.5, fontWeight: 600 }}>Company Name</FormLabel>
                        <Controller
                          name={`employmentHistory.${index}.name`}
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
                              {[
                                { label: 'Enroll', value: 'enroll' },
                                { label: 'Upforks', value: 'upforks' }
                              ]?.map((item: any, index: any) => (
                                <MenuItem key={index} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                          {errors && (errors as any)?.employmentHistory?.[index]?.name?.message}
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel sx={{ color: '#5A667B', mb: 0.5, fontWeight: 600 }}>Position/Designation</FormLabel>
                        <Controller
                          name={`employmentHistory.${index}.position`}
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
                              {[
                                { label: 'Admin', value: 'admins' },
                                { label: 'Staff', value: 'staff' }
                              ]?.map((item: any, index: any) => (
                                <MenuItem key={index} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                          {errors && (errors as any)?.employmentHistory?.[index]?.position?.message}
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container direction={'row'} xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <div>
                      <FormControl fullWidth>
                        <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Start Date</FormLabel>
                        <Controller
                          name={`employmentHistory.${index}.start_date`}
                          control={control}
                          render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                {...field}
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
                          {errors && (errors as any)?.employmentHistory?.[index]?.start_date?.message}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <FormControl fullWidth>
                        <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>End Date</FormLabel>
                        <Controller
                          name={`employmentHistory.${index}.end_date`}
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
                          {errors && (errors as any)?.employmentHistory?.[index]?.end_date?.message}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>

                <Stack direction={'row'} justifyContent={'center'} width={'100%'} ml={20} py={1}>
                  <Stack spacing={1}>
                    <FormControl>
                      <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }} id="demo-form-control-label-placement">
                        Currently Working
                      </FormLabel>
                      <Controller
                        name={`employmentHistory.${index}.currently_working`}
                        control={control}
                        render={({ field }) => (
                          <RadioGroup {...field} row>
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                          </RadioGroup>
                        )}
                      />

                      <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                        {errors && (errors as any)?.employmentHistory?.[index]?.currently_working?.message}
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                </Stack>

                <Grid container direction={'row'} xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <FormControl fullWidth>
                        {/* <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Province</FormLabel> */}
                        {/* <Controller
                          name={`employmentHistory.${index}.province`}
                          control={control}
                          render={({ field }) => (
                            <OutlinedInput
                              {...field}
                              required
                              sx={{ height: '40px' }}
                              fullWidth
                              // placeholder={props.placeholder}
                            />
                          )}
                        /> */}

                        <Controller
                          name={`employmentHistory.${index}.province`}
                          control={control}
                          render={({ field }) => (
                            <AutocompleteInput
                              label="Province/State"
                              name={field?.name}
                              options={stateNames}
                              error={errors[`employmentHistory.${index}.province`]?.message}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFilterCities(e);
                              }}
                            />
                          )}
                        />

                        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                          {errors && (errors as any)?.employmentHistory?.[index]?.province?.message}
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <FormControl fullWidth>
                        {/* <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>City/Town</FormLabel> */}
                        <Controller
                          name={`employmentHistory.${index}.city`}
                          control={control}
                          render={({ field }) => (
                            <AutocompleteInput
                              label="City"
                              name={field.name}
                              options={cities}
                              error={errors[`employmentHistory.${index}.city`]}
                              value={field.value}
                              onChange={(e) => {
                                setSelectedCity(e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                          {errors && (errors as any)?.employmentHistory?.[index]?.city?.message}
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container direction={'row'} xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <FormControl fullWidth>
                        <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600 }}>Address</FormLabel>
                        <Controller
                          name={`employmentHistory.${index}.address`}
                          control={control}
                          render={({ field }) => <OutlinedInput {...field} required sx={{ height: '40px' }} fullWidth />}
                        />
                        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                          {errors && (errors as any)?.employmentHistory?.[index]?.address?.message}
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={3}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Stack>
                  <ThemeButton variant="text" size="small" startIcon={<Add />} onClick={() => append({})}>
                    Add More Employment
                  </ThemeButton>
                </Stack>
                <Stack>
                  {index !== 0 && (
                    <Button variant="text" color="error" onClick={() => remove(index)} className="mt-16 ml-2" aria-label="Remove Education">
                      Remove Employment
                    </Button>
                  )}
                </Stack>
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
            </Stack>
          </MainCard>
        </Stack>
      ))}
    </form>
  );
};

export default EmploymentHistory;
