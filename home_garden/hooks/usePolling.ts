import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function usePolling<T>(
    url: string,
    intervalMs: number = 60000,
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const fetchData = async () => {
            try {

                const response = await axios<T>({
                    url,
                    method: options?.method || "GET",
                    data: options?.data,
                    headers: options?.headers,
                });

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