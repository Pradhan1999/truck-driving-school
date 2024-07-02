import { Avatar, Button, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { ReplyIcon } from 'assets/svg/ReplyIcon';
import MainCard from 'components/MainCard';
import Textarea from 'components/ui/Textarea';
import { useState } from 'react';

const comments = [
  {
    name: 'UNITRAVEL',
    message: `Dear Student This is a Pre Offer Letter not a Final Offer Letter. This document cannot be used for Visa purposes. Please
    ensure you complete each step as outlined on your offer letter in order to receive your Final Offer Letter. Please ensure
    you review all details regarding refund and deferral policy to avoid any complications.`,
    initial: 'U',
    isSent: false
  },
  {
    name: 'Niraj',
    message: 'Please find below the application submission proof and the payment receipt.',
    initial: 'N',
    isSent: true
  }
];

const Comments = () => {
  const [value, setValue] = useState('all');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value?.toString() as string);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h5">Comments</Typography>
        <Select size="small" variant="outlined" value={value} onChange={handleChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="comments">Your comments</MenuItem>
        </Select>
      </Stack>

      <Stack>
        <MainCard>
          {comments?.map((comment) => (
            <Stack mb={2}>
              {/* NAME & TIME */}
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={{ xs: 'flex-start', sm: 'space-between' }} alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{comment.initial}</Avatar>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1">{comment.name}</Typography>
                    <Typography>(+919888110012)</Typography>
                  </Stack>
                </Stack>
                <Typography variant="body2" color="#6C778B">
                  19 Jan 2024, 3:00 PM
                </Typography>
              </Stack>
              {/* MESSAGE BODY */}
              <Stack direction="row" justifyContent="flex-end">
                <MainCard
                  sx={{
                    width: '93%',
                    bgcolor: comment.isSent ? 'primary.lighter' : 'primary.main',
                    color: !comment.isSent && 'secondary.100'
                  }}
                >
                  {comment.message}
                </MainCard>
              </Stack>
              {/* REPLY BUTTON */}
              <Stack direction="row" justifyContent="flex-end">
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#737D98' }} variant="subtitle2">
                  <ReplyIcon />
                  Reply
                </Typography>
              </Stack>
            </Stack>
          ))}
        </MainCard>

        {/* WRITE COMMENT */}
        <Stack direction="row" mt={3} spacing={1}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>N</Avatar>
          <Textarea minRows={3} placeholder="Write comments..." sx={{ minHeight: '100' }} />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={1}>
          <Button variant="contained" size="small" sx={{ width: '150px' }}>
            Send
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Comments;
