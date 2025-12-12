import { Text, View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/"); // vuelve al login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido usuario</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});