import isUrl from "is-url-superb";

export const isRequired = (value) => (value ? true : "This field is required.");

export const isEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(value) || "Invalid email format.";
};

export const isPhoneNumber = (value) => {
  const phonePattern = /^[+\d\s\-().]+$/;
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
  return regex.test(sin) || "Invalid social security number";
}

export function validatePostalCode(value, form = {}) {
  const country = form.country ?? form.address?.country;
  const isUsa = country == "United States" || country == "USA";
  const isCanada = country == "Canada";
  if (isCanada || isUsa) {
    if (isCanada) {
      return isValidCanadianPostalCode(value);
    } else if (isUsa) {
      return isValidUSZIP(value);
    }
  }

  return true;
}

export function isValidUrl(url) {
  if (isUrl(url)) return true;

  const domainRegex = /^www\.[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return domainRegex.test(url) || "Invalid URL";
}

export function validateMonthDay(value) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return regex.test(value) || "Invalid date";
}

export function validateCvvCvc(value) {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(value) || "Invalid CVV/CVC";
}
