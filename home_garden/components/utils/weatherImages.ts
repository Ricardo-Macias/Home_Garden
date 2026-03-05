const weatherImages: Record<string, any[]> = {
    thunderstorm: [
        require("../../assets/images/weather/thunderstorm_day.png"),
    ],
    thunderstorm_noche: [
        require("../../assets/images/weather/thunderstorm_night.png"),
    ],
    drizzle: [
        require("../../assets/images/weather/drizzle_day.png"),
    ],
    drizzle_noche: [
        require("../../assets/images/weather/drizzle_night.png"),
    ],
    rain: [
        require("../../assets/images/weather/rain_day.png"),
    ],
    rain_noche: [
        require("../../assets/images/weather/rain_night.png"),
    ],
    atmosphere: [
        require("../../assets/images/weather/fog_day.png"),
    ],
    atmosphere_noche: [
        require("../../assets/images/weather/fog_night.png"),
    ],
    clear: [
        require("../../assets/images/weather/clear_day.png"),
    ],
    clear_noche: [
        require("../../assets/images/weather/clear_night.png"),
    ],
    clouds_few: [
        require("../../assets/images/weather/clouds_few_day.png"),
    ],
    clouds_few_noche: [
        require("../../assets/images/weather/clouds_few_night.png"),
    ],
    clouds_scattered: [
        require("../../assets/images/weather/clouds_scattered_day.png"),
    ],
    clouds_scattered_noche: [
        require("../../assets/images/weather/clouds_scattered_day.png"),
    ],
    clouds_broken: [
        require("../../assets/images/weather/clouds_broken_day.png"),
    ],
    clouds_broken_noche: [
        require("../../assets/images/weather/clouds_broken_day.png"),
    ],
    clouds_overcast: [
        require("../../assets/images/weather/clouds_overcast_day.png"),
    ],
    clouds_overcast_noche: [
        require("../../assets/images/weather/clouds_overcast_day.png"),
    ],
    default: [require("../../assets/images/weather/default.png")],
};

export function getWeatherCategory(code: number): string {
    if (code >= 200 && code < 300) return "thunderstorm"; // Tormentas
    if (code >= 300 && code < 400) return "drizzle"; // Llovizna
    if (code >= 500 && code < 600) return "rain"; // Lluvia
    if (code >= 700 && code < 800) return "atmosphere"; // Niebla, bruma
    if (code === 800) return "clear"; // Despejado
    if (code === 801) return "clouds_few"; // pocas nubes
    if (code === 802) return "clouds_scattered"; // nubes dispersas
    if (code === 803) return "clouds_broken"; // cielo parcialmente cubierto
    if (code === 804) return "clouds_overcast"; // cielo totalmente cubierto

    return "default";
}

export function getRandomWeatherImage(code: number): any {
    const category = getWeatherCategory(code);

    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6; // noche entre 7pm y 6am

    const categoryKey = isNight ? `${category}_noche` : category;

    const images = weatherImages[categoryKey] || weatherImages["default"];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}