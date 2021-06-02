import { Box, TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import { startCase } from "lodash";

export const CustomTextField = (props: FieldAttributes<{}>) => {
  const { placeholder, type = "text", ...otherProps } = props;
  const [field, meta] = useField<{}>(otherProps);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const formattedLabel = startCase(otherProps.name);

  return (
    <Box mb={2}>
      <Box mb={1}>
        <label>{formattedLabel}</label>
      </Box>
      <TextField
        title="component-custom-textfield"
        placeholder={placeholder}
        type={type}
        helperText={errorText}
        error={!!errorText}
        {...field}
      />
    </Box>
  );
};
