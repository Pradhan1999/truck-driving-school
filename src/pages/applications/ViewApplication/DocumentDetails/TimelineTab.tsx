import { Timeline, TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { OutlinedAddIcon } from 'assets/svg/OutlinedAddIcon';
import { SystemUiconsDocument } from 'assets/svg/file';
import { TimelineDotIcon } from 'assets/svg/TimelineDotIcon';
import MainCard from 'components/MainCard';
import Drawer from 'components/ui/Drawer';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
import { Add } from 'iconsax-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadIcon } from 'assets/svg/UploadIcon';
import Switch from 'components/ui/Switch';

interface IFormProps {}

const TimelineTab = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // resolver: zodResolver(schema)
  });

  const onSubmit = (data: IFormProps) => {
    console.log(data);
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Student Records</Typography>
        <Button variant="contained" startIcon={<Add />} size="small" onClick={() => setIsOpenDrawer(true)}>
          Create new template
        </Button>
      </Stack>

      <Timeline
        position="right"
        sx={{
          '& .MuiTimelineItem-root': { minHeight: 90 },
          '& .MuiTimelineOppositeContent-root': { mt: 0.5 },
          '& .MuiTimelineDot-root': {
            borderRadius: 1.25,
            boxShadow: 'none',
            margin: 0,
            ml: 1.25,
            mr: 1.25,
            p: 1,
            '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
          },
          '& .MuiTimelineContent-root': { borderRadius: 1, bgcolor: 'secondary.lighter', height: '100%' },
          '& .MuiTimelineConnector-root': { border: '2px solid', borderColor: 'primary.700', bgcolor: 'transparent' }
        }}
      >
        <TimelineItem>
          {/* LEFT CONTENT */}
          <TimelineOppositeContent
            align="right"
            variant="subtitle1"
            sx={{
              p: 0,
              m: 0,
              flex: 0,
              minWidth: 150,
              mr: 1
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Stack sx={{ bgcolor: `primary.main`, borderRadius: '50%', p: 0.5 }}>
                <SystemUiconsDocument fontSize={21} color="#fff" />
              </Stack>
              15 March, 2023
            </Stack>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineDotIcon />
            <TimelineConnector />
          </TimelineSeparator>

          {/* RIGHT CONTENT */}
          <TimelineContent sx={{ p: 0, m: 0, ml: 2, mb: 3 }}>
            <MainCard content={false} sx={{ p: 2 }}>
              <Typography variant="h5" color={`primary.700`} mb={1}>
                Pre-Offer Letter
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#939AAD' }}>
                This is a Pre Offer Letter not a Final Offer Letter. This document cannot be used for Visa purposes. Please ensure you
                complete each step as outlined on your offer letter in order to receive your Final Offer Letter. Please ensure you review
                all details regarding refund and deferral policy to avoid any complications.
              </Typography>
            </MainCard>
          </TimelineContent>
        </TimelineItem>

        {/* 2 */}
        <TimelineItem>
          {/* LEFT CONTENT */}
          <TimelineOppositeContent variant="subtitle1" sx={{ p: 0, m: 0, flex: 0, minWidth: 150, mr: 1 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Stack sx={{ bgcolor: `primary.main`, borderRadius: '50%', p: 0.5 }}>
                <SystemUiconsDocument fontSize={21} color="#fff" />
              </Stack>
              15 March, 2023
            </Stack>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineDotIcon />
            <TimelineConnector />
          </TimelineSeparator>

          {/* RIGHT CONTENT */}
          <TimelineContent sx={{ p: 0, m: 0, ml: 2 }}>
            <Typography variant="h5" sx={{ color: `primary.700`, bgcolor: '#fff' }}>
              Congratulations, Tanjeet Singh has received an acceptance
            </Typography>
          </TimelineContent>
        </TimelineItem>

        {/* add icon */}
        <TimelineItem>
          {/* LEFT CONTENT */}
          <TimelineOppositeContent variant="subtitle1" sx={{ p: 0, m: 0, flex: 0, minWidth: 150, mr: 1 }} />

          <TimelineSeparator sx={{ mt: 1, ml: -0.3 }}>
            <OutlinedAddIcon />
          </TimelineSeparator>

          {/* RIGHT CONTENT */}
          <TimelineContent sx={{ p: 0, m: 0, ml: 1.5, mt: 1.1 }}>
            <Typography variant="subtitle2" sx={{ bgcolor: '#fff' }}>
              Add new entry
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      {/* Create template form */}
      <Drawer title="Create new template" onClose={() => setIsOpenDrawer(false)} isOpen={isOpenDrawer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={3} sx={{ height: '83vh', overflowY: 'scroll' }}>
            {/* TEMPLATE NAME */}
            <Typography variant="subtitle1">Template name</Typography>
            <Input id="templateName" name="templateName" control={control} placeholder="Example : Pre-Offer Letter..." error={errors} />

            {/* DESCRIPTION */}
            <Input id="description" name="description" control={control} placeholder="Describe your template (optional)" />

            {/* SUBJECT */}
            <Typography variant="subtitle1">Subject</Typography>
            <Input id="subject" name="subject" control={control} placeholder="Add subject / title" />

            {/* BODY */}
            <Typography variant="subtitle1">Body</Typography>
            <Textarea minRows={3} />

            <Stack direction="row" justifyContent="space-between" alignItems="end" mt={2}>
              <div>
                {/* UPLOAD */}
                <Typography variant="subtitle1">Upload Document</Typography>
                <Button variant="outlined" endIcon={<UploadIcon />} sx={{ mt: 1, textTransform: 'none', bgcolor: '#EBF1FD' }}>
                  Upload
                </Button>
              </div>

              <div>
                {/* MAKE PUBLIC */}
                <Typography variant="subtitle1">Make public</Typography>
                <Switch control={control} name="makePublic" />
              </div>
            </Stack>

            {/* ACTION */}
            <Stack sx={{ position: 'absolute', bottom: 15, right: 15 }}>
              <Button variant="contained" size="small" type="submit">
                Create Template
              </Button>
            </Stack>
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default TimelineTab;
