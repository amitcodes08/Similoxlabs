import React, { createContext, useContext, useSyncExternalStore } from "react";

const AuthContext = createContext({
  role: "student",
  isTeacher: false,
  isStudent: true,
  isHydrated: false,
  setRole: () => {}
});

function subscribeRole(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("similox_role_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("similox_role_change", callback);
  };
}

function getRoleSnapshot() {
  try {
    return (localStorage.getItem("role") || "student").toLowerCase();
  } catch {
    return "student";
  }
}

function getServerRoleSnapshot() {
  return "student";
}

const emptySubscribe = () => () => {};

export function AuthProvider({ children }) {
  const role = useSyncExternalStore(subscribeRole, getRoleSnapshot, getServerRoleSnapshot);
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const setRole = (newRole) => {
    const formattedRole = (newRole || "student").toLowerCase();
    try {
      localStorage.setItem("role", formattedRole);
      window.dispatchEvent(new Event("similox_role_change"));
    } catch (err) {
      console.warn("Could not save role to localStorage", err);
    }
  };

  const isTeacher = role === "teacher";
  const isStudent = !isTeacher;

  return (
    <AuthContext.Provider
      value={{
        role,
        isTeacher,
        isStudent,
        isHydrated,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
