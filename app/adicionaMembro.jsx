import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedButton } from "react-native-really-awesome-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { inserirMembro } from "../components/database/banco";

export default function Reuniao() {
    const [nome, setNome] = useState("");
    const [numero, setNumero] = useState("");
    const [grau, setGrau] = useState("");
    const [status, setStatus] = useState("Regular");

    async function chamaBanco() {
        if (numero && grau && nome && status) {
            await inserirMembro(nome, numero, 0, grau, status);
            Alert.alert("Sucesso!", "Membro inserido.");
            router.replace("/membros");
        } else {
            Alert.alert("Atenção!", "Dados inválidos ou em branco.");
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Adicionar Membro</Text>

                        <TextInput
                            placeholder="Nome"
                            value={nome}
                            onChangeText={setNome}
                            style={styles.input}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            placeholder="Número"
                            value={numero}
                            onChangeText={setNumero}
                            style={styles.input}
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            placeholder="Grau"
                            value={grau}
                            onChangeText={setGrau}
                            style={styles.input}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            placeholder="Status"
                            value={status}
                            onChangeText={setStatus}
                            style={styles.input}
                            placeholderTextColor="#888"
                        />

                        <View style={{ alignSelf: "center" }}>
                            <ThemedButton
                                name="rick"
                                type="primary"
                                textSize={20}
                                style={{ marginTop: 24 }}
                                height={56}
                                width={240}
                                onPress={chamaBanco}
                                backgroundDarker="#65727a"
                                backgroundColor="#bec3bc"
                                textColor="#000"
                                backgroundActive="#d7dacf"
                                backgroundProgress="gray"
                                borderRadius={14}
                            >
                                Salvar
                            </ThemedButton>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#e6e8e3",
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 24,
        color: "#333",
    },
    input: {
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#c2c5be",
        paddingHorizontal: 14,
        marginBottom: 16,
        backgroundColor: "#f9faf8",
        fontSize: 16,
    },
});
