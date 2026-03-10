
import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const logStyle= StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        width: "100%"
    },

    page: {
        display: "flex",
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },

    label:{
        color: colors.secondary,
        fontSize: 15
    },

    form: {
        width: "50%",
        maxWidth: 600,
        padding: 20,
        borderRadius: "20px",
        backgroundColor: colors.d_background,
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
    }

});