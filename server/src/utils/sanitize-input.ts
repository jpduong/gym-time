export const removeDoubleSpaces = (value: string) => value.replace(/\s+/g, "");

export const removeLeadingTrailingSpaces = (value: string) =>
  value.replace(/^\s+|\s+$/g, "");
