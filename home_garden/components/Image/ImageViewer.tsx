import { Image } from "expo-image";
import Constants from "expo-constants";

interface AppConfig {
    SUPABASE_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

type Props = {
    theme: "predetermined" | "photo";
    imgSource: string;
    sizeWidth: number;
    sizeHeight: number;
};

export default function ImageViewer({ theme, imgSource, sizeWidth, sizeHeight }: Props){
    if (theme === "predetermined"){
        return <Image source={`${config.SUPABASE_URL}/uploads/Sensores/Predeterminada.png`} style={{width: sizeWidth, height: sizeHeight}}/>
    }

    if (theme === "photo"){
        return <Image
            source={imgSource}
            style={{
                width: sizeWidth,
                height: sizeHeight,
                marginTop: 10,
                borderRadius: 30
            }}
         />
    }
}