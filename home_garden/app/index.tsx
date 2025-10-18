import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";

interface AppConfig {
  API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

export default function Index() {
  const [users, setUser] = useState([]);

  useEffect(() => {
      fetchData();
    },[])

  async function fetchData() {
    const response = await fetch(`${config.API_URL}/user/1`);
    const data = await response.json();

    setUser(data);

  
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Bienvenido a Home Garden, Ricardo</Text>
      <Text>{ JSON.stringify(users) }</Text>
    </View>
  );
}
