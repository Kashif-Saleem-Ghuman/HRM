export const isRequired = (value) => (value ? true : "This field is required.");

export const isEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(value) || "Invalid email format.";
};

export const isPhoneNumber = (value) => {
  // This assumes the format xxx-xxx-xxxx or (xxx) xxx-xxxx.
  const phonePattern = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/;
  return phonePattern.test(value) || "Invalid phone number format.";
};

//"K1A 0B1" trrue
//"K1A0B1" true
//"K1A-0B1" true
export function isValidCanadianPostalCode(postalCode) {
  const regex = /^[A-Z][0-9][A-Z][- ]?[0-9][A-Z][0-9]$/;
  return regex.test(postalCode) || "Invalid canadian postal code.";
}

export function isValidUSZIP(zip) {
  const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return regex.test(zip) || "Invalid US zip code.";
}


export function isValidSSN(ssn) {
  const regex = /^(?!000|666|9\d\d)\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
  return regex.test(ssn) || "Invalid US SSN";
}

export function isValidSIN(sin) {
  const regex = /^(\d{9}|\d{3}-\d{3}-\d{3})$/;
  return regex.test(sin) || "Invalid social security number"
}