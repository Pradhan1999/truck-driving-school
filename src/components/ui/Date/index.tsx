import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField, Select, MenuItem, FormLabel, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
const Date = ({ ...props }) => {
  const [firstKey, secondKey] = props?.name?.split('.');

  return (
    <div>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 0.5, color: '#5A667B', ...props.labelStyle }}>{props?.label}</FormLabel>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(date: any) => {
                  field.onChange(date?.toISOString());
                }}
                value={field?.value ? dayjs(field?.value) : null}
                slotProps={{ textField: { size: 'small' } }}
                className=""
              />
            </LocalizationProvider>
          )}
        />
        <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
          {props.error && props.name && props.name.includes('.')
            ? props.error?.[firstKey]?.[secondKey]?.message
            : props.error?.[firstKey]?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default Date;
