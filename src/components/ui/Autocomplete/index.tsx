import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Autocomplete, FormControl, Stack, TextField } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';
import './index.module.css';

interface AutocompleteProps {
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
  value?: any;
}

const AutocompleteInput = ({ options, onChange, value, name, error, control, ...props }: AutocompleteProps) => {
  return (
    <div>
      <Stack spacing={1}>
        <FormLabel sx={{ color: '#5A667B', fontWeight: 600, mb: 0.5, ...props.labelStyle }}>{props?.label}</FormLabel>
        <Autocomplete
          sx={{ marginTop: 0 }}
          style={{ marginTop: 5 }}
          value={value}
          clearIcon={false}
          options={options}
          id="combo-box-demo"
          renderInput={(params) => <TextField {...params} label="" name={name} />}
          onChange={(e: any, selectedOption: any) => {
            onChange && onChange(selectedOption?.value);
          }}
        />
      </Stack>
    </div>
  );
};

export default AutocompleteInput;
