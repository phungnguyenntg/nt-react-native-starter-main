import { selectUser, selectAuthLoading, selectAuthError } from "../auth.selectors";
import { RootState } from "@/store/store";
import { User } from "@/types/user";

describe("Auth selectors", () => {
  const mockUser: User = {
      id: 1,
      firstName: "John Doe",
      username: "johndoe",
      lastName: "Doe",
      email: "john@example.com",
      age: 30,
      role: "user",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

  const mockState: RootState = {
    auth: {
      user: mockUser,
      loading: true,
      error: "Some error",
    },
    // Include other slices as empty objects if necessary
  } as unknown as RootState;

  describe("selectUser", () => {
    it("should return the user from state", () => {
      const result = selectUser(mockState);
      expect(result).toEqual(mockUser);
    });

    it("should return null if no user exists", () => {
      const state = { ...mockState, auth: { ...mockState.auth, user: null } };
      expect(selectUser(state)).toBeNull();
    });
  });

  describe("selectAuthLoading", () => {
    it("should return the loading state", () => {
      const result = selectAuthLoading(mockState);
      expect(result).toBe(true);
    });

    it("should return false if not loading", () => {
      const state = { ...mockState, auth: { ...mockState.auth, loading: false } };
      expect(selectAuthLoading(state)).toBe(false);
    });
  });

  describe("selectAuthError", () => {
    it("should return the error state", () => {
      const result = selectAuthError(mockState);
      expect(result).toBe("Some error");
    });

    it("should return null if no error", () => {
      const state = { ...mockState, auth: { ...mockState.auth, error: null } };
      expect(selectAuthError(state)).toBeNull();
    });
  });
});