import { Image } from "expo-image";
import Constants from "expo-constants";

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;

type Props = {
    theme: "predetermined" | "photo";
    imgSource: string;
    sizeWidth: number;
    sizeHeight: number;
};

export default function ImageViewer({ theme, imgSource, sizeWidth, sizeHeight }: Props) {
    if (theme === "predetermined" || imgSource == "Predeterminada.png") {
        return <Image source={`${SUPABASE_URL}/uploads/Sensores/Predeterminada.png`} style={{width: sizeWidth, height: sizeHeight}}/>
    }

    if (theme === "photo") {
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