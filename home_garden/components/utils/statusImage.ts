export function getStatusImage(humedadSuelo: { valor: number; min: number; max: number }) {
    if (!humedadSuelo) {
        return require("../../assets/images/status/planta_saludable.png");
    }

    if (humedadSuelo.valor < humedadSuelo.min) {
        return require("../../assets/images/status/planta_seca.png");
    }

    if (humedadSuelo.valor > humedadSuelo.max) {
        return require("../../assets/images/status/planta_exceso.png");
    }

    return require("../../assets/images/status/planta_saludable.png");
}
