import { router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { criarBanco } from '../components/database/banco';

export default function index() {
    const RouterIniciar = (release) => {
        setTimeout(release, 150);
        criarBanco();
        setTimeout(() => router.push("/principal"), 160);
    }
    return (
        <View style={estilo.container}>
            <Image style={estilo.imagem} source={require("../assets/images/Logo.png")} />
            <View style={estilo.button}>
                <ThemedButton
                    progress name="rick"
                    type="primary"
                    textSize={30}
                    height={70}
                    width={250}
                    onPress={RouterIniciar}
                    backgroundDarker='#65727a'
                    backgroundColor='#bec3bc'
                    textColor='black'
                    backgroundActive='#d7dacf'
                    backgroundProgress="gray"
                >Iniciar</ThemedButton>
            </View>
            <View style={estilo.button}>
                <ThemedButton
                    name="rick"
                    type="primary"
                    textSize={30}
                    height={70}
                    width={250}
                    onPress={() => router.push("/sobre")}
                    backgroundDarker='#65727a'
                    backgroundColor='#bec3bc'
                    textColor='black'
                    backgroundActive='#d7dacf'
                >Sobre</ThemedButton>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#e6e8e3",
    },

    imagem: {


        alignSelf: "center",
        marginTop: 100,
        width: 500,
        height: 500,

    },
    button: {
        alignSelf: "center",
        marginBottom: 16,
        flex: 0.15,
        paddingTop: 50
    },

})