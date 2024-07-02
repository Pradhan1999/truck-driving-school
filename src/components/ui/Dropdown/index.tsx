import { FormControl, FormHelperText, FormLabel, InputLabel, ListSubheader, MenuItem, Select, Stack } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface DropdownProps {
  id?: string;
  label: React.ReactNode;
  name: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options: Array<Object>;
  showSearch?: boolean;
  control?: Control<FieldValues>;
  error?: { [key: string]: any };
  labelStyle?: any;
}

const Dropdown = ({ control, name, onChange, error, ...props }: DropdownProps) => {
  const [firstKey, secondKey] = name?.split('.');
  return (
    <Stack spacing={1}>
      <FormControl>
        <FormLabel sx={{ color: '#5A667B', mb: 0.5, fontWeight: 600, ...props.labelStyle }}>{props.label}</FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={field?.value}
              notched={false}
              sx={{ height: '40px' }}
              id={name}
              {...props}
              onChange={(e) => {
                field.onChange(e?.target?.value);
                onChange && onChange(e?.target?.value);
              }}
            >
              {props.options?.map((item: any, index: any) =>
                item?.isTitle ? (
                  <ListSubheader>{item?.label}</ListSubheader>
                ) : (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              )}
            </Select>
          )}
        />
        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
          {error && name && name.includes('.') ? error?.[firstKey]?.[secondKey]?.message : error?.[firstKey]?.message}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default Dropdown;
