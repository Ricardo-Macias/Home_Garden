import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity ,Text, Modal } from 'react-native';
import ModalSensor from "@/components/ModalSensor"

export default function ButtonAddSensor(){
  const [modalVisible, setModalVisible] = useState(false);

  const onModalClose = () => {
    setModalVisible(false);
  };

  const onModalOpen = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.buttonAdd} onPress={onModalOpen}>
        <MaterialIcons name='add' size={28} color="#f9f9f9"></MaterialIcons>
      </TouchableOpacity>

      <ModalSensor 
      isVisible={modalVisible}
      onClose={onModalClose}>
        <></>
      </ModalSensor>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  buttonAdd: {
    backgroundColor: "#6a1b9a",
    position: "absolute",
    bottom: 5,
    right: 15,
    borderRadius: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  viewModel: {
    width: "100%",
    height: "25%",
    borderRadius: 25,
    backgroundColor: "#000",
  },
  buttonLabel: {
    color: "#000",
    fontSize: 16,  
  },
});
