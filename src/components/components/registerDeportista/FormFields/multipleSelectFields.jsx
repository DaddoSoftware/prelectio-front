import React from "react";
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useFormContext, useController, get } from "react-hook-form";

export const MultipleSelectField = ({
  name,
  label,
  placeholder,
  options,
  required = true,
  defaultValue = [],
}) => {
  const { control } = useFormContext();
  const { fieldState } = useController({ name, control });
  const error = get(control._formState.errors, name);
  const errorText = fieldState.invalid ? error?.message : "";

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required }}
      render={({ field }) => (
        <>
          <Select
            multiple
            fullWidth
            size="small"
            value={Array.isArray(field.value) ? field.value : []}
            onChange={(e) => field.onChange(e.target.value)}
            inputRef={field.ref}
            displayEmpty
            error={!!errorText}
            sx={{
              border: "1px solid white",
              borderRadius: "5px",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              color: "white",
            }}
            renderValue={(selected) => {
              if (!Array.isArray(selected) || selected.length === 0) {
                return <em style={{ color: "gray" }}>{placeholder}</em>;
              }

              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return (
                      <Chip
                        key={value}
                        label={option?.label || value}
                        style={{ color: "white", backgroundColor: "#484848" }}
                      />
                    );
                  })}
                </Box>
              );
            }}
          >
            {options.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <Checkbox checked={field.value?.includes(item.value)} />
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
          {errorText && <p style={{ color: "red", marginTop: 4 }}>{errorText}</p>}
        </>
      )}
    />
  );
};
