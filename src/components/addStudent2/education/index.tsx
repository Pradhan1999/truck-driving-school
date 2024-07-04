import { Grid, Stack, Button } from '@mui/material';
import Input from 'components/ui/Input';
import Dropdown from 'components/ui/Dropdown';

import MainCard from 'components/MainCard';
import Date from 'components/ui/Date';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UpdateTestScore, addTestScore, getSingleTestScore } from 'services/student';
import LoadingButton from 'components/@extended/LoadingButton';
import { useParams } from 'react-router';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { InfoCircle } from 'iconsax-react';
import { rest } from 'lodash';

const EducationProficiency = ({ studentId }: any) => {
  const [examType, setExamType] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdateId] = useState();
  const { student_id } = useParams();
  const examList = [
    {
      label: 'PTE',
      value: 'PTE'
    },

    {
      label: 'ILETS',
      value: 'ILETS'
    },

    {
      label: 'TOEFL',
      value: 'TOEFL'
    },

    {
      label: 'Duolingo English Test',
      value: 'DUOLINGO'
    }
  ];

  const getValidationSchema = (examType: any) => {
    switch (examType) {
      case 'PTE':
        return z.object({
          exam_type: z.string(),
          exam_date: z.string(),
          listening: z.string().refine((value: any) => value >= 10 && value <= 90, {
            message: 'Please enter valid score in range (10-90)'
          }),
          reading: z.string(),
          writing: z.string(),
          speaking: z.string(),
          overall_score: z.string().refine((value: any) => value >= 10 && value <= 160, {
            message: 'Please enter valid score in range (10-160)'
          })
        });
      case 'ILETS':
        return z.object({
          listening: z.string().refine((value: any) => value >= 0 && value <= 30, {
            message: 'Please enter valid score in range (0-30)'
          }),
          reading: z.string().refine((value: any) => value >= 1 && value <= 9, {
            message: 'Please enter valid score in range (1-9)'
          }),
          writing: z.string(),
          speaking: z.string()
        });
      case 'TOEFL':
        return z.object({
          exam_type: z.string(),
          exam_date: z.string(),
          overall_score: z.string().refine((value: any) => value >= 10 && value <= 160, {
            message: 'Please enter valid score in range (10-160)'
          })
        });
      case 'DUOLINGO':
        return z.object({
          exam_type: z.string(),
          exam_date: z.string(),
          overall_score: z.string().refine((value: any) => value >= 10 && value <= 160, {
            message: 'Please enter valid score in range (10-160)'
          })
        });
      default:
        return z.object({
          exam_type: z.string(),
          exam_date: z.string()
        });
    }
  };

  const defaultValues: any = {
    exam_type: [{}]
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(getValidationSchema(examType))
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    if (updateId) {
      UpdateTestScore({
        body: { ...data },
        pathParams: {
          id: updateId
        }
      })
        ?.then((res) => {
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
    } else {
      addTestScore({
        body: { ...data },
        pathParams: {
          student_id
        }
      })
        ?.then((res) => {
          setLoading(false);
          setUpdateId(res?.id);
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
    getSingleTestScore({ pathParams: { student_id } })?.then((res) => {
      setUpdateId(res?.id);
      console.log('res', res);
      setExamType(res?.exam_type);
      Object.keys(res).map((key: any) => {
        setValue(key, res[key]);
      });
      setValue('exam_type', res?.exam_type);
    });
  }, [student_id, updateId]);

  return (
    <MainCard content={false} title="Education Proficiency" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack maxWidth="md" padding={3}>
          <Grid container>
            <Grid container direction={'row'} xs={12} spacing={2}>
              <Grid item xs={6}>
                <Dropdown
                  labelStyle={{ fontWeight: '600' }}
                  label="Exam Type"
                  id="examType"
                  name="exam_type"
                  options={examList}
                  control={control}
                  error={errors}
                  onChange={(value) => {
                    setExamType(value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Date label={'Exam Date'} labelStyle={{ fontWeight: '600' }} name="exam_date" control={control} error={errors} />
              </Grid>
            </Grid>

            {examType && (
              <Grid container direction={'row'} xs={24} spacing={2}>
                {!['DUOLINGO']?.includes(examType) && (
                  <>
                    <Grid item xs={3}>
                      <Input labelStyle={{ fontWeight: '600' }} error={errors} name="listening" control={control} label="Listening" />
                    </Grid>
                    <Grid item xs={3}>
                      <Input labelStyle={{ fontWeight: '600' }} error={errors} name="reading" control={control} label="Reading" />
                    </Grid>

                    <Grid item xs={3}>
                      <Input labelStyle={{ fontWeight: '600' }} error={errors} name="writing" control={control} label="Writing" />
                    </Grid>

                    <Grid item xs={3}>
                      <Input labelStyle={{ fontWeight: '600' }} error={errors} name="speaking" control={control} label="Speaking" />
                    </Grid>
                  </>
                )}

                {!['ILETS', 'TOEFL']?.includes(examType) && (
                  <Grid item xs={3} marginTop={2}>
                    <Input labelStyle={{ fontWeight: '600' }} error={errors} name="overall_score" control={control} label="Over All" />
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
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
      </form>
    </MainCard>
  );
};

export default EducationProficiency;
