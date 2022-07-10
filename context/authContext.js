import { createContext, useContext, Context } from "react";
import UseFirebaseAuth from "../authUser";


const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

export function AuthUserProvider({ children }) {
  const auth = UseFirebaseAuth()
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);
