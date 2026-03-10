import { useState } from "react";
import { Text, View } from "react-native";
import { Botonera, Button, Checkbox, IconButton, Input, Select } from "@/components";
import { icons } from "@/constants/icons";
import { logStyle } from "@/styles/gloabalStyle";

export default function TestInput() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={logStyle.form}>
      <Text style={logStyle.title}>Prueba del Input</Text>

      <Input placeholder="Escribe algo aquí..." label="Label 1" />

      <Input
        label="Email"
        placeholder="ejemplo@mail.com"
        iconLeft={icons.mail}
      />

      <Input
        label="Usuario"
        placeholder="Tu nombre"
        iconLeft={icons.user}
      />

      <Input
        label="Contraseña"
        placeholder="••••••"
        secureTextEntry={!showPassword}
        iconLeft={icons.lock}
        iconRight={
          <IconButton
            icon={showPassword ? icons.eyeOff : icons.eye}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Select
        label="Label 2"
        options={["Option1", "Option2", "Option3"]}
        value={"Value"}
        onChange={() => 123}
      />

      <Checkbox
        label="Acepto los términos"
        value={false}
        onChange={() => true}
      />

      <Botonera>
        <Button title="Primario" onPress={() => 123} />
        <Button title="Secundario" onPress={() => 123} type="secondary" />
        <Button title="Cancelar" onPress={() => 123} type="cancel" />
      </Botonera>
    </View>
  );
}
