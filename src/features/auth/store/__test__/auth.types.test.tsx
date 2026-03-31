import { initialAuthState, AuthState } from "../auth.types";
import { User } from "@/types/user";

describe("AuthState", () => {
  it("initialAuthState should have the correct default values", () => {
    const expected: AuthState = {
      user: null,
      loading: false,
      error: null,
    };

    expect(initialAuthState).toEqual(expected);
  });

  it("should allow a valid user object in AuthState", () => {
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

    const stateWithUser: AuthState = {
      ...initialAuthState,
      user: mockUser,
    };

    expect(stateWithUser.user).toEqual(mockUser);
    expect(stateWithUser.loading).toBe(false);
    expect(stateWithUser.error).toBeNull();
  });
});