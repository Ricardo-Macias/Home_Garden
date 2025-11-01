import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

//type Props = {
//  label: string;
//}

export default function Bottton(){//{ label }: Props) {
  const loginWithFacebook = () => {
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, {backgroundColor: "#00913f", borderWidth: 1, borderColor:"#00"}]}
        onPress={() => alert("YOU PRESSED A BUTTON.")}
      > <FontAwesome 
        name="plus"
        size={18}
        color="#25292e"
      />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  button: {
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
  buttonLabel: {
    color: "#000",
    fontSize: 16,  
  },
});
