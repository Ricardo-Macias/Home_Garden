import { MaterialIcons } from "@expo/vector-icons";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export function getWeatherIcon(description: string): MaterialIconName {
    const desc = description.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;

    if (isNight) {
        return "nightlight-round"; // luna
    }
    if (desc.includes("sol") || desc.includes("claro")) {
        return "wb-sunny"; // sol
    }
    if (desc.includes("nube")) {
        return "wb-cloudy"; // nublado
    }
    if (desc.includes("lluvia")) {
        return "umbrella"; // lluvia
    }
    if (desc.includes("tormenta")) {
        return "flash-on"; // tormenta
    }

    return "help-outline"; // predeterminado
}