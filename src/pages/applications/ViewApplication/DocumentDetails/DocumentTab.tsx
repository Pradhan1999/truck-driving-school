import { Box, Grid, Stack, Typography } from '@mui/material';
import { DownloadIcon } from 'assets/svg/DownloadIcon';
import MainCard from 'components/MainCard';
import pdfIcon from 'assets/images/icons/bxs_file-pdf.svg';
import clockIcon from 'assets/images/icons/clock.png';
import timeIcon from 'assets/images/icons/time.png';
import tickIcon from 'assets/images/icons/check.png';
import closeIcon from 'assets/images/icons/close.png';

const DocumentTab = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <Typography variant="h5" mb={2}>
            All Documents
          </Typography>
          <Grid container flexWrap="wrap" spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item>
                <MainCard
                  title={
                    <Stack alignItems="center" justifyContent="center" bgcolor="#F4F4F4" height={78}>
                      <img src={pdfIcon} alt="pdf" width={36} />
                    </Stack>
                  }
                  sx={{ height: '100%', width: 200 }}
                  headerSX={{ p: 0 }}
                  content={false}
                >
                  <Stack spacing={1} direction="row" alignItems="center" justifyContent="center" sx={{ py: 1, px: 2 }}>
                    <Typography variant="subtitle2">Third Party Authorization form.pdf</Typography>
                    <Typography variant="caption" color="text.secondary">
                      <DownloadIcon color="#2A50ED" />
                    </Typography>
                  </Stack>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" mb={2}>
            Documents Required
          </Typography>
          <MainCard content={false} sx={{ p: 2 }}>
            <Stack>
              <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={2}>
                  <img src={clockIcon} alt="time" width={28} style={{ paddingRight: 2 }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Third Party Authorization Form</Typography>
                </Grid>
                <Grid item xs={2}>
                  <DownloadIcon color="#2A50ED" />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={2}>
                  <img src={timeIcon} alt="time" width={28} style={{ paddingRight: 2 }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Grade 12</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={2}>
                  <img src={tickIcon} alt="time" width={28} style={{ paddingRight: 2 }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Bachelor Transcripts</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <img src={closeIcon} alt="time" width={28} style={{ paddingRight: 2 }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Bachelor Degree</Typography>
                </Grid>
              </Grid>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentTab;
