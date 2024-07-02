import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput, Stack, Typography } from '@mui/material';
import { Clock } from 'assets/svg/Clock';
import { RightArrow } from 'assets/svg/RightArrow';
import { SearchIcon } from 'assets/svg/SearchIcon';
import { OpenEyeIcon } from 'assets/svg/openEye';
import MainCard from 'components/MainCard';
import { Add } from 'iconsax-react';

const listData = [
  {
    title: 'Pre Offer Letter',
    subtitle:
      'This is a Pre Offer Letter not a Final Offer Letter. This document cannot be used for Visa purposes. This document cannot be used for Visa purposes.',
    created: 'Created a month ago'
  },
  {
    title: 'Application Opened',
    subtitle: 'As you progress through the application process, you will see documents provided by EnrolHere here...',
    created: 'Created a year ago'
  }
];

const TemplatesTab = () => {
  // const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Timeline Templates</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="small"
          // onClick={() => setIsOpenDrawer(true)}
        >
          Create new template
        </Button>
      </Stack>

      {/* SEARCH */}
      <OutlinedInput
        id="start-adornment-email"
        placeholder="Search templates by name.."
        startAdornment={<SearchIcon />}
        size="small"
        fullWidth
        sx={{ fontSize: 14, my: 2 }}
      />

      {/* LIST */}
      <MainCard content={false} sx={{ mt: 2 }}>
        <List sx={{ p: 0 }}>
          {listData?.map((list) => (
            <ListItem divider>
              <ListItemText
                sx={{ maxWidth: '75%', py: 1 }}
                primary={<Typography variant="h5">{list?.title}</Typography>}
                secondary={
                  <Stack>
                    <Typography variant="caption" noWrap>
                      {list?.subtitle}
                    </Typography>
                  </Stack>
                }
              />
              <ListItemSecondaryAction>
                <Stack>
                  <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end">
                    <OpenEyeIcon />
                    <Button variant="outlined" size="small" endIcon={<RightArrow />} sx={{ fontWeight: 600, fontSize: '12px' }}>
                      Edit template
                    </Button>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5} color="#5A667B" justifyContent="flex-end">
                    <Clock />
                    <Typography variant="caption">{list?.created}</Typography>
                  </Stack>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </MainCard>
    </>
  );
};

export default TemplatesTab;
