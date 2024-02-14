/* eslint-disable no-case-declarations */
import { useReducer, createContext, useContext } from "react";

const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

const UserContext = createContext();

let currentUser = {
  username: "",
  password: "",
  activities: [],
};

const initialState = {
  users: existingUsers,
  username: "",
  password: "",
  currentUser,
  isAuthenticated: false,
};

function reducer(state, action) {
  console.log(state.currentUser);
  switch (action.type) {
    case "register":
      const newUser = {
        username: action.payload.username,
        password: action.payload.password,
        activities: [],
      };
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      existingUsers.push(newUser);
      return {
        ...state,
        users: updatedUsers,
      };

    case "login":
      return { ...state, isAuthenticated: true, currentUser: action.payload };

    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: { username: "", password: "", activities: [] },
      };
    case "addActivity":
      const updatedUser = {
        ...state.currentUser,
        activities: [...(state.currentUser.activities || []), action.payload],
      };

      const userIndex = state.users.findIndex(
        (user) => user.username === state.currentUser.username
      );
      const updatedUsersArray = [...state.users];

      updatedUsersArray[userIndex] = {
        ...updatedUsersArray[userIndex],
        activities: updatedUser.activities,
      };

      localStorage.setItem("users", JSON.stringify(updatedUsersArray));

      return {
        ...state,
        currentUser: updatedUser,
        users: updatedUsersArray,
      };

    default:
      throw new Error("foda-se");
  }
}

function UserProvider({ children }) {
  const [{ isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function register(newUser) {
    dispatch({ type: "register", payload: newUser });
  }

  function login(newlog) {
    const userExists = existingUsers.some(
      (user) =>
        user.username === newlog.username && user.password === newlog.password
    );
    if (userExists) {
      currentUser = {
        username: newlog.username,
        password: newlog.password,
      };
      console.log(currentUser);
      dispatch({ type: "login", payload: newlog });
    } else {
      return alert("erro");
    }
  }

  function addActivity(activity) {
    dispatch({ type: "addActivity", payload: activity });
  }

  function updateUser({ username, password }) {
    dispatch({ type: "updateUser", payload: { username, password } });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <UserContext.Provider
      value={{
        register,
        updateUser,
        login,
        logout,
        isAuthenticated,
        currentUser,
        addActivity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("errou");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };
