export function parseToNumber(value, defaultValue = 0) {
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

export function parseToFloat(value, defaultValue = 0.00, decimalPart = 2) {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  if (typeof value === "number") {
    return value.toFixed(decimalPart);
  }

  if (typeof value === "string" && !isNaN(parseInt(value))) {
    return parseInt(value.toFixed(defaultValue));
  }

  return defaultValue;
}