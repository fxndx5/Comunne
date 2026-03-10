// Importamos los elementos propios para modificarlos despues
import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { colors } from "../constants/colors";

//Declaramos fuera para no sobrecargar los parametros de tipos
//importante el mismo nombre
type Props = {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
} & TextInputProps;

export default function Input({ label, iconLeft, iconRight, error, ...props }: Props) {
  return (
    <View style={styles.form}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputContainer, error && styles.inputError]}>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}

        <TextInput
          style={styles.input} 
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"               // ← elimina borde azul Android
          selectionColor="transparent"                      // ← elimina highlight iOS
          onFocus={(e) => {
            if (Platform.OS === "web") {                    // ← elimina borde en Web
              // @ts-ignore
              e.target.style.outline = "none";
            }
          }}
          onBlur={(e) => {
            if (Platform.OS === "web") {
              // @ts-ignore
              e.target.style.outline = "none";
            }
          }}
          {...props}
        />


        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
    
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    width: "100%",
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 4,
    marginBottom: 6,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.l_background,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.error + "11",
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },

  iconLeft: {
    marginRight: 8,
  },

  iconRight: {
    marginLeft: 8,
  },

  errorText: {
    marginTop: 4,
    color: colors.error,
    fontSize: 13,
    marginLeft: 4,
  },
});
