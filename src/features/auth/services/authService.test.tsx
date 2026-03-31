import { loginAPI, logoutAPI } from "./authService";
import { api } from "@/services";
import { LoginRequest, LoginResponse, LogoutResponse } from "../types/auth-api.types";
import { User } from "@/types/user";

// Mock the api module
jest.mock("@/services", () => ({
  api: {
    post: jest.fn(),
  },
}));

describe("Auth API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loginAPI", () => {
    it("should call api.post with the correct endpoint and payload and return data", async () => {
      const payload: LoginRequest = { username: "user", password: "pass" };
      const mockResponse: LoginResponse = { status: true, data: { user: { id: 1, username: "user" } as User, token: "mock-token" } };

      // @ts-ignore
      api.post.mockResolvedValue({ data: mockResponse });

      const result = await loginAPI(payload);

      expect(api.post).toHaveBeenCalledWith("/login", payload);
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if api.post fails", async () => {
      const payload: LoginRequest = { username: "user", password: "pass" };
      const mockError = new Error("Network error");

      // @ts-ignore
      api.post.mockRejectedValue(mockError);

      await expect(loginAPI(payload)).rejects.toThrow("Network error");
    });
  });

  describe("logoutAPI", () => {
    it("should call api.post with the correct endpoint and return data", async () => {
      const mockResponse: LogoutResponse = { status: true, data: { message: "Logged out successfully" } };

      // @ts-ignore
      api.post.mockResolvedValue({ data: mockResponse });

      const result = await logoutAPI();

      expect(api.post).toHaveBeenCalledWith("/logout");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if api.post fails", async () => {
      const mockError = new Error("Logout failed");

      // @ts-ignore
      api.post.mockRejectedValue(mockError);

      await expect(logoutAPI()).rejects.toThrow("Logout failed");
    });
  });
});