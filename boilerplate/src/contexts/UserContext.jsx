import { useContext, createContext, useReducer, useEffect } from "react";
import { checkStatus } from "../services/apiAccount";
const UserContext = createContext();

const initialState = {
  user: null,
  accountStatus: false,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
    case "register":
      return {
        ...state,
        user: action.payload,
        accountStatus: true,
        loading: false,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload,
        accountStatus: !!action.payload,
        loading: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

function UserProvider({ children }) {
  const [{ user, accountStatus, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchUserStatus() {
      try {
        const result = await checkStatus();
        if (result.loggedIn) {
          dispatch({ type: "setUser", payload: result.user });
        } else {
          dispatch({ type: "setUser", payload: null });
        }
      } catch (error) {
        console.error("Failed to fetch user status:", error);
        dispatch({ type: "setUser", payload: null });
      }
    }

    fetchUserStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, accountStatus, dispatch, loading }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the UserProvider");
  return context;
}

export { UserProvider, useUser };
