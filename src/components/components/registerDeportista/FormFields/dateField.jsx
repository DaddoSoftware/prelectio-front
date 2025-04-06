import React from "react";
import { Controller, useFormContext, useController, get } from "react-hook-form";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";

export const DateField = ({ ...props }) => {
  const { fieldState } = useController(props);
  const { control } = useFormContext();
  const { _formState } = control;
  const error = get(_formState.errors, props.name);
  const errorText = fieldState.invalid ? error.message : "";

  return (
    <>
      <Controller
        {...props}
        render={({ field: { ref, ...field } }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                sx={{
                  border: "1px solid white",
                  borderRadius: "5px",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                inputlabelprops={{
                  sx: {
                    color: "white",
                    borderColor: "white",
                  },
                }}
                inputProps={{
                  sx: {
                    color: "red",
                    borderColor: "white",
                  },
                }}
                inputRef={ref}
                autoComplete="off"
                fullWidth
                format="DD/MM/YYYY"
                label=""
                value={
                  field.value
                    ? moment.isMoment(field.value)
                      ? field.value
                      : moment(field.value)
                    : null
                }
                required
                size="small"
                shrink="true"
                error={error?.message ? true : false}
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </LocalizationProvider>
            {error && (
              <p className="error__message" style={{ color: "red" }}>
                {error.message}
              </p>
            )}
          </>
        )}
        rules={{ required: true }}
        variant="outlined"
        size="small"
        control={control}
        helperText={errorText ? errorText : props.helperText}
        error={!!errorText}
        defaultValue={props.defaultValue}
      />
    </>
  );
};
