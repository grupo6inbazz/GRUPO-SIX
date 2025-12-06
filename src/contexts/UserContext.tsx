import { createContext, useContext, useState, ReactNode } from "react";
import { UserType } from "@/types";

interface UserContextType {
  userType: UserType | null;
  setUserType: (type: UserType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
