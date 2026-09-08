import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="[id]" options={{ title: "Pokémon" }} />
        </Stack>
    )
    //<Stack screenOptions={{ headerShown: false }} />
}