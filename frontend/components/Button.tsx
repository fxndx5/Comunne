import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../constants/colors";

export default function Button({ title, onPress, type = "default", }: { title: string; onPress: () => void;type?: "primary" | "secondary" | "cancel" | "default"; }){

    let v: StyleProp<ViewStyle>;

    switch(type){
        case "primary":
            v = style.primary;
        break;
        case "cancel":
            v = style.cancel;
        break;
        case "secondary":
            v = style.secondary;
        break;
        default:
            v= style.button;
    }


    return (
        <TouchableOpacity style={[style.button, v]} onPress={onPress}>
            <Text style={style.textBtt}>{title}</Text>
        </TouchableOpacity>
    );
}

const style= StyleSheet.create({
    button: {
        flex: 1,  
        backgroundColor: colors.l_background,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        alignItems: "center",

    },

    textBtt: {
        color: colors.text,
        fontSize: 15,
    },

    secondary:{
        backgroundColor: colors.secondary,
    },
    
    cancel: {
        backgroundColor: colors.error,
    },

    primary: {
        backgroundColor: colors.primary,
    }
});