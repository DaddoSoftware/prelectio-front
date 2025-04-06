import React from "react";
import { TextField } from "@mui/material";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "initial",
    },
  },
});

export const TextAreaField = ({ rows = 4, ...props }) => {
  const { fieldState } = useController(props);
  const { control } = useFormContext();
  const classes = useStyles();
  const { _formState } = control;
  const error = get(_formState.errors, props.name);
  const errorText = fieldState.invalid ? error?.message : "";

  return (
    <>
      <Controller
        {...props}
        render={({ field: { ref, ...field } }) => (
          <>
            <TextField
              classes={classes}
              sx={{
                border: "1px solid white",
                borderRadius: "5px",
                "& ::placeholder": {
                  color: "white",
                },
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "white",
                },
              }}
              inputProps={{
                sx: { color: "white" },
              }}
              inputRef={ref}
              autoComplete="off"
              fullWidth
              multiline
              rows={rows}
              placeholder={props.label}
              required
              size="small"
              error={!!error?.message}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value || ""}
            />
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
