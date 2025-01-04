import { AxiosError } from "axios";
import { toast } from "@/hooks";

type ErrorResponse = {
  message?: string;
};

const getErrorMessage = (error: AxiosError<ErrorResponse>): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (typeof error.response?.data === "string") {
    return error.response.data;
  }

  return error.message ?? "";
};

const handleHttpError = (error: AxiosError<ErrorResponse>): void => {
  const status = error?.response?.status;

  const message: string = getErrorMessage(error);

  if (error && error.message === "Network Error") {
    return;
  }

  if (error && status && [401, 403].includes(status)) {
    toast({
      variant: "destructive",
      title: "Unauthorized",
      description: "You do not have permission to perform this action",
      duration: 3000,
    });
    return;
  }

  if (error && status && status >= 500) {
    toast({
      variant: "destructive",
      title: "Something went wrong! Please try again later",
      description: message,
      duration: 3000,
    });

    return;
  }
};

export { handleHttpError };
