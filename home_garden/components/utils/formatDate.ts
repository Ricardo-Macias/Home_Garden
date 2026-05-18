export const formatDate = (dateString?: string): string => {
    if (!dateString) return "—";

    const onlyDate = dateString.split("T")[0];
    const [year, month, day] = onlyDate.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

export const formatTime = (timeString?: string): string => {
    if (!timeString) return "—";

    const [hours, minutes, seconds] = timeString.split(":");

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));

    return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });
};