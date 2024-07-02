// @ts-nocheck
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  ListSubheader,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Modal from 'components/ui/Modal';
import { ArrowRight, InfoCircle } from 'iconsax-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import Input from 'components/ui/Input';
import Dropdown from 'components/ui/Dropdown';
import { GetAllInstitute, GetsingleProgram, addProgram, updateProgram } from 'services/institute';
import Body from 'themes/overrides/Body';
import { openSnackbar } from 'api/snackbar';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { FormHelperText } from '@mui/material';
import { SnackbarProps } from 'types/snackbar';
import { useParams } from 'react-router';
import MultipleSelect from 'components/ui/Multiselect';
import { programLevels, tuitionFeeLevels } from './options';
import intakeOptions from 'pages/college/addCollege/options';
import { MenuItem } from '@mui/material';
import NestedSelect from 'components/ui/NestedSelect';

interface AddProgramProps {
  open: boolean;
  handleClose: () => void;
  getALLProgram: () => void;
  programId?: number;
  setProgramId: any;
}

const initialValue = {
  TOEFL: {
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
    name: 'TOEFL'
  },

  IELTS: { listening: 0, speaking: 0, reading: 0, writing: 0, name: 'IELTS' },
  Duolingo: { overall_score: 0, name: 'Duolingo' },
  PTE: { listening: 0, speaking: 0, reading: 0, writing: 0, overall_score: 0, name: 'PTE' }
};

const initialSelectValue = {
  TOEFL: false,
  IELTS: false,
  Duolingo: false,
  PTE: false
};
const AddProgram = ({ handleClose, open, getALLProgram, programId, setProgramId }: AddProgramProps) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [intakeMonths, setIntakeMonths] = useState([]);
  const [selectedScores, setSelectedScores] = useState<any>(initialValue);
  const [selectedItems, setSelectedItems] = useState<any>(initialSelectValue);
  const [error, setError] = useState('');

  //form-schema
  const formSchema = z.object({
    program_name: z.string().min(1, 'Please enter program name'),
    college_id: z.number().or(z.string())?.optional(),
    program_level: z.number().min(1, 'Please select program level'),
    discipline: z.string().min(1, 'Please enter discipline'),
    tuition_fee: z.string().min(1, 'Please enter tuition fee'),
    application_fee: z.string().min(1, 'Please enter application fee'),
    ancillaryFee: z.string().min(1, 'Please enter application fee'),
    commission: z
      .string()
      .or(z.number())
      .refine((value) => value !== undefined && value !== 0 && value !== '', {
        message: 'Please enter commission'
      })
      ?.refine((value: any) => value <= 100, { message: 'Please enter a valid commission' }),
    intake_months: z
      .array(z.string())
      .or(z.string())
      .refine((value) => value !== undefined && value !== 0 && value !== '', {
        message: 'Please select  at least for each intake month'
      }),
    minimum_education_level: z.string().or(z.number()),
    minimum_grading: z.string().min(1, 'Please enter minimum grading'),
    remarks: z.string()?.optional(),
    is_active: z
      .string()
      .or(z.boolean())
      .refine((value) => value !== undefined && value !== 0 && value !== '', {
        message: 'Please select program status'
      })
  });

  const defaultValue = {
    program_name: '',
    college_id: '',
    program_level: 0,
    discipline: '',
    tuition_fee: '',
    application_fee: '',
    ancillaryFee: '',
    commission: '',
    intake_months: '',
    minimum_education_level: '',
    minimum_grading: '',
    remarks: '',
    is_active: ''
  };

  // use-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  }: any = useForm({
    defaultValues: defaultValue,
    resolver: zodResolver(formSchema)
  });

  console.log('error', errors);
  useEffect(() => {
    if (programId)
      GetsingleProgram({
        pathParams: { id: programId }
      })?.then((res) => {
        console.log('res', res);
        Object.keys(res).forEach((key) => {
          setValue(key, res[key]);
        });
        setIntakeMonths(res?.intake_months?.split(','));
        const updatedScores = { ...selectedScores };

        res?.language_score.forEach((score) => {
          const { id, name, listening, speaking, reading, writing, overall_score } = score;

          switch (name) {
            case 'TOEFL':
              updatedScores.TOEFL = { ...updatedScores.TOEFL, id, listening, speaking, reading, writing, name };
              break;
            case 'IELTS':
              updatedScores.IELTS = { ...updatedScores.IELTS, id, listening, speaking, reading, writing, name };
              break;
            case 'Duolingo':
              updatedScores.Duolingo = { ...updatedScores.Duolingo, id, overall_score, name };
              break;
            case 'PTE':
              updatedScores.PTE = { ...updatedScores.PTE, id, listening, speaking, reading, writing, overall_score, name };
              break;
            default:
              break;
          }
        });

        res?.language_score.forEach((score) => {
          const { name, listening, speaking, reading, writing, overall_score } = score;

          console.log('listening', listening);

          if (name === 'TOEFL' && (listening !== '0' || speaking !== '0' || reading !== '0' || writing !== '0')) {
            setSelectedItems((prevState) => ({
              ...prevState,
              TOEFL: true
            }));
          } else if (name === 'IELTS' && (listening !== '0' || speaking !== '0' || reading !== '0' || writing !== '0')) {
            setSelectedItems((prevState) => ({
              ...prevState,
              IELTS: true
            }));
          } else if (name === 'Duolingo' && overall_score !== '0') {
            setSelectedItems((prevState) => ({
              ...prevState,
              Duolingo: true
            }));
          } else if (
            name === 'PTE' &&
            (listening !== '0' || speaking !== '0' || reading !== '0' || writing !== '0' || overall_score !== '0')
          ) {
            setSelectedItems((prevState) => ({
              ...prevState,
              PTE: true
            }));
          }
        });

        setSelectedScores(updatedScores);
      });
  }, [open]);

  const onSubmit = (data: any) => {
    setError(Object.values(selectedItems)?.every((eve) => eve === false));
    if (!Object.values(selectedItems)?.every((eve) => eve === false))
      if (programId) {
        setLoading(true);
        updateProgram({
          pathParams: { id: programId },
          body: {
            ...data,
            intake_months: intakeMonths?.toString(),
            remarks: data?.remarks ? data?.remarks : undefined,
            language_score: Object.values(selectedScores),
            college_id: id
          }
        })
          .then((res) => {
            setLoading(false);
            getALLProgram();
            reset(defaultValue);
            handleClose();
            setSelectedScores({ ...initialValue });
            setSelectedItems({ ...initialSelectValue });
            setProgramId();
            setIntakeMonths([]);
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
        setLoading(true);
        addProgram({
          body: {
            ...data,
            intake_months: intakeMonths?.toString(),
            remarks: data?.remarks ? data?.remarks : undefined,
            language_score: Object.values(selectedScores),
            college_id: id
          }
        })
          .then((res) => {
            setLoading(false);
            getALLProgram();
            reset(defaultValue);
            setIntakeMonths([]);
            handleClose();
            setSelectedScores({ ...initialValue });
            setSelectedItems({ ...initialSelectValue });
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
  const dummyArr = [
    { label: 'Alberta', value: 'Alberta' },
    { label: 'Winnipeg', value: 'winnipeg' }
  ];
  const handleChange = (value: any) => {
    setIntakeMonths(value);
  };

  return (
    <Modal
      open={open}
      handleClose={() => {
        handleClose();
        setProgramId();
        setSelectedScores({ ...initialValue });
        setSelectedItems({ ...initialSelectValue });
        setIntakeMonths([]);
        reset();
      }}
      maxWidth="md"
      closeIcon
      title={programId ? 'Update Program' : 'Add Program'}
      sx={{
        '& .MuiDialog-paper': { p: 0, minWidth: { xl: 800, sm: 'calc(100% - 20%)' } },
        '& .MuiBackdrop-root': { opacity: '0.5 !important' }
      }}
      footerActions={
        <Grid item xs={12}>
          <Stack direction="row" mx={1} justifyContent="space-between">
            <Button
              size="medium"
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleClose();
                setProgramId();
                setSelectedScores({ ...initialValue });
                setSelectedItems({ ...initialSelectValue });
                setIntakeMonths([]);
                reset();
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
              {programId ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        </Grid>
      }
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0}>
          <Grid item xs={12} spacing={2}>
            <Input
              labelStyle={{ fontWeight: '500', mb: 1 }}
              label={'PROGRAM NAME'}
              name={'program_name'}
              control={control}
              placeholder="Enter program name"
              error={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="program-details" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
              PROGRAM DETAILS
            </InputLabel>
            <Grid container direction={'row'} xs={12} columnSpacing={2}>
              <Grid item xs={4}>
                <Dropdown control={control} label="Program Level" name="program_level" options={programLevels} error={errors} />
              </Grid>
              <Grid item xs={4}>
                <Input control={control} label={'Discipline'} name={'discipline'} placeholder="Enter discipline" error={errors} />
              </Grid>
              <Grid item xs={4}>
                <Input control={control} label={'Tuition fees'} name={'tuition_fee'} error={errors} />
              </Grid>
              <Grid item xs={4}>
                <Input
                  control={control}
                  label={'Application fees'}
                  name={'application_fee'}
                  placeholder="Enter application Fee"
                  error={errors}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </Grid>
              <Grid item xs={4}>
                <Input control={control} label={'Commission'} name={'commission'} placeholder="Enter commission" error={errors} />
              </Grid>
              <Grid item xs={4}>
                <Input control={control} label={'Ancillary Fee'} name={'ancillaryFee'} placeholder="Enter ancillary fee" error={errors} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="program-details" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
              PROGRAM REQUISITES
            </InputLabel>
            <Grid container direction={'row'} xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormLabel id="demo-form-control-label-placement" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
                    Intakes
                  </FormLabel>
                  <FormControl>
                    <Controller
                      name={'intake_months'}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Please select intakes"
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          notched={false}
                          value={intakeMonths}
                          sx={{ height: '40px', width: '32rem' }}
                          onChange={(e) => {
                            handleChange(e?.target?.value);
                            field?.onChange(e?.target?.value);
                          }}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected: any) => selected.join(', ')}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 48 * 4.5 + 8,
                                width: 250
                              }
                            }
                          }}
                        >
                          {intakeOptions?.map((name: any) =>
                            name?.isTitle ? (
                              <ListSubheader>{name?.label}</ListSubheader>
                            ) : (
                              <MenuItem key={name?.value} value={name?.value}>
                                <Checkbox checked={intakeMonths.indexOf(name?.value) > -1} />
                                <ListItemText primary={name?.label} />
                              </MenuItem>
                            )
                          )}
                        </Select>
                      )}
                    />
                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.intake_months?.message}</FormHelperText>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormLabel id="demo-form-control-label-placement" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
                    Minimum Level of Education
                  </FormLabel>
                  <FormControl>
                    <Controller
                      name={'minimum_education_level'}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field?.value}
                          notched={false}
                          placeholder="Level of graduation"
                          sx={{ height: '40px', width: '32rem' }}
                          id={'minimum_education_level'}
                        >
                          {programLevels?.map((item: any, index: any) =>
                            item?.isTitle ? (
                              <ListSubheader>{item?.label}</ListSubheader>
                            ) : (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            )
                          )}
                        </Select>
                        // <OutlinedInput {...field} required sx={{ height: '40px', width: '32rem' }} placeholder={'Level of graduation'} />
                      )}
                    />
                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
                      {errors && errors?.minimum_education_level?.message}
                    </FormHelperText>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormLabel id="demo-form-control-label-placement" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
                    Minimum Grading
                  </FormLabel>
                  <FormControl>
                    <Controller
                      name={'minimum_grading'}
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput {...field} required sx={{ height: '40px', width: '32rem' }} placeholder={'Minimum Grading'} />
                      )}
                    />
                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.minimum_grading?.message}</FormHelperText>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormLabel id="demo-form-control-label-placement" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
                    Minimum Language Score
                  </FormLabel>
                  <FormControl>
                    <NestedSelect
                      selectedScores={selectedScores}
                      setSelectedScores={setSelectedScores}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      initialValue={initialValue}
                      setError={setError}
                    />
                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{error && 'Please select minimum language score '}</FormHelperText>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormLabel id="demo-form-control-label-placement" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
                    Remarks
                  </FormLabel>
                  <FormControl>
                    <Controller
                      name={'remarks'}
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput {...field} required sx={{ height: '40px', width: '32rem' }} placeholder={'Remarks'} />
                      )}
                    />
                    <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.remarks?.message}</FormHelperText>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack>
              <FormControl>
                <FormLabel id="demo-form-control-label-placement" sx={{ color: '#394663', fontWeight: '500', mb: 1 }}>
                  Program Status
                </FormLabel>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row aria-labelledby="demo-form-control-label-placement" name="is_active" defaultValue={true}>
                      <FormControlLabel sx={{ pl: 0.2 }} value={true} control={<Radio />} label="Active" labelPlacement="end" />
                      <FormControlLabel value={false} control={<Radio />} label="Inactive" labelPlacement="end" />
                    </RadioGroup>
                  )}
                />

                <FormHelperText sx={{ color: 'red', marginTop: 2 }}>{errors && errors?.is_active?.message}</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>

          {/* <Stack spacing={0} direction={'row'} px={0} alignItems={'center'}>
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

export default AddProgram;
