import { FormControl, FormHelperText, TextField, Select, MenuItem, FormLabel, Stack, OutlinedInput } from '@mui/material';
import { split } from 'lodash';
import { Controller } from 'react-hook-form';

interface InputProps {
  id?: string;
  label?: string;
  value?: any;
  name: any;
  onChange?: () => void;
  placeholder?: string;
  control: any;
  error?: { [key: string]: any };
  startAdornment?: any;
  labelStyle?: any;
}

const Input = ({ id, name, error, startAdornment, labelStyle, ...props }: InputProps) => {
  const [firstKey, secondKey] = name?.split('.');

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 0.5, color: '#5A667B', fontWeight: 600, ...labelStyle }}>{props?.label}</FormLabel>
        <Controller
          name={name}
          control={props?.control}
          render={({ field }) => (
            <OutlinedInput
              notched={false}
              {...field}
              required
              sx={{ height: '40px' }}
              fullWidth
              placeholder={props.placeholder}
              {...props}
            />
          )}
        />
        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
          {error && name && name.includes('.') ? error?.[firstKey]?.[secondKey]?.message : error?.[firstKey]?.message}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default Input;
