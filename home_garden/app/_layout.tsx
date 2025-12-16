import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaView style={{flex: 1,}}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }} />
      </Stack>
    </SafeAreaView>
  );
}
