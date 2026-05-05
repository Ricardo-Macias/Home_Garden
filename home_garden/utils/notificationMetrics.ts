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

let lastStates = {
    temperatura: "ok",
    humedadSuelo: "ok",
    humedadAmbiente: "ok",
    luz: "ok",
};

export const notifyMetrics = async (data: {
    temperatura: SensorResult;
    humedadSuelo: SensorResult;
    humedadAmbiente: SensorResult;
    luz: SensorResult;
}) => {
    const alerts: string[] = [];

    for (const key of Object.keys(lastStates) as (keyof typeof lastStates)[]) {
        if (data[key].estado === "fuera" && lastStates[key] === "ok") {
            alerts.push(
                ` ${key} fuera de rango: ${data[key].valor} (ideal ${data[key].min}-${data[key].max})`
            );
        }
        lastStates[key] = data[key].estado;
    }

    if (alerts.length > 0) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Alerta de medidas ambientales",
                body: alerts.join("\n"),
            },
            trigger: null,
        });
    }
};
