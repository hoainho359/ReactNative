// ...existing code...
import React, { createContext, useState } from "react";

export type User = { name: string; mssv: string };

export const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User>({ name: "Hoai Nho", mssv: "23636821" });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
