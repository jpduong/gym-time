import { Box, TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import { startCase } from "lodash";

export const CustomTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const formattedLabel = startCase(props.name);

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
