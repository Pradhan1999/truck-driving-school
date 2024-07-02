// @ts-nocheck
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import PersonalInformation from 'components/student/addStudent/personalInformation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import EducationHistory from 'components/student/addStudent/educationHistory';
import EmploymentHistory from 'components/student/addStudent/employementHistory';
import EducationProficiency from 'components/student/addStudent/education';
import OtherInformation from 'components/student/addStudent/otherInformation';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import MainCard from 'components/MainCard';
import { CircleWithCheck } from 'assets/svg/circle';
import { addStudent, getSingleStudent, updateStudent } from 'services/student';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { InfoCircle } from 'iconsax-react';
import { useLocation, useNavigate, useParams } from 'react-router';
import countries from './../../../utils/countries.json';
import { useTab } from '@mui/base';

const AddStudent = () => {
  interface SelectedItemType {
    status: boolean;
    gender: boolean;
  }
  const { student_id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [genderData, setGenderData] = useState({
    isActive: '',
    gender: ''
  });

  const [martialData, setMartialData] = useState({
    isActive: '',
    martial: ''
  });

  const [selectedIndex, setSelectedIndex] = useState<any>(getPathIndex(pathname));

  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    navigate(route);
  };

  function getPathIndex(pathname: string) {
    let selectedTab = 0;
    switch (pathname) {
      case `/student/${student_id}/personalInformation`:
        selectedTab = 0;
        break;

      case `/student/${student_id}/educationHistory`:
        selectedTab = 1;
        break;

      case `/student/${student_id}/employmentHistory`:
        selectedTab = 2;
        break;
      case `/student/${student_id}/educationProficiency`:
        selectedTab = 3;
        break;

      case `/student/${student_id}/otherInformation`:
        selectedTab = 4;
        break;
      case '':
      default:
        selectedTab = 0;
    }
    return selectedTab;
  }

  const schema = z.object({
    first_name: z.string().min(1, { message: 'Please enter first name' }),
    last_name: z.string().min(1, { message: 'Please enter last name' }),
    countryCitizenShip: z.string().min(1, 'Please select a countryCitizenShip.'),
    passport_number: z.string().min(1, { message: 'Please enter passport number' }),
    // country: z.string().min(1, { message: 'Please enter country' }),
    dob: z.string()?.min(1, 'Please select dob'),
    passport_exp: z.string().min(1, 'Please select passport expiry'),
    email: z.string().min(1, { message: 'Please enter email' }),
    phone: z.string().min(1, { message: 'Please enter phone ' }),
    first_language: z.string().min(1, { message: 'Please enter first language' }),
    marital_status: z.string().min(1, { message: 'Please select marital status' }),
    zip: z.string().min(1, { message: 'Please enter zip code ' }),
    address: z.string().min(1, { message: 'Please enter address' }),
    // state: z.string().min(2, { message: 'Please select state' }),
    // city: z.string().min(2, { message: 'Please select city' }),
    gender: z.string().min(1, 'Please select gender'),
    isd: z.string().min(1, 'Please enter country code')
  });

  const defaultValues: any = {};
  for (const [key] of Object.entries(schema.shape)) {
    defaultValues[key] = '';
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    // reset,
    setValue
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    const items = {
      gender: genderData?.isActive ? genderData?.gender : data?.gender,
      marital_status: martialData?.isActive ? martialData?.martial : data?.marital_status
    };

    setLoading(true);
    if (updateId) {
      updateStudent({
        body: { ...data, country: selectedCountry, ...items, state: selectedState, city: selectedCity },
        pathParams: { id: student_id }
      })
        ?.then((res) => {
          navigate(`/student/${res?.student?.id}`);
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
      addStudent({ body: { ...data, country: selectedCountry, ...items, state: selectedState, city: selectedCity } })
        ?.then((res) => {
          setUpdateId(res?.student?.id);
          navigate(`/student/${res?.student?.id}/personalInformation`);
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

  // const handleListItemClick = (index: number) => {
  //   setSelectedIndex(index);
  // };

  useEffect(() => {
    if (student_id)
      getSingleStudent({
        pathParams: {
          student_id
        }
      })?.then((res) => {
        setUpdateId(res?.id);
        Object.keys(res).map((key) => {
          setValue(key, res[key]);
        });

        if (!['single', 'married', 'unMarried']?.includes(res?.marital_status)) {
          setValue('marital_status', 'Others');
          setMartialData({ martial: res?.marital_status, isActive: true });
        }

        if (!['male', 'female']?.includes(res?.gender)) {
          setValue('gender', 'Other');
          setGenderData({ gender: res?.gender, isActive: true });
        }

        handleFilterStates(res?.country);
        handleFilterCities(res?.state);
        setSelectedCity(res?.city);
        setSelectedCountry(res?.country);
        setSelectedState(res?.state);
      });
  }, [student_id]);

  const countriesData = countries?.map((val: any) => {
    return {
      label: val?.name,
      value: val?.name
    };
  });
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

  return (
    <div>
      <Grid container spacing={3} px={4}>
        <Grid item sm={3}>
          <MainCard>
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 10, color: 'secondary.main' } }} disablePadding={true}>
              {[
                {
                  value: 'Personal Information',
                  route: `${!student_id ? '/student/createStudent' : `/student/${student_id}/personalInformation`}`
                },
                { value: 'Education History', route: `/student/${student_id}/educationHistory` },
                { value: 'Employment History', route: `/student/${student_id}/employmentHistory` },
                { value: 'Education Proficiency', route: `/student/${student_id}/educationProficiency` },
                { value: 'Other Information', route: `/student/${student_id}/otherInformation` }
              ].map((text, index) => (
                <ListItemButton
                  disabled={!student_id && index !== 0}
                  key={index}
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index, text?.route)}
                >
                  <ListItemIcon sx={{ margin: 1 }}>
                    <CircleWithCheck color={selectedIndex === index ? '#2A50ED' : 'gray'} />
                  </ListItemIcon>
                  <ListItemText primary={text?.value} />
                </ListItemButton>
              ))}
            </List>
          </MainCard>
        </Grid>

        <Grid item sm={9}>
          {selectedIndex === 0 && (
            <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
              <PersonalInformation
                control={control}
                errors={errors}
                loading={loading}
                handleFilterCities={handleFilterCities}
                handleFilterStates={handleFilterStates}
                selectedCity={selectedCity}
                cities={cities}
                selectedCountry={selectedCountry}
                states={states}
                countriesData={countriesData}
                selectedState={selectedState}
                setSelectedCity={setSelectedCity}
                genderData={genderData}
                setGenderData={setGenderData}
                martialData={martialData}
                setMartialData={setMartialData}
              />
            </form>
          )}
          {selectedIndex === 1 && <EducationHistory />}
          {selectedIndex === 2 && <EmploymentHistory />}
          {selectedIndex === 3 && <EducationProficiency />}
          {selectedIndex === 4 && <OtherInformation />}
        </Grid>
      </Grid>
    </div>
  );
};

export default AddStudent;
