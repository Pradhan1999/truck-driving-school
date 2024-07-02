import MainCard from 'components/MainCard';
import { Button, Checkbox, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import ThemeButton from 'components/ui/Button';

const FilterCard = () => {
  return (
    <MainCard title="Program Filters">
      <Grid xs={12}>
        <Dropdown label="Program Levels" name="program-levels" options={[]} />
        <Dropdown label="Intakes" name="intakes" options={[]} />
        <Dropdown label="Program Status" name="program-status" options={[]} />
        <Dropdown label="Post Secondary Discipline" name="post-secondary-discipline" options={[]} />
        <Dropdown label="Post Secondary Sub-Categories" name="post-secondary-subcategories" options={[]} />
        <Stack direction="row" spacing={2} mt={1}>
          <Input label="Tuition Fee" />
          <Input label="Application Fee" />
        </Stack>
        <Stack spacing={0} direction={'row'} px={0} mt={1} alignItems={'center'}>
          <Checkbox className="size-small" sx={{ pl: 0 }} />
          <Typography variant="caption" color={'GrayText'}>
            Include living costs.
          </Typography>
        </Stack>
        <Stack spacing={1} direction={'row'} mt={3} justifyContent="flex-end">
          <ThemeButton variant="outlined" size="small">
            Cancel
          </ThemeButton>
          <ThemeButton variant="contained" size="small" onClick={() => {}}>
            Apply Filters
          </ThemeButton>
        </Stack>
      </Grid>
    </MainCard>
  );
};

export default FilterCard;
const Dropdown = ({ label, name, options }: any) => {
  return (
    <Stack spacing={1} mt={1}>
      <FormLabel sx={{ mb: 0.5, fontSize: 12 }}>{label}</FormLabel>
      <Select notched={false} sx={{ height: '35px' }} id={name} placeholder="Select">
        {options?.map((item: any, index: any) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
const Input = ({ label, placeholder }: any) => {
  return (
    <Stack spacing={1}>
      <FormLabel sx={{ mb: 0.5, fontSize: 12 }}>{label}</FormLabel>
      <OutlinedInput required sx={{ height: '35px' }} fullWidth placeholder={placeholder} />
    </Stack>
  );
};
