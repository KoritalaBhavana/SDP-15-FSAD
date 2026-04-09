import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { authApi, type ApiUser } from "@/lib/api";

export type UserRole = "tourist" | "host" | "guide" | "admin" | "chef";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  status?: string;
  token?: string;
  avatar?: string;
  sessionExpiresAt?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  authWithGoogle: (role: UserRole, mode: "signin" | "signup", token?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  updateProfile: (updates: Partial<Pick<AuthUser, "name" | "email" | "avatar" | "profileImage">>) => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

const STORAGE_KEY = "user";

const toRole = (role: string | undefined): UserRole => {
  const lowered = (role || "tourist").toLowerCase();
  if (["tourist", "host", "guide", "admin", "chef"].includes(lowered)) {
    return lowered as UserRole;
  }
  return "tourist";
};

const mapApiUser = (data: ApiUser): AuthUser => ({
  id: Number(data.id),
  name: data.name,
  email: data.email,
  role: toRole(data.role),
  profileImage: data.profileImage,
  avatar: data.profileImage,
  status: data.status,
  token: data.token,
  sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
});

const initialUser = (): AuthUser | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.token || !parsed?.sessionExpiresAt || parsed.sessionExpiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const persistUser = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (!nextUser) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  };

  const login = async (email: string, password: string, role: UserRole) => {
    const response = await authApi.login({ email, password });
    const normalized = mapApiUser(response as ApiUser);

    if (normalized.role !== role) {
      throw new Error(`This account belongs to ${normalized.role.toUpperCase()} role.`);
    }

    persistUser(normalized);
  };

  const signup = async (data: SignupData) => {
    const response = await authApi.register({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role.toUpperCase(),
      phone: data.phone,
    });
    persistUser(mapApiUser(response as ApiUser));
  };

  const authWithGoogle = async (role: UserRole, mode: "signin" | "signup", token?: string) => {
    if (!token) {
      throw new Error("Google OAuth token missing. Integrate Google login button token callback.");
    }
    const response = await authApi.google(token, role.toUpperCase());
    const normalized = mapApiUser(response as ApiUser);
    if (mode === "signin" && normalized.role !== role) {
      throw new Error(`This Google account belongs to ${normalized.role.toUpperCase()} role.`);
    }
    persistUser(normalized);
  };

  const logout = () => {
    persistUser(null);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) {
      return;
    }
    const next = {
      ...user,
      ...updates,
      avatar: updates.avatar ?? updates.profileImage ?? user.avatar,
      profileImage: updates.profileImage ?? updates.avatar ?? user.profileImage,
      sessionExpiresAt: user.sessionExpiresAt ?? Date.now() + SESSION_DURATION_MS,
    };
    persistUser(next);
  };

  const value = useMemo<AuthContextType>(() => ({
    user,
    isLoggedIn: Boolean(user),
    login,
    signup,
    authWithGoogle,
    logout,
    updateUser,
    updateProfile: updateUser,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
