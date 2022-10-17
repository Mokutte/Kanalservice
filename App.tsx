import Navigation from "./src/navigation/Navigation";
import { NativeBaseProvider } from "native-base";
import { useState, useEffect } from "react";
import { IUsers } from "./src/models/types";
import { getValueFromAS } from "./src/utils/getValueFromAS";
import { MainContext } from "./src/context";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState<IUsers[]>();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    const asyncGet = async () => {
      setAuth(await getValueFromAS("auth"));
    };
    asyncGet();
  }, []);

  return (
    <MainContext.Provider value={{ users, setUsers, auth, setAuth }}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </MainContext.Provider>
  );
}
