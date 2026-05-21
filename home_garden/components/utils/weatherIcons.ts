import { MaterialIcons } from "@expo/vector-icons";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export function getWeatherIcon(description: string): MaterialIconName {
    const desc = description.toLowerCase().trim();

    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;

    if (desc.includes("torment") || desc.includes("thunder") || desc.includes("storm")) {
        return "flash-on";
    }

    if (desc.includes("lluv") || desc.includes("rain") || desc.includes("drizzle")) {
        return "umbrella";
    }

    if (
        desc.includes("nube") ||
        desc.includes("nuboso") ||
        desc.includes("muy nuboso") ||
        desc.includes("parcialmente nublado") ||
        desc.includes("cloud") ||
        desc.includes("overcast") ||
        desc.includes("scattered") ||
        desc.includes("broken")
    ) {
        return "wb-cloudy";
    }

    if (
        desc.includes("niebla") ||
        desc.includes("mist") ||
        desc.includes("fog") ||
        desc.includes("haze")
    ) {
        return "cloud";
    }

    if (
        desc.includes("despejado") ||
        desc.includes("clear") ||
        desc.includes("soleado") ||
        desc.includes("sun")
    ) {
        return isNight ? "nightlight-round" : "wb-sunny";
    }

    return "wb-cloudy";
}