import { useEffect, useState } from "react";
import axios from "axios";

export function useClockPolling(
    timeZone: string = "America/Mexico_City",
    intervalMs: number = 1000 
) {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const fetchTime = async () => {
            try {
                const response = await axios.get(
                    `https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`
                );
                const serverTime = new Date(response.data.dateTime);
                setCurrentTime(serverTime);
            } catch (error) {
                console.error("Error al cargar hora:", error);
                setCurrentTime(new Date()); 
            }
        };

        fetchTime();

        interval = setInterval(() => {
            setCurrentTime((prev) =>
                prev ? new Date(prev.getTime() + intervalMs) : null
            );
        }, intervalMs);

        return () => clearInterval(interval);
    }, [timeZone, intervalMs]);

    return currentTime;
}