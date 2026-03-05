import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function usePolling<T>(
    url: string,
    intervalMs: number = 60000, // tiempo maximo
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<T>(url, options);
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        interval = setInterval(fetchData, intervalMs);

        return () => clearInterval(interval);
    }, [url, intervalMs]);

    return { data, error, loading };
}