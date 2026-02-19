const weatherImages: Record<string, any[]> = {
    soleado: [
        require("../../assets/images/weather/sunny1.png"),
        require("../../assets/images/weather/sunny2.png"),
        require("../../assets/images/weather/sunny3.png"),
    ],
    soleado_noche: [
        require("../../assets/images/weather/sunny_noche.png"),
    ],
    nublado: [
        require("../../assets/images/weather/cloudy1.png"),
    ],
    nublado_noche: [
        require("../../assets/images/weather/cloudy1.png"),
    ],
    lluvia: [
        require("../../assets/images/weather/rain1.png"),
    ],
    lluvia_noche: [
        require("../../assets/images/weather/rain1.png"),
    ],
    tormenta: [
        require("../../assets/images/weather/storm1.png"),
    ],
    tormenta_noche: [
        require("../../assets/images/weather/storm1.png"),
    ],
    default: [require("../../assets/images/weather/default.png")],
};

// Categorizar clima
export function getWeatherCategory(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes("sol") || desc.includes("claro")) return "soleado";
    if (desc.includes("nube")) return "nublado";
    if (desc.includes("lluvia")) return "lluvia";
    if (desc.includes("tormenta")) return "tormenta";
    return "default";
}

// Obtener imagen aleatoria según clima y hora
export function getRandomWeatherImage(description: string): any {
    const category = getWeatherCategory(description);

    // Detectar hora actual
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6; // noche entre 7pm y 6am

    // Si hay versión nocturna, usarla
    const categoryKey = isNight ? `${category}_noche` : category;

    const images = weatherImages[categoryKey] || weatherImages["default"];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}