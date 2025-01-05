// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => {
  return !isNaN(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (value: any): boolean => {
  return typeof value === "string";
};

export const formatToCurrency = (value: number | string): string => {
  value = isString(value) ? parseFloat(value as string) : value;
  if (isNumber(value)) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return "";
};

export const padLeft = (value: number, length = 4, char = "0"): string => {
  return value.toString().padStart(length, char);
};
