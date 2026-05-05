import React, { useState, useRef, useEffect } from "react";
import { CameraType, FlashMode, CameraView } from "expo-camera";
import Constants from "expo-constants";
import {
    Modal,
    View,
    BackHandler,
    StyleSheet,
    Image,
} from "react-native";
import Button from "../Image/ImageButton";

interface AppConfig {
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

type Props = {
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    isVisible: boolean;
    onClose: () => void;
}

export default function ModalCamara({ setImage, isVisible, onClose}: Props){
    const [url, setUrl] = useState<string | null>(null);
    const [type, setType] = useState<CameraType>("back");
    const [flash, setFlash] = useState<FlashMode>("off");
    const cameraRef = useRef<CameraView>(null);

    const takePicture = async () => {
        if(cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setUrl(data.uri);
            } catch(err) {
                console.log(err);
            }
        }
    }
    
    const saveImage = async () => {
        const formData = new FormData();

        formData.append("file", {
            uri: url,
            name: "photo.jpg",
            type: "image/jpeg",
        } as any);

        if(url) {
            try{
                const response = await fetch(`${config.API_URL}/upload`,{
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                
                const data = await response.json();
                setImage(data.url); //`${config.API_URL}/uploads/${data.filename}`
                setUrl(null);
                onClose();
            } catch(err){
                console.log("Error al subir imagen ",err);
            }
        }
    }

    useEffect(() => {
        if (!isVisible) return;

        const backAction = () => {
            onClose();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [isVisible]);

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.container}>
                {!url ? 
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                    }}>
                        <Button  
                            color="#f1f1f1" 
                            label="" 
                            icon="retweet" 
                            theme="camera" onPress={() => {setType(type === "back" ? "front" : "back" )
                            }} />
                        <Button 
                            color={flash === "off" ? "gray" : "#f1f1f1"}
                            label="" 
                            icon="flash" 
                            theme="camera" 
                            onPress={() => {setFlash(flash === "off" ? "on" : "off")
                        }} />
                    </View>
                    <CameraView
                        facing={type}
                        style={styles.camera}
                        flash={flash}
                        ref={cameraRef}
                    >
                        
                    </CameraView>
                </View>
                :
                <Image source={{uri: url}} style={styles.camera}/>
                }
                <View>
                    { url ? 
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 50
                    }}>
                        <Button 
                            color= "#f1f1f1"
                            label="Re-take" 
                            icon="retweet" 
                            theme="camera" 
                            onPress={() => setUrl(null)} />
                        <Button 
                            color="#f1f1f1"
                            label="Save" 
                            icon="check" 
                            theme="camera" 
                            onPress={saveImage} />
                    </View>
                    :
                    <Button
                        color="#f1f1f1"
                        label="Take a picture" 
                        icon="camera" 
                        theme="camera" 
                        onPress={takePicture}/>
                    }
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 20,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    }
})