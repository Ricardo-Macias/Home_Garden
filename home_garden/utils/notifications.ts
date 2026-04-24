import * as Notifications from "expo-notifications";
import axios from "axios";
import Constants from "expo-constants";
import {
    TimeIntervalTriggerInput,
    SchedulableTriggerInputTypes,
} from "expo-notifications";

interface AppConfig {
    WEATHER_API_KEY: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

let lastWeatherCode: number | null = null;

const isAllowedTime = (): boolean => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 24;
};

export const checkWeatherChange = async () => {
    try {
        if (!isAllowedTime()) return;

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=20.7167&lon=-103.4&units=metric&appid=${config.WEATHER_API_KEY}&lang=es`
        );

        const data = response.data;
        const newCode = data.weather?.[0]?.id ?? null;
        const desc = data.weather?.[0]?.description ?? "";

        if (lastWeatherCode !== null && lastWeatherCode !== newCode) {
            let message = "";
            let title = "Cambio brusco de clima";

            if (newCode >= 200 && newCode < 600) {
                message = "Se detecta lluvia repentina, toma precauciones.";
                title = "Clima lluvioso";
            } else if (newCode === 800) {
                message = "Cambio repentino: ahora esta soleado.";
                title = "Clima soleado";
            } else {
                message = `El clima cambio bruscamente: ${desc}`;
            }

            await Notifications.scheduleNotificationAsync({
                content: { title, body: message },
                trigger: null,
            });
        }

        lastWeatherCode = newCode;
    } catch (error) {
        console.error("Error al consultar clima:", error);
    }
};

const secondsUntilHour = (hour: number, minute: number): number => {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);

    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }

    return Math.floor((target.getTime() - now.getTime()) / 1000);
};

export const scheduleDailyWeatherNotifications = async () => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=20.7167&lon=-103.4&units=metric&appid=${config.WEATHER_API_KEY}&lang=es`
        );

        const data = response.data;
        const weatherCode = data.weather?.[0]?.id ?? null;
        const desc = data.weather?.[0]?.description ?? "";
        const temp = data.main?.temp ?? null;

        let messages: string[] = [];
        if (weatherCode >= 200 && weatherCode < 600) {
            messages = [
                "Hoy se esperan lluvias, lleva paraguas.",
                "Probabilidad de lluvia, cuida tus plantas.",
                "El dia estará lluvioso, toma precauciones."
            ];
        } else if (weatherCode === 800) {
            messages = [
                "Dia soleado, ideal para tus cultivos.",
                "El sol estara presente todo el dia.",
                "Clima despejado, aprovecha la luz solar."
            ];
        } else {
            messages = [
                `El clima sera: ${desc}`,
                `Pronóstico: ${desc}, ajusta tus cuidados.`,
                `Condiciones previstas: ${desc}`
            ];
        }

        await Notifications.cancelAllScheduledNotificationsAsync();

        const times = [
            { hour: 7, minute: 0 },
            { hour: 13, minute: 0 },
            { hour: 16, minute: 0 },
            { hour: 18, minute: 0 },
        ];

        for (const { hour, minute } of times) {
            const seconds = secondsUntilHour(hour, minute);
            const trigger: TimeIntervalTriggerInput = {
                seconds,
                repeats: true,
                type: SchedulableTriggerInputTypes.TIME_INTERVAL,
            };

            let bodyMessage = "";

            if (hour === 18) {
                if (temp && temp < 15) {
                    bodyMessage = "Se espera una noche fria, protege tus cultivos.";
                } else {
                    bodyMessage = "Revisa tus cultivos, la temperatura bajara en la noche.";
                }
            } else {
                bodyMessage = messages[Math.floor(Math.random() * messages.length)];
            }

            await Notifications.scheduleNotificationAsync({
                content: { title: "Clima diario", body: bodyMessage },
                trigger,
            });
        }
    } catch (error) {
        console.error("Error al programar clima diario:", error);
    }
};