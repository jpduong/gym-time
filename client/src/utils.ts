export const hasPasswordString = (string: string) => /password/i.test(string);

export const requiredText = (field: string) => `Please enter your ${field}`;
