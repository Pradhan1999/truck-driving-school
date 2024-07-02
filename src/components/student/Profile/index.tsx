import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { ThemeMode } from 'config';
import { Camera } from 'iconsax-react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export default function ProfileTabs({ tabs }: { tabs: TabItem[] }) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>();

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <MainCard sx={{ height: 180 }}>
        <Grid container spacing={6}>
          <Grid item>
            <Stack direction="row" alignItems="center">
              <FormLabel
                htmlFor="change-avatar"
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '&:hover .MuiBox-root': { opacity: 1 },
                  cursor: 'pointer'
                }}
              >
                <Avatar alt="Avatar 1" src={avatar} sx={{ width: 90, height: 80, borderRadius: '8px' }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3
                  }}
                >
                  <Stack spacing={0.5} alignItems="center">
                    <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                    <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                  </Stack>
                </Box>
              </FormLabel>
              <TextField
                type="file"
                id="change-avatar"
                placeholder="Outlined"
                variant="outlined"
                sx={{ display: 'none' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="column" alignItems="start" gap={1}>
              <Stack direction={'row'} gap={1}>
                <Typography variant="h5">Stebin Ben </Typography>
                <Typography
                  variant="overline"
                  sx={{ borderRadius: '20px', backgroundColor: '#F2F6FF', width: 80, textAlign: 'center', padding: '1px 1px 1px 1px' }}
                >
                  128291
                </Typography>
              </Stack>

              <Stack>
                <Typography color="secondary">Full Stack Developer</Typography>
                <Typography color="secondary">Full Stack Developer</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Tabs
          value={value}
          variant="standard"
          textColor="inherit"
          onChange={handleChange}
          sx={{
            marginTop: 6,
            height: 20,
            borderRadius: '12px 12px 0 0',
            position: 'relative'
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={tab.label}
              value={index}
              sx={{
                fontSize: 14,
                padding: '0px 0  17px',
                marginLeft: 1,
                borderRadius: '4px 4px 0 0',
                backgroundColor: index === value ? '#2A50ED' : 'white',
                color: index === value ? 'white' : 'black',
                border: '1px solid #ccc',
                position: 'relative',
                fontStyle: 'normal'
              }}
            />
          ))}
        </Tabs>
      </MainCard>
      <Stack marginTop={2}>
        {tabs.map((tab, index) => (
          <div key={tab.id} hidden={value !== index}>
            {tab.content}
          </div>
        ))}
      </Stack>
    </>
  );
}
