import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type userData = {
    nombre: string;
    apellidos: string;
    correo: string;
    avatarUrl?: string;
    huertosActivos?: number;
    huertosHistorial?: number;
};

export default function ViewProfile() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState<userData | null>(null);
    const [loading, setLOading] = useState(true);

    useEffect (() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/id/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            } finally {
                setLOading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#6A1B9A"/>;
    if (!user) return <Text style={styles.error}>Usuario no encontrado</Text>;


    return (
        <View style={styles.container}>
            <Image
            source={user.avatarUrl ? { uri: user.avatarUrl } : require('../../assets/images/Mora.png')}
            style={styles.avatar}
            />
            <Text style={styles.name}>{user.nombre} {user.apellidos}</Text>
            <Text style={styles.email}>{user.correo}</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Huertos activos:</Text>
                <Text style={styles.value}>{user.huertosActivos ?? '—'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Historial de huertos:</Text>
                <Text style={styles.value}>{user.huertosHistorial ?? '—'}</Text>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },
     avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#81C784',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4A148C',
    },
    email: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6A1B9A',
        marginBottom: 24,
    },
    section: {
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#388E3C',
        fontWeight: '600',
    },
    value: {
        fontSize: 18,
        color: '#2E7D32',
        fontWeight: 'bold',
        marginTop: 4,
    },
    error: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
    },
});