export function numberValidator(value, defaultValue = 0) {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && !isNaN(parseInt(value))) {
    return +value;
  }

  return defaultValue;
}