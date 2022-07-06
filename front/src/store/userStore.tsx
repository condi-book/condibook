import React from "react";
import { loginReducer } from "reducer";

const initialData = {};
const UserContext = React.createContext(initialData);

const UserProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [userState, userDispatch] = React.useReducer(loginReducer, {
    user: null,
  });

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
