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

export const checkWeatherChange = async () => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=20.7167&lon=-103.4&units=metric&appid=${config.WEATHER_API_KEY}&lang=es`
        );

        const data = response.data;
        const newCode = data.weather?.[0]?.id ?? null;
        const desc = data.weather?.[0]?.description ?? "";

        if (lastWeatherCode !== null && lastWeatherCode !== newCode) {
            let message = "";
            let title = "Cambio de clima";

            if (newCode >= 200 && newCode < 600) {
                message = "Esta nublado.";
                title = "Clima lluvioso";
            } else if (newCode === 800) {
                message = "Esta soleado.";
                title = "Clima soleado";
            } else {
                message = `El clima cambio: ${desc}`;
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

        let message = "";
        if (weatherCode >= 200 && weatherCode < 600) {
            message = "Hoy llovera, lleva paraguas.";
        } else if (weatherCode === 800) {
            message = "Dia soleado, perfecto para tus plantas.";
        } else {
            message = `El clima sera: ${desc}`;
        }

        await Notifications.cancelAllScheduledNotificationsAsync();

        const times = [
            { hour: 7, minute: 0 },
            { hour: 13, minute: 0 },
            { hour: 20, minute: 0 },
        ];

        for (const { hour, minute } of times) {
            const seconds = secondsUntilHour(hour, minute);
            const trigger: TimeIntervalTriggerInput = {
                seconds,
                repeats: true,
                type: SchedulableTriggerInputTypes.TIME_INTERVAL,
            };

            await Notifications.scheduleNotificationAsync({
                content: { title: "Clima", body: message },
                trigger,
            });
        }
    } catch (error) {
        console.error("Error al programar clima diario:", error);
    }
};