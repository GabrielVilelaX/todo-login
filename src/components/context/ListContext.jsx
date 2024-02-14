import { createContext } from "react";

const existingList = JSON.parse(localStorage.getItem("users")) || [];

const ListContext = createContext();

function ListProvider() {
  return <ListContext.Provider></ListContext.Provider>;
}

export { ListProvider };
