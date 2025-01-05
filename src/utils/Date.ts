import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const formatDate = (
  date: string,
  format = "D-MMM-YYYY hh:mm:ss A"
): string => {
  return dayjs(date).format(format);
};
