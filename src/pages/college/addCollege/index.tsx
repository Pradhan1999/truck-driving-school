// @ts-nocheck
import { Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Button, FormControl, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Dropdown from 'components/ui/Dropdown';
import Input from 'components/ui/Input';
import Modal from 'components/ui/Modal';
import { ArrowRight, CloseCircle, InfoCircle } from 'iconsax-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GetSingleInstitute, addInstitute, updateInstitute } from 'services/institute';
import { openSnackbar } from 'api/snackbar';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { FormHelperText } from '@mui/material';
import { SnackbarProps } from 'types/snackbar';
import { VisuallyHiddenInput } from 'components/ui/HiddenUploadInput';
import { UploadIcon } from 'assets/svg/UploadIcon';
import MultipleSelect from 'components/ui/Multiselect';
import intakeOptions from './options';
import countries from './../../../utils/countries.json';
import AutocompleteInput from 'components/ui/Autocomplete';

interface AddCollegeProps {
  open: boolean;
  handleClose: any;
  instituteId: number | undefined;
  setInstituteId: any;
  getAllInstitutes: any;
}

const AddCollege = ({ open, handleClose, instituteId, setInstituteId, getAllInstitutes }: AddCollegeProps) => {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<any>(null);
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [intakes, setIntakes] = useState<string[]>([]);

  //form-schema
  const formSchema = z.object({
    name: z.string().min(1, 'Please enter institute name'),
    is_third_party: z.any(),
    location: z.string().min(1, 'Please enter address'),
    website: z.string().min(1, 'Please enter website').url('Invalid URL format'),
    DLI: z.string().min(1, 'Please enter dli'),
    institute_type: z.string().min(1, 'Please select institute type')
  });

  const defaultValues = {
    name: '',
    location: '',
    website: '',
    DLI: '',
    institute_type: '',
    is_third_party: false
  };

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    reset
  }: any = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema)
  });
  //handle-submit

  useEffect(() => {
    if (instituteId)
      GetSingleInstitute({ pathParams: { id: instituteId } })?.then((res) => {
        Object.keys(res).map((key) => {
          setValue(key, res[key]);
        });
        handleFilterStates(res?.country);
        handleFilterCities(res?.state);
        setSelectedCity(res?.campus);
        setSelectedCountry(res?.country);
        setSelectedState(res?.state);
        setIntakes(res?.intakes?.split(','));
      });
  }, [instituteId, open]);

  const handleClear = () => {
    setSelectedCity('');
    setSelectedCountry('');
    setSelectedState('');
    setIntakes([]);
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      country: selectedCountry,
      state: selectedState,
      campus: selectedCity
    };
    setLoading(true);
    if (instituteId) {
      updateInstitute({
        pathParams: { id: instituteId },
        body: { ...payload }
      })
        .then((res) => {
          setLoading(false);
          reset(defaultValues);
          setInstituteId();
          handleClear();
          getAllInstitutes();
          handleClose();
          openSnackbar({
            open: true,
            message: res?.message,
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as any);
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
      addInstitute({ body: { ...payload } })
        .then((res) => {
          setLoading(false);
          reset(defaultValues);
          handleClose();
          getAllInstitutes();
          handleClear();
          openSnackbar({
            open: true,
            message: res?.message,
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as any);
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
  const countriesData = countries?.map((val: any) => {
    return {
      label: val?.name,
      value: val?.name
    };
  });

  const handleFilterStates = (e: any) => {
    setSelectedCountry(e);
    let statesData = countries
      ?.find((val: any) => val?.name === e)
      ?.states?.map((val: any) => {
        return {
          label: val?.name,
          value: val?.name,
          cities: val?.cities
        };
      });
    setSelectedCity('');
    setSelectedState('');
    setStates(statesData);
  };
  const handleFilterCities = (e: any) => {
    setSelectedState(e);
    let citiesData = states
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
    <Modal
      titleVariant={''}
      open={open}
      handleClose={() => {
        handleClose();
        reset(defaultValues);
        setInstituteId();
        handleClear();
      }}
      maxWidth="md"
      closeIcon
      title={instituteId ? 'Update Institute' : 'Add Institute'}
      sx={{
        '& .MuiDialog-paper': { p: 0, minWidth: { xl: 800, sm: 'calc(100% - 20%)' } },
        '& .MuiBackdrop-root': { opacity: '0.5 !important' }
      }}
      footerActions={
        <Grid item xs={12}>
          <Stack direction="row" gap={2} mx={1} justifyContent="space-between">
            <Button
              size="medium"
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleClose();
                reset(defaultValues);
                setInstituteId();
                handleClear();
              }}
            >
              Cancel
            </Button>

            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              endIcon={<ArrowRight />}
              onClick={handleSubmit(onSubmit)}
            >
              {instituteId ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        </Grid>
      }
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid container xs={12} spacing={2}>
            <Grid item xs={9}>
              <Input
                label={'INSTITUTE NAME'}
                name={'name'}
                control={control}
                error={errors}
                placeholder="Enter institute name"
                labelStyle={{ fontWeight: '500' }}
              />
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                control={control}
                label="Direct/3rd Party"
                name="is_third_party"
                options={[
                  { label: 'Direct', value: false },
                  { label: '3rd Party', value: true }
                ]}
                error={errors}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="institute-name" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
              LOCATION
            </InputLabel>
            <Grid container direction={'row'} xs={12} spacing={2}>
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
                  label="Campus city"
                  name="campus"
                  options={cities}
                  error={errors}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e)}
                />
                {/* <Dropdown control={control} label="Campus city" name="campus" options={cities} error={errors} /> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mr={2}>
            <Input control={control} label={'Address'} name={'location'} placeholder="Enter address" error={errors} />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
              INSTITUTION DETAILS
            </InputLabel>
            <Grid container direction={'row'} xs={12} spacing={2}>
              <Grid item xs={4}>
                <Input control={control} label={'Website'} name={'website'} placeholder="Enter website" error={errors} />
              </Grid>
              {/* <Grid item xs={4}>
                <MultipleSelect
                  control={control}
                  label="Intakes"
                  name="intakes"
                  options={intakeOptions}
                  error={errors}
                  selectedItems={intakes}
                  setSelectedItems={setIntakes}
                />
              </Grid> */}
              <Grid item xs={4}>
                <Input label={'DLI'} name={'DLI'} control={control} placeholder="Enter dli" error={errors} />
              </Grid>
            </Grid>
          </Grid>

          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} pr={1.5} py={2}>
            <Stack spacing={1}>
              <FormControl>
                <FormLabel sx={{ color: '#394663' }} id="demo-form-control-label-placement">
                  Institute type
                </FormLabel>
                <Controller
                  name="institute_type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      aria-labelledby="demo-form-control-label-placement"
                      name="institute_type"
                      defaultValue="public"
                    >
                      <FormControlLabel sx={{ color: '#394663' }} value="public" control={<Radio />} label="Public" labelPlacement="end" />
                      <FormControlLabel
                        sx={{ color: '#394663' }}
                        value="private"
                        control={<Radio />}
                        label="Private"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  )}
                />

                <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.institute_type?.message}</FormHelperText>
              </FormControl>
            </Stack>
            <Box>
              <InputLabel>Institute Logo</InputLabel>
              <Stack direction={'column'} justifyContent={'start'}>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="text"
                  endIcon={<UploadIcon />}
                  sx={{ mt: 1, textTransform: 'none', bgcolor: '#EBF1FD' }}
                >
                  Upload <VisuallyHiddenInput type="file" onChange={(e: any) => setLogoFile(e?.target?.files[0])} />
                </Button>
                {logoFile?.name ? (
                  <Stack direction={'row'} mt={0.5} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="subtitle2" color={'GrayText'}>
                      {logoFile?.name?.slice(0, 12)}
                    </Typography>
                    <CloseCircle size={14} color="red" onClick={() => setLogoFile(null)} />
                  </Stack>
                ) : (
                  ''
                )}
              </Stack>
            </Box>
          </Stack>
          {/* <Stack spacing={0} direction={'row'} alignItems={'center'}>
            <Checkbox className="size-small" sx={{ pl: 0 }} />
            <Typography variant="caption" color={'GrayText'}>
              I have read the aforementioned requirements and reviewed the institution's official website for any additional information.
            </Typography>
          </Stack> */}
        </Grid>
      </form>
    </Modal>
  );
};

export default AddCollege;
