
import { Botonera, Button, Input } from "@/components";
import { icons } from "@/constants/icons";
import { login } from "@/services/api/usuarios";
import { logStyle } from "@/styles/gloabalStyle";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";


// MAnejod e estados para componentes cambiantes
import { useModal } from "@/hooks/useModal";
import { useState } from "react";


export default function LogPage() {
    const router = useRouter();
    const { showModal } = useModal();


    //Variable de estado para el manejo de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Estados para los inputs de email y pasword
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Variables de estado para Los mensajes de error
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    //Variabl4es de estado para la carga validacion y error de los datos con la API
    const [loading, setLoading] = useState(false);
    const [errorGeneral, setErrorGeneral] = useState("");

    async function loginAPI() {
      try {
        setLoading(true);
        setErrorGeneral("");

        /*
        const response = await fetch("http://127.0.0.1:8020/api/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }

        const data = await response.json();
        console.log("Usuario logueado:", data.user);

        return data; */

        //FUNcionalidad nueva con fetchAPI y apiBuilder
        const data = await login(email, password);

        console.log("Usuario logueado:", data.data?.user);

        if (data.success) {

          showModal({
            type: "success",
            title: "Login correcto",
            message: `Bienvenido, ${data.data?.user.name ?? data.data?.user.email}`,
          });

          // router.push("/screens/TestInput");
        } else {
          // setErrorGeneral(data.message);
          showModal({
            type: "error",
            title: "Error al iniciar sesión",
            message: data.message,
          });
        }

        return data;

      } catch (error: any) {
        // setErrorGeneral(error.message);
        showModal({
          type: "error",
          title: "Error al iniciar sesión",
          message: error.message,
        });
        return null;

      } finally {
        setLoading(false);
      }
    }


    //Funcion de validación
    async function validacionForm(){
        let valido = true;

        //Vaciamos errores
        setErrorEmail("");
        setErrorPassword("");

        //validar el correo
        if (!email.includes("@") || !email.includes(".")) {
            setErrorEmail("El correo no es válido");
            valido = false;
        }

        //Validar contraseña
        if (password.length < 6) {
            setErrorPassword("La contraseña debe tener al menos 6 caracteres");
            valido = false;
        }

        if (!valido) return;

        //ACCION SI TODO OK

        const resultado = await loginAPI();

        if (resultado && resultado.success) {
            router.replace("/(tabs)");
        }

    }

    return (
        <View style={logStyle.form}>
            <Text style={logStyle.title}>Inicio de Sesión</Text>
            {errorGeneral !== "" && (
                <Text style={{ color: "red", marginBottom: 10 }}>{errorGeneral}</Text>
            )}

            <Input 
                label="Correo" 
                placeholder="Correo Electrónico"
                iconLeft={icons.mail}
                
                // Asociamos la variable de estado al input
                value={email}
                // Metemos cuando se modifique el input
                onChangeText={setEmail}
                //Asociamos el error en caso de haberlo
                error={errorEmail}
            />

            <Input 
                label="Contraseña" 
                placeholder="Contraseña..."
                iconLeft={icons.lock}
                secureTextEntry={!showPassword}

                // Asociamos la variable de estado al input
                value={password}
                // Metemos cuando se modifique el input
                onChangeText={setPassword}
                //Asociamos el error en caso de haberlo
                error={errorPassword}
            />

            <Botonera>
                <Button title="Iniciar Sesión" onPress= {validacionForm} type="primary" />     
                <Button title="Resetear contraseña" onPress= {()=>123}/>
            </Botonera>
        </View>
    );
}
