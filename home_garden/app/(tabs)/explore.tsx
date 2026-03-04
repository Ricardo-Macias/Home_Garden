import { View, FlatList, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

import SearchBar from "@/components/explore/SearchBar";
import FilterModal from "@/components/explore/FilterModal";
import FilterButton from "@/components/explore/FilterButton";
import CropCard, { Cultivo } from "@/components/explore/CropCard";
import { useAuth } from "../../hooks/useAuth";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

interface Filters {
    difficulty: string[];
    type: string[];
    duration: string[];
}

export default function Explore() {
    const router = useRouter();
    const { user } = useAuth();

    const [data, setData] = useState<Cultivo[]>([]);
    const [filteredData, setFilteredData] = useState<Cultivo[]>([]);
    const [search, setSearch] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [filters, setFilters] = useState<Filters>({
        difficulty: [],
        type: [],
        duration: [],
    });

    // Cargar cultivos
    const fetchCultivos = async () => {
        try {
            const response = await fetch(`${config.API_URL}/crop`);
            const json = await response.json();
            const arrayData = Array.isArray(json) ? json : json.cultivos || [];
            setData(arrayData);
            setFilteredData(arrayData);
        } catch (error) {
            console.error("Error al cargar cultivos:", error);
        }
    };

    // Cargar favoritos del usuario
    const fetchFavorites = async () => {
        try {
            const response = await fetch(`${config.API_URL}/favoritos/${user.id}`);
            const data = await response.json();
            const favIds = data.map((c: Cultivo) => c.id);
            setFavorites(favIds);
        } catch (error) {
            console.error("Error al cargar favoritos:", error);
        }
    };

    useEffect(() => {
        fetchCultivos();
        fetchFavorites();
    }, []);

    // Filtros
    useEffect(() => {
        let result = [...data];

        if (search.trim() !== "") {
            result = result.filter((item) =>
                item.nombre?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filters.difficulty.length > 0) {
            result = result.filter((item) =>
                filters.difficulty.includes(item.dificultad?.toLowerCase())
            );
        }

        if (filters.type.length > 0) {
            result = result.filter((item) =>
                filters.type.includes(item.tipo.toLowerCase())
            );
        }

        if (filters.duration.length > 0) {
            result = result.filter((item) => {
                return filters.duration.some((range) => {
                    const days = item.duracion;

                    if (range === "20-40") return days >= 20 && days <= 40;
                    if (range === "40-60") return days > 40 && days <= 60;
                    if (range === "60-80") return days > 60 && days <= 80;
                    if (range === "80-100") return days > 80 && days <= 100;
                    if (range === "100+") return days > 100;

                    return false;
                });
            });
        }

        setFilteredData(result);
    }, [search, filters, data]);

    // Favoritos
    const toggleFavorite = async (id: number) => {
        try {
            if (favorites.includes(id)) {
                await fetch(`${config.API_URL}/favoritos`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuarioId: user.id, cultivoId: id }),
                });
                setFavorites(favorites.filter((fav) => fav !== id));
            } else {
                await fetch(`${config.API_URL}/favoritos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuarioId: user.id, cultivoId: id }),
                });
                setFavorites([...favorites, id]);
            }
        } catch (error) {
            console.error("Error al actualizar favoritos:", error);
        }
    };

    return (
        <View style={styles.container}>
            <SearchBar value={search} onChange={setSearch} />

            <FilterButton onPress={() => setModalVisible(true)} />

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CropCard
                        item={item}
                        onPress={() =>
                            router.push({
                                pathname: "../explore/cultivoDetail",
                                params: { id: item.id },
                            })
                        }
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                    <Text style={styles.empty}>No se encontraron cultivos</Text>
                }
            />

            <FilterModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                filters={filters}
                setFilters={setFilters}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#6b7280",
        fontSize: 16,
        fontStyle: "italic",
    },
});