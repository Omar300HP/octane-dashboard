import { describe, it, expect, vi } from "vitest";
import { handleHttpError } from "./handleHttpError";
import { toast } from "@/hooks";

vi.mock("@/hooks", () => ({
  toast: vi.fn(),
}));

describe("handleHttpError", () => {
  it('should not show network error toast when error message is "Network Error"', () => {
    const error = {
      message: "Network Error",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    handleHttpError(error);

    expect(toast).toHaveBeenCalledTimes(0);
  });

  it("should show unauthorized toast for 401 status", () => {
    const error = {
      response: { status: 401 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    handleHttpError(error);

    expect(toast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Unauthorized",
      description: "You do not have permission to perform this action",
      duration: 3000,
    });
  });

  it("should show unauthorized toast for 403 status", () => {
    const error = {
      response: { status: 403 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    handleHttpError(error);

    expect(toast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Unauthorized",
      description: "You do not have permission to perform this action",
      duration: 3000,
    });
  });

  it("should show error toast for 500+ status codes with custom message", () => {
    const error = {
      response: {
        status: 500,
        data: { message: "Internal server error" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    handleHttpError(error);

    expect(toast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Something went wrong! Please try again later",
      description: "Internal server error",
      duration: 3000,
    });
  });
});
