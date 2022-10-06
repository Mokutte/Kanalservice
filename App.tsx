import Navigation from "./src/navigation/Navigation";
import { NativeBaseProvider } from "native-base";
import { useState, useEffect } from "react";
import { IUser, IUsers } from "./src/models/types";
import { getValueFromAS } from "./src/utils/getValueFromAS";
import { MainContext } from "./src/context";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState<IUser>();
  const [users, setUsers] = useState<IUsers[]>();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
    
  }, []);

  useEffect(() => {
    const asyncGet = async () => {
      const userValue = await getValueFromAS("user");
      setUser(userValue);
    };
    asyncGet();
  }, []);


  return (
    <MainContext.Provider value={{ user, setUser, users, setUsers }}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </MainContext.Provider>
  );
}
