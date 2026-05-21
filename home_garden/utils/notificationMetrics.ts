import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export type SensorResult = {
    valor: number;
    estado: "ok" | "fuera";
    min: number;
    max: number;
};

type SensorKey =
    | "temperatura"
    | "humedadSuelo"
    | "humedadAmbiente"
    | "luz";

let lastStates: Record<SensorKey, "ok" | "fuera"> = {
    temperatura: "ok",
    humedadSuelo: "ok",
    humedadAmbiente: "ok",
    luz: "ok",
};

let lastNotificationTime = 0;

const NOTIFICATION_DELAY = 1000 * 60 * 5;

const sensorNames: Record<SensorKey, string> = {
    temperatura: "Temperatura",
    humedadSuelo: "Humedad del suelo",
    humedadAmbiente: "Humedad ambiental",
    luz: "Luz",
};

const random = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const buildMessage = (
    key: SensorKey,
    sensor: SensorResult
): string => {

    const isLow = sensor.valor < sensor.min;

    switch (key) {

        case "temperatura":

            if (isLow) {

                return random([
                    "La temperatura está muy baja para el cultivo.",
                    "Hace demasiado frío para un crecimiento ideal.",
                    "El ambiente está frío, protege tus plantas.",
                ]);
            }

            return random([
                "La temperatura está demasiado alta.",
                "Hace mucho calor para el cultivo.",
                "El ambiente está caliente, revisa el riego.",
            ]);

        case "humedadSuelo":

            if (isLow) {

                return random([
                    "El suelo está seco, considera regar.",
                    "La tierra necesita más humedad.",
                    "La humedad del suelo es baja.",
                ]);
            }

            return random([
                "El suelo tiene demasiada humedad.",
                "Hay exceso de agua en la tierra.",
                "Cuidado con el exceso de riego.",
            ]);

        case "humedadAmbiente":

            if (isLow) {
                return "";
            }

            return random([

                "La humedad ambiental es muy alta.",
                "Ambiente húmedo detectado.",
                "Podrían aparecer hongos por exceso de humedad.",
                "La humedad elevada favorece plagas y enfermedades.",
                "Exceso de humedad ambiental detectado.",
            ]);

        case "luz":

            if (isLow) {

                return random([
                    "Tus plantas están recibiendo poca luz.",
                    "La iluminación es insuficiente.",
                    "Considera mover el cultivo a una zona más iluminada.",
                ]);
            }

            return random([
                "La intensidad de luz es muy alta.",
                "Tus plantas reciben demasiada luz.",
                "El sol podría estresar el cultivo.",
            ]);
        default:
            return "Se detectó una condición fuera de rango.";
    }
};

const titles = [
    "Alerta de cultivo",
    "Condiciones fuera de rango",
    "Atención en tu huerto",
    "Revisa tus plantas",
];

export const notifyMetrics = async (data: {
    temperatura: SensorResult;
    humedadSuelo: SensorResult;
    humedadAmbiente: SensorResult;
    luz: SensorResult;
}) => {

    const now = Date.now();

    if (now - lastNotificationTime < NOTIFICATION_DELAY) {
        return;
    }

    const alerts: string[] = [];

    for (const key of Object.keys(lastStates) as SensorKey[]) {

        const sensor = data[key];

        if (
            sensor.estado === "fuera" &&
            lastStates[key] === "ok"
        ) {

            const sensorName = sensorNames[key];
            const message =
                buildMessage(key, sensor);

            if (message !== "") {
                alerts.push(
                    `${sensorName}: ${message}`
                );
            }
        }
        lastStates[key] = sensor.estado;
    }

    if (alerts.length > 0) {

        lastNotificationTime = now;

        await Notifications.scheduleNotificationAsync({

            content: {
                title: random(titles),
                body: alerts.join("\n\n"),
            },
            trigger: null,

        });
    }
};