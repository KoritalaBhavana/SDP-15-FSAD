import React, { createContext, useContext, useState, ReactNode } from "react";
import { signInWithPopup } from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";

export type UserRole = "tourist" | "host" | "guide" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  authWithGoogle: (role: UserRole, mode: "signin" | "signup") => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, "name" | "email" | "avatar" | "phone">>) => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string, role: UserRole) => {
    // Mock login - in production this would call an API
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser({
      id: "user-" + Date.now(),
      name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    });
  };

  const signup = async (data: SignupData) => {
    if (data.role === "admin") {
      throw new Error("Admin signup is disabled. Please sign in with an existing admin account.");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: "user-" + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://i.pravatar.cc/150?u=${data.email}`,
      phone: data.phone,
    });
  };

  const authWithGoogle = async (role: UserRole, mode: "signin" | "signup") => {
    if (mode === "signup" && role === "admin") {
      throw new Error("Admin signup is disabled. Please sign in with an existing admin account.");
    }

    const auth = getFirebaseAuth();
    const credential = await signInWithPopup(auth, googleProvider);
    const googleUser = credential.user;

    if (!googleUser.email) {
      throw new Error("Google account does not have an email. Please use a different account.");
    }

    setUser({
      id: googleUser.uid,
      name: googleUser.displayName || googleUser.email.split("@")[0],
      email: googleUser.email,
      role,
      avatar: googleUser.photoURL || `https://i.pravatar.cc/150?u=${googleUser.email}`,
      phone: googleUser.phoneNumber || undefined,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<Pick<User, "name" | "email" | "avatar" | "phone">>) => {
    setUser((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        ...data,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, authWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
