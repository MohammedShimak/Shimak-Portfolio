"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local storage fallback for dev/demo mode
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_admin_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("portfolio_admin_user");
        }
      }
    }

    // 2. Attach Firebase auth state listener
    try {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        if (u) {
          setUser(u);
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "portfolio_admin_user",
              JSON.stringify({ uid: u.uid, email: u.email })
            );
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const isPlaceholder =
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "placeholder";

    if (isPlaceholder) {
      // Local dev / demo mode login
      const demoUser = {
        uid: "demo-admin-uid",
        email: email || "mohammedshimak077@gmail.com",
        displayName: "Mohammed Shimak (Admin)",
      } as unknown as User;

      setUser(demoUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_admin_user", JSON.stringify(demoUser));
      }
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const authErr = err as { code?: string; message?: string };
      if (
        authErr?.code === "auth/invalid-api-key" ||
        authErr?.code === "auth/api-key-not-valid" ||
        authErr?.message?.includes("API key")
      ) {
        const demoUser = {
          uid: "demo-admin-uid",
          email: email || "mohammedshimak077@gmail.com",
          displayName: "Mohammed Shimak (Admin)",
        } as unknown as User;

        setUser(demoUser);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "portfolio_admin_user",
            JSON.stringify(demoUser)
          );
        }
        return;
      }
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio_admin_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

