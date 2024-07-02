import { Grid, Stack, Typography, Skeleton, Box } from '@mui/material';

const ProgramDetailCardSkeleton = () => {
  return (
    <Grid xs={12}>
      <Stack>
        <Box component="div" sx={{ borderRadius: '10px', bgcolor: 'white' }}>
          <Box component="div" sx={{ bgcolor: '#F9FAFF', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', p: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack direction={'column'}>
                <Typography variant="h6" fontWeight="500">
                  <Skeleton variant="text" width={100} />
                </Typography>
                <Typography variant="h5">
                  <Skeleton variant="text" width={200} />
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography>
                  <Skeleton variant="rectangular" width={50} height={25} sx={{ borderRadius: '10px' }} />
                </Typography>
                <Box sx={{ cursor: 'pointer' }}>
                  <Skeleton variant="text" width={32} height={32} />
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            <Stack direction="row" alignItems="center" spacing={6}>
              <Typography fontWeight="500" variant="h6">
                <Skeleton variant="text" width={200} />
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" color="GrayText">
                  <Skeleton variant="text" width={200} />
                </Typography>
              </Box>
            </Stack>
            <Stack pt={2} pb={1} direction="row" justifyContent="space-between">
              <FeeSectionSkeleton />
              <FeeSectionSkeleton />
              <FeeSectionSkeleton />
              <Skeleton variant="rounded" width={50} height={25} />
            </Stack>
            <Skeleton variant="rounded" width={150} height={15} />
          </Box>
        </Box>
      </Stack>
    </Grid>
  );
};

const FeeSectionSkeleton = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box bgcolor="#F2F6FF" height="30px" width="30px" borderRadius="50%">
        <Skeleton variant="rectangular" width={20} height={20} />
      </Box>
      <Stack>
        <Typography variant="caption">
          <Skeleton variant="text" width={80} />
        </Typography>
        <Typography fontWeight="600" variant="caption">
          <Skeleton variant="text" width={60} />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProgramDetailCardSkeleton;
