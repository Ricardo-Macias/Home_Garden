import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    imgSource: string;
    sizeWidth: number;
    sizeHeight: number;
};

export default function ImageViewer({ imgSource, sizeWidth, sizeHeight }: Props){
    return <Image source={imgSource} style={{width: sizeWidth, height: sizeHeight}}/>
}