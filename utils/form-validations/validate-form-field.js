export const validateFormField = (value, rules, form) => {
  for (const rule of rules) {
    const result = rule(value, form);
    if (result !== true) {
      return result;
    }
  }
  return true;
};
