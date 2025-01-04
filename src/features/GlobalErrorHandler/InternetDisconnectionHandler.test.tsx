import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { InternetDisconnectionHandler } from "./InternetDisconnectionHandler";
import { useNetworkStatus, useToast } from "@/hooks";

vi.mock("@/hooks", () => ({
  useNetworkStatus: vi.fn(),
  useToast: vi.fn(),
}));

describe("InternetDisconnectionHandler", () => {
  const mockToast = vi.fn().mockReturnValue({ id: "test-toast-id" });
  const mockDismiss = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as Mock).mockReturnValue({
      toast: mockToast,
      dismiss: mockDismiss,
    });
  });

  it("should show toast when offline", () => {
    (useNetworkStatus as Mock).mockReturnValue(false);

    render(<InternetDisconnectionHandler />);

    expect(mockToast).toHaveBeenCalledWith({
      title: "No Internet Connection",
      description: "Please check your internet connection",
    });
  });

  it("should dismiss toast when back online", () => {
    (useNetworkStatus as Mock).mockReturnValue(true);

    render(<InternetDisconnectionHandler />);

    expect(mockDismiss).not.toHaveBeenCalled();
  });

  it("should dismiss existing toast when going from offline to online", () => {
    (useNetworkStatus as Mock).mockReturnValueOnce(false);
    render(<InternetDisconnectionHandler />);

    (useNetworkStatus as Mock).mockReturnValueOnce(true);
    render(<InternetDisconnectionHandler />);

    expect(mockDismiss).toHaveBeenCalledWith("test-toast-id");
  });
});
