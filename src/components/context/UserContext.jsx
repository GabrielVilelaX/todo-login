import { useReducer, createContext, useContext } from "react";

const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

const UserContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "register":
      // eslint-disable-next-line no-case-declarations
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;

    case "login":
      return alert("Seja bem vindo");

    case "updateUser":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      throw new Error("foda-se");
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    users: existingUsers,
    username: "",
    password: "",
  });

  function register(newUser) {
    dispatch({ type: "register", payload: newUser });
  }

  function login(newlog) {
    const userExists = existingUsers.some(
      (user) =>
        user.username === newlog.username && user.password === newlog.password
    );
    if (userExists) {
      dispatch({ type: "login", payload: newlog });
    } else {
      return;
    }
  }

  function updateUser({ username, password }) {
    dispatch({ type: "updateUser", payload: { username, password } });
  }

  return (
    <UserContext.Provider value={{ register, updateUser, login, ...state }}>
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
