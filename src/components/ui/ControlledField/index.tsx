import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputLabel, Stack, TextField, TextFieldProps } from "@mui/material";

interface ControlledFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  label: React.ReactNode;
  errors: Record<string, { message?: string }>;
}

function ControlledField<T extends FieldValues>({
  name,
  control,
  label,
  errors,
  ...textFieldProps
}: ControlledFieldProps<T>) {
  return (
    <Stack spacing={1}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...textFieldProps}
            id={name}
            size="small"
            error={!!errors[name]}
            helperText={errors[name]?.message}
            fullWidth
            // onBlur={(e) => {
            //     field.onBlur();
            //     trigger(name);
            //   }}
          />
        )}
      />
    </Stack>
  );
}

export default ControlledField;
