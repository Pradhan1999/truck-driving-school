import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Grid,
  List,
  ListItemText,
  OutlinedInput,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import MainCard from 'components/MainCard';
import { Add, BagCross, Filter, Folder, Icon, Location, MenuBoard, Sort } from 'iconsax-react';
import ProgramDetailCard from 'components/college/collegeDetail/ProgramDetailCard';
import FilterCard from 'components/college/collegeDetail/FilterCard';
import AddProgram from './addProgram';
import { useEffect, useState } from 'react';
import { data } from '../table/columns';
import { useLocation, useParams } from 'react-router';
import { GetAllProgram, GetSingleInstitute } from 'services/institute';
import { openSnackbar } from 'api/snackbar';
import { LocationIcon } from 'assets/svg/location';
import { ApplicationIcon } from 'assets/svg/Application';
import ThemeButton from 'components/ui/Button';
import ProgramDetailCardSkeleton from 'components/college/collegeDetail/ProgramDetailCardSkeleton';
import { Chip } from '@mui/material';
import MenuList from 'components/ui/menuList';
import { TickIcon } from 'assets/svg/Tick';
import SelectableMenu from 'components/ui/selectableMenu';
import { debounce, get } from 'lodash';

const CollegeDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [instituteDetails, setInstituteDetails] = useState<any>();
  const [programData, setProgramData] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [instituteLoading, setInstituteLoading] = useState(false);
  const [programId, setProgramId] = useState();
  const [sortOption, setSortOption] = useState('relevance');

  const typographyProps: any = {
    variant: 'h6',
    fontWeight: '600',
    fontSize: 12,
    color: 'secondary'
  };

  useEffect(() => {
    setInstituteLoading(true);
    GetSingleInstitute({ pathParams: { id } })?.then((res) => {
      setInstituteDetails(res);
      setInstituteLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (searchText === '') {
      getALLProgram();
    }
  }, [searchText]);

  const getALLProgram = () => {
    const query: any = {
      college_id: id,
      sortOrder: 'ASC'
    };
    if (searchText.length > 0) {
      query.search = searchText;
      query.searchColumn = 'program_name';
    }
    if (sortOption === 'lowToHigh') {
      query.sortColumn = 'application_fee';
      query.sortOrder = 'ASC';
    }
    if (sortOption === 'highToLow') {
      query.sortColumn = 'application_fee';
      query.sortOrder = 'DESC';
    }
    if (sortOption === 'commission') {
      query.sortColumn = 'commission';
      query.sortOrder = 'ASC';
    }
    GetAllProgram({ query })?.then((res) => {
      setLoading(false);
      setProgramData(res);
    });
  };

  useEffect(() => {
    getALLProgram();
  }, [id, sortOption]);

  // const debouncedSearch = debounce((value: string) => {
  //   setSearchText(value);
  // }, 500);

  const options = () => [
    {
      value: 'Relevance',
      id: 'relevance',
      content: () => setSortOption('relevance')
    },

    {
      value: 'Application Fee (low to high)',
      id: 'lowToHigh',
      content: () => setSortOption('lowToHigh')
    },
    {
      value: 'Application Fee (high to low)',
      id: 'highToLow',
      content: () => setSortOption('highToLow')
    },
    {
      value: 'Commission',
      id: 'commission',
      content: () => setSortOption('commission')
    }
  ];

  return (
    <>
      <Grid container xs={12} spacing={2} direction="column">
        <Grid item xs={12}>
          <MainCard>
            <Stack direction="row" justifyContent="space-between">
              {/* Left stack */}
              <Stack direction="row" alignItems="center" spacing={2}>
                {instituteLoading ? (
                  <Skeleton animation="wave" variant="circular" width={40} height={40} />
                ) : (
                  <Avatar sx={{ bgcolor: 'black', color: 'white', fontWeight: '500', textTransform: 'capitalize' }}>
                    {instituteDetails?.name?.charAt(0)}
                  </Avatar>
                )}

                <Stack>
                  <Stack>
                    {instituteLoading ? (
                      <Skeleton variant="rounded" width={160} height={25} sx={{ marginBottom: 1 }} />
                    ) : (
                      <Typography color={theme.palette.primary.main} textTransform={'capitalize'} fontWeight="500" variant="h4">
                        {instituteDetails?.name}
                      </Typography>
                    )}

                    <Box display="flex" alignItems="center" gap={0.5}>
                      <LocationIcon color={theme.palette.primary.main} />

                      {instituteLoading ? (
                        <Skeleton variant="rounded" width={80} height={10} sx={{ marginBottom: 1 }} />
                      ) : (
                        <Typography
                          variant="caption"
                          color="GrayText"
                        >{`${instituteDetails?.campus}, ${instituteDetails?.state}${instituteDetails?.country ? `, ${instituteDetails?.country}` : ''}`}</Typography>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              {/* Right stack */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  bgcolor="#F2F6FF"
                  height="30px"
                  width="30px"
                  display="flex"
                  borderRadius="50%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ApplicationIcon />
                </Box>
                <Stack>
                  <Typography color="GrayText" variant="caption">
                    Application
                  </Typography>
                  <Typography fontWeight="600" variant="caption">
                    $100 CAD
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard>
            <Stack direction="row" justifyContent="flex-start" spacing={6}>
              <List>
                <ListItemText primary="DLI Number" primaryTypographyProps={typographyProps} />
                <ListItemText primary="Institute Type" primaryTypographyProps={typographyProps} />
                <ListItemText primary="Official Website" primaryTypographyProps={typographyProps} />
              </List>
              <List>
                <ListItemText
                  primary={instituteDetails?.DLI}
                  primaryTypographyProps={{ variant: 'h6', fontSize: 12, color: 'secondary' }}
                />
                <ListItemText
                  primary={instituteDetails?.institute_type}
                  primaryTypographyProps={{ variant: 'h6', fontSize: 12, color: 'secondary', textTransform: 'capitalize' }}
                />
                <ListItemText
                  primary={
                    <a href={instituteDetails?.website} target="blank" style={{ textDecoration: 'none' }}>
                      {instituteDetails?.website?.slice(0, 40)}
                    </a>
                  }
                  primaryTypographyProps={{ variant: 'h6', fontSize: 12, color: theme.palette.primary.main }}
                />
              </List>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} mt={'6px'}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="600" color={'#394663'}>
              Programs
            </Typography>
            <ThemeButton
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add Program
            </ThemeButton>
          </Stack>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={2} sx={{ mt: '0px' }}>
        <Grid item xs={12} lg={3.5}>
          <FilterCard />
        </Grid>
        <Grid item xs={12} lg={8.5}>
          <Stack mb={2} spacing={2} gap={18} direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" width="100%">
              <OutlinedInput
                placeholder="What would you like to study?"
                value={searchText}
                sx={{
                  height: '30px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  bgcolor: 'white'
                }}
                fullWidth
                onChange={(e) => setSearchText(e?.target?.value)}
              />
              <ThemeButton
                variant="contained"
                onClick={() => getALLProgram()}
                size="small"
                buttonStyle={{ height: '30px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', px: 3 }}
              >
                Search
              </ThemeButton>
              {searchText?.length > 0 ? (
                <ThemeButton
                  variant="outlined"
                  onClick={() => {
                    setSearchText('');
                  }}
                  size="small"
                  buttonStyle={{ height: '30px', px: 3, ml: 1 }}
                >
                  Clear
                </ThemeButton>
              ) : null}
            </Stack>
            <SelectableMenu
              option={options()}
              isChecked={sortOption}
              width={'200px'}
              label={
                <ThemeButton variant="outlined" size="small" startIcon={<Filter />}>
                  Sort
                </ThemeButton>
              }
            />
          </Stack>
          <Stack spacing={2}>
            {loading ? (
              Array.from({ length: 3 }, () => <ProgramDetailCardSkeleton />)
            ) : programData?.rows?.length ? (
              programData?.rows?.map((val: any) => (
                <ProgramDetailCard
                  item={val}
                  instituteDetails={instituteDetails}
                  getAllPrograms={getALLProgram}
                  setEditModal={setIsModalOpen}
                  programId={programId}
                  setProgramId={setProgramId}
                />
              ))
            ) : (
              <Stack direction={'row'} justifyContent={'center'} pt={20}>
                <Chip label={'No Program Found'} variant="light" color="warning" />
              </Stack>
            )}
          </Stack>
        </Grid>
        <AddProgram
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          getALLProgram={getALLProgram}
          programId={programId}
          setProgramId={setProgramId}
        />
      </Grid>
    </>
  );
};

export default CollegeDetail;
