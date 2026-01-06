import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    theme: "predetermined" | "photo";
    imgSource: string;
    sizeWidth: number;
    sizeHeight: number;
};

export default function ImageViewer({ theme, imgSource, sizeWidth, sizeHeight }: Props){
    if (theme === "predetermined"){
        return <Image source={imgSource} style={{width: sizeWidth, height: sizeHeight}}/>
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