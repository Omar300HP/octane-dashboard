import { describe, it, vi, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Redirect } from "./Redirect";
import * as router from "react-router-dom";

// Mock react-router-dom hooks
vi.mock("react-router-dom", () => {
  return {
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe("Redirect", () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    pathname: "/current",
    state: null,
    key: "",
    search: "",
    hash: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(router.useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(router.useLocation).mockReturnValue(mockLocation);
  });

  it('should navigate to destination path when no "from" path is specified', () => {
    render(<Redirect to="/destination" />);
    expect(mockNavigate).toHaveBeenCalledWith("/destination");
  });

  it('should navigate when current path matches "from" path', () => {
    vi.mocked(router.useLocation).mockReturnValue({
      pathname: "/source",
      state: null,
      key: "",
      search: "",
      hash: "",
    });
    render(<Redirect to="/destination" from="/source" />);
    expect(mockNavigate).toHaveBeenCalledWith("/destination");
  });

  it('should not navigate when current path does not match "from" path', () => {
    vi.mocked(router.useLocation).mockReturnValue({
      pathname: "/other",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });
    render(<Redirect to="/destination" from="/source" />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
