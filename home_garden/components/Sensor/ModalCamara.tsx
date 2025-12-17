import { useState, useRef } from "react";
import { CameraType, FlashMode, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import Button from "../Image/ImageButton";


type Props = {
    isVisible: boolean;
    onClose: () => void;
}

export default function ModalCamara({isVisible, onClose}: Props){
    const [image, setImage] = useState<string | null>(null);
    const [type, setType] = useState<CameraType>("back");
    const [flash, setFlash] = useState<FlashMode>("off");
    const cameraRef = useRef<CameraView>(null);
    const formData = new FormData();

    const takePicture = async () => {
        if(cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch(err) {
                console.log(err);
            }
        }
    }
    
    const saveImage = async () => {
        if(image) {
            try{
                await MediaLibrary.createAssetAsync(image);
                setImage(null);
            } catch(err){
                console.log(err);
            }
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} >
            <View style={styles.container}>
                {!image ? 
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 30,
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
                <Image source={{uri: image}} style={styles.camera}/>
                }
                <View>
                    { image ? 
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
                            onPress={() => setImage(null)} />
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