import { Avatar, Box, Button, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { ArrowRight, DollarCircle, Edit, Edit2, Folder, Folder2, FolderCloud, PercentageCircle } from 'iconsax-react';
import Location from 'assets/images/common/location.svg';
import { MenuIcon } from 'assets/svg/menu';
import { useState } from 'react';
import AnimateButton from 'components/@extended/AnimateButton';
import Modal from 'components/ui/Modal';
import { updateProgram } from 'services/institute';
import { border, fontWeight } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { openSnackbar } from 'api/snackbar';
import { EditIcon } from 'assets/svg/edit';
import { LocationIcon } from 'assets/svg/location';
import { ApplicationTwoIcon } from 'assets/svg/Application2';
import { TuitionIcon } from 'assets/svg/tuition';
import ThemeButton from 'components/ui/Button';

const ProgramDetailCard = ({ item, instituteDetails, setProgramId, getAllPrograms, setEditModal }: any) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = () => {
    setIsLoading(true);
    updateProgram({
      pathParams: { id: isModalOpen },
      body: {
        is_active: !item?.is_active
      }
    })
      ?.then((res: any) => {
        setIsModalOpen('');
        getAllPrograms();
        openSnackbar({
          open: true,
          message: 'Status updated!',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        } as any);
      })
      ?.catch((err) => {})
      ?.finally(() => setIsLoading(false));
  };
  return (
    <Grid xs={12}>
      <Stack>
        <Box component="div" sx={{ borderRadius: '10px', bgcolor: 'white' }}>
          <Box component="div" sx={{ bgcolor: '#F9FAFF', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', p: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack direction={'column'}>
                <Typography variant="h6" fontWeight="500">
                  {item?.type}
                </Typography>
                <Typography variant="h5" style={{ textTransform: 'capitalize' }}>
                  {item?.program_name}
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography onClick={() => setIsModalOpen(item?.id)} sx={{ cursor: 'pointer' }}>
                  <Chip size="small" color={item?.is_active ? 'success' : 'default'} label={item?.is_active ? 'Active' : 'Inactive'} />
                </Typography>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setProgramId(item?.id);
                    setEditModal(true);
                  }}
                >
                  <EditIcon color={theme.palette.primary.main} />
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            <Stack direction="row" alignItems="center" spacing={6}>
              <Typography color={theme.palette.primary.main} fontWeight="500" variant="h6">
                {instituteDetails?.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <LocationIcon />

                <Typography variant="caption" color="GrayText">
                  {`${instituteDetails?.campus}, ${instituteDetails?.state}, ${instituteDetails?.country} `}
                </Typography>
              </Box>
            </Stack>
            <Stack pt={2} pb={1} direction="row" justifyContent="space-between">
              <FeeSection title="Tuition" icon={<TuitionIcon />} fee={item?.tuition_fee} />
              <FeeSection title="Application" icon={<ApplicationTwoIcon />} fee={item?.application_fee} />
              <FeeSection title="Commission" icon={<PercentageCircle size={16} />} fee={item?.commission} />
              <ThemeButton variant="text" size="small" endIcon={<ArrowRight />} buttonStyle={{ bgcolor: '#EBF1FD', fontWeight: '500' }}>
                Enrol
              </ThemeButton>
            </Stack>
            <ThemeButton endIcon={<ArrowRight />} buttonStyle={{ fontSize: 12, fontWeight: '600', pt: 1 }}>
              Program Details
            </ThemeButton>
          </Box>
        </Box>
      </Stack>
      <Modal
        open={isModalOpen !== ''}
        maxWidth="xs"
        titleVariant="h6"
        title={`Are you sure you want to change status to ${item?.is_active ? 'inactive' : 'active'}?`}
        sx={{
          '& .MuiDialog-paper': { p: 0, minWidth: { xl: 300, sm: 'calc(100% - 80%)' } },
          '& .MuiBackdrop-root': { opacity: '0.5 !important' }
        }}
      >
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
            <AnimateButton>
              <Button size="small" type="submit" variant="outlined" color="primary" onClick={() => setIsModalOpen('')}>
                Cancel
              </Button>
            </AnimateButton>
            <AnimateButton>
              <LoadingButton
                loading={isLoading}
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleUpdateStatus}
              >
                Confirm
              </LoadingButton>
            </AnimateButton>
          </Stack>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default ProgramDetailCard;

const FeeSection = ({ icon, title, fee }: any) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box bgcolor="#F2F6FF" height="30px" width="30px" display="flex" borderRadius="50%" alignItems="center" justifyContent="center">
        {icon}
      </Box>
      <Stack>
        <Typography color="GrayText" variant="caption">
          {title}
        </Typography>
        <Typography fontWeight="600" variant="caption">
          ${fee} CAD
        </Typography>
      </Stack>
    </Stack>
  );
};
