"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [supabase] = useState(createClient);

  useEffect(() => {
    let subscription: ReturnType<
      typeof supabase.auth.onAuthStateChange
    >["data"]["subscription"] | null = null;

    async function checkUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
        subscription = data.subscription;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    checkUser();

    return () => subscription?.unsubscribe();
  }, [supabase]);

  async function signOut() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
