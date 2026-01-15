export const formatDate = (dateString?: string): string => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
