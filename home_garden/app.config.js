import 'dotenv/config';

export default {
    expo: {
        name: "home_garden",
        slug: "home_garden",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/Mora.png",
        scheme: "homegarden",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
        supportsTablet: true
        },
        android: {
        adaptiveIcon: {
            backgroundColor: "#E6F4FE",
            foregroundImage: "./assets/images/Mora-foreground.png",
        
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        permissions: [
            "android.permission.BLUETOOTH",
            "android.permission.BLUETOOTH_ADMIN",
            "android.permission.BLUETOOTH_CONNECT",
            "ACCESS_FINE_LOCATION",
            "ACCESS_WIFI_STATE",
            "CHANGE_WIFI_STATE"
        ],
        package: "com.appmodular.home_garden",
        usesCleartextTraffic:true,
        },
        web: {
        output: "static",
        favicon: "./assets/images/favicon.png"
        },
        plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
            dark: {
                backgroundColor: "#000000"
            }
            }
        ],
        [
            "react-native-ble-plx",
            {
            isBackgroundEnabled: true,
            modes: [
                "peripheral",
                "central"
            ],
            bluetoothAlwaysPermission: "Allow $(PRODUCT_NAME) to connect to bluetooth devices"
            }
        ]
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true
        },
        extra: {
            router: {},
            eas: {
                projectId: "f31cf39a-3b1c-4aef-b42f-cad8cea11283"
            },
            API_URL: process.env.API_URL,
            WEATHER_API_KEY: process.env.WEATHER_API_KEY,
            SUPABASE_URL: process.env.SUPABASE_URL,
        },
        owner: "appmodular"
    }
};