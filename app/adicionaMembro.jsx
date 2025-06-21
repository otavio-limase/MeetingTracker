import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { inserirMembro } from '../components/database/banco';

export default function Reuniao() {
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [grau, setGrau] = useState('');
    const [status, setStatus] = useState('Regular');

   

    async function chamaBanco() {
        console.log("chegou");
        console.log("Inserindo no banco");
        recebido = await inserirMembro(nome, numero, 0, grau, status);
        Alert.alert("Sucesso!", "Membro inserido.")
        router.replace("/membros");
    }

    return (
        <SafeAreaView style={estilo.container}>
            <Text style={estilo.title}>Adicionar/Editar Membro</Text>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={estilo.input} />
            <TextInput placeholder="Número" value={numero} onChangeText={setNumero} style={estilo.input} />
            <TextInput placeholder="Grau" value={grau} onChangeText={setGrau} style={estilo.input} />
            <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={estilo.input} />
            
            <View style={{ alignSelf: "center", marginTop: 20 }}>
                <ThemedButton
                    progress name="rick"
                    type="primary"
                    textSize={30}
                    height={70}
                    width={250}
                    onPress={chamaBanco}
                    backgroundDarker='#65727a'
                    backgroundColor='#bec3bc'
                    textColor='black'
                    backgroundActive='#d7dacf'
                    backgroundProgress="gray"
                >Salvar</ThemedButton></View>
        </SafeAreaView>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e6e8e3',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
