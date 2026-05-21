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
        const temp = data.main?.temp ?? 0;
        const humidity = data.main?.humidity ?? 0;
        const wind = data.wind?.speed ?? 0;

        if (
            lastWeatherCode !== null &&
            lastWeatherCode !== newCode
        ) {

            let title = "Cambio de clima";

            let message = "";


            if (newCode >= 200 && newCode < 600) {

                const rainMessages = [
                    "Comenzó a llover, evita exceso de agua en tus cultivos.",
                    "Lluvia detectada, revisa el drenaje de tus macetas.",
                    "Cambio repentino: clima lluvioso.",
                    "La humedad aumentará, vigila posibles hongos.",
                ];

                message =
                    rainMessages[
                        Math.floor(Math.random() * rainMessages.length)
                    ];

                title = "Lluvia detectada";
            }

            else if (newCode === 800) {

                const sunnyMessages = [
                    "Ahora el clima está despejado y soleado.",
                    "Buen momento para revisar tus plantas.",
                    "El sol salió nuevamente, aprovecha la luz natural.",
                    "Clima despejado detectado.",
                ];

                message =
                    sunnyMessages[
                        Math.floor(Math.random() * sunnyMessages.length)
                    ];

                title = "Clima soleado";
            }


            else {

                const cloudMessages = [
                    `El clima cambió: ${desc}`,
                    "Se detectó un cambio en las condiciones del clima.",
                    "El cielo está más nublado de lo habitual.",
                    "Cambio climático detectado en tu zona.",
                ];

                message =
                    cloudMessages[
                        Math.floor(Math.random() * cloudMessages.length)
                    ];
            }


            if (temp >= 33) {

                message +=
                    " Temperatura alta, revisa el riego.";

            }

            if (humidity >= 85) {

                message +=
                    " La humedad es elevada, cuidado con hongos.";

            }

            if (wind >= 8) {

                message +=
                    " Hay viento fuerte, protege plantas delicadas.";

            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body: message,
                },
                trigger: null,
            });
        }

        lastWeatherCode = newCode;

    } catch (error) {

        console.error(
            "Error al consultar clima:",
            error
        );

    }
};



const secondsUntilHour = (
    hour: number,
    minute: number
): number => {

    const now = new Date();

    const target = new Date();

    target.setHours(hour, minute, 0, 0);

    if (target <= now) {

        target.setDate(target.getDate() + 1);

    }

    return Math.floor(
        (target.getTime() - now.getTime()) / 1000
    );
};

export const scheduleDailyWeatherNotifications = async () => {

    try {

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=20.7167&lon=-103.4&units=metric&appid=${config.WEATHER_API_KEY}&lang=es`
        );

        const data = response.data;
        const weatherCode = data.weather?.[0]?.id ?? null;
        const desc = data.weather?.[0]?.description ?? "";
        const temp = data.main?.temp ?? 0;
        const humidity = data.main?.humidity ?? 0;
        const wind = data.wind?.speed ?? 0;


        let messages: string[] = [];

        if (weatherCode >= 200 && weatherCode < 600) {

            messages = [
                "Se esperan lluvias hoy, evita exceso de riego.",
                "Clima lluvioso detectado, revisa drenajes.",
                "La humedad será alta durante el día.",
                "Buen día para ahorrar agua en el riego.",
                "Cuida tus cultivos del exceso de humedad.",
            ];
        }


        else if (weatherCode === 800) {

            messages = [
                "Día soleado, ideal para tus cultivos.",
                "Aprovecha la luz solar natural hoy.",
                "Buen clima para crecimiento vegetal.",
                "El cielo estará despejado gran parte del día.",
                "Mantén hidratadas tus plantas por el calor.",
            ];
        }

        else {

            messages = [
                `Hoy el clima estará ${desc}.`,
                "Monitorea la humedad de tus plantas.",
                "El clima podría cambiar durante el día.",
                "Mantente atento al ambiente de tus cultivos.",
            ];
        }


        if (temp >= 33) {

            messages.push(
                "Temperaturas altas detectadas, revisa el riego."
            );

        }

        if (temp <= 10) {

            messages.push(
                "Hace frío, protege plantas sensibles."
            );

        }

        if (humidity >= 85) {

            messages.push(
                "La humedad ambiental es elevada."
            );

        }

        if (wind >= 8) {

            messages.push(
                "Hay bastante viento hoy, protege macetas ligeras."
            );

        }


        await Notifications.cancelAllScheduledNotificationsAsync();

        const times = [

            { hour: 7, minute: 0 },
            { hour: 12, minute: 0 },
            { hour: 16, minute: 35 },
            { hour: 20, minute: 0 },

        ];

        for (const { hour, minute } of times) {

            const seconds =
                secondsUntilHour(hour, minute);

            const trigger: TimeIntervalTriggerInput = {
                seconds,
                repeats: true,
                type: SchedulableTriggerInputTypes.TIME_INTERVAL,
            };


            const bodyMessage =
                messages[
                    Math.floor(Math.random() * messages.length)
                ];

            let title = "Clima diario";

            if (hour === 7) {
                title = "Buenos dias ";
            } else if (hour === 12) {
                title = "Clima del mediodia ";
            } else if (hour === 16) {
                title = "Tarde de cultivo ";
            } else if (hour === 20) {
                title = "Revisión nocturna";
            }

            await Notifications.scheduleNotificationAsync({

                content: {
                    title,
                    body: bodyMessage,
                },

                trigger,

            });
        }

    } catch (error) {

        console.error(
            "Error al programar clima diario:",
            error
        );

    }
};