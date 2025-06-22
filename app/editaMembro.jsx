import { Button } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { atualizarMembro, excluirMembro } from "../components/database/banco";

export default function EditarMembro() {
    const item = useLocalSearchParams();

    const [nome, setNome] = useState(item.nome);
    const [numero, setNumero] = useState(item.numero);
    const [grau, setGrau] = useState(item.grau);
    const [status, setStatus] = useState(item.status || "Regular");

    async function chamaBanco() {
        if (numero && grau && nome && status && item.id) {
            await atualizarMembro(item.id, nome, numero, grau, status);
            Alert.alert("Sucesso!", "Membro atualizado.");
            router.replace("/membros");
        } else {
            Alert.alert("Atenção!", "Dados inválidos ou em branco.");
        }
    }

    const confirmarExclusao = () => {
        Alert.alert("Confirmação", "Deseja realmente remover este membro?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir", style: "destructive", onPress: () => {
                    excluirMembro(item.id);
                    Alert.alert("Sucesso!", "O membro "+item.nome+" foi excluido.")
                    router.replace("/membros");

                }
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Editar Membro</Text>

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
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.buttonRow}>
                <Button
                    title="Salvar"
                    onPress={chamaBanco}
                    buttonStyle={[styles.button, styles.saveBtn]}
                    containerStyle={styles.buttonContainer}
                    titleStyle={styles.buttonText}
                />
                <Button
                    title="Excluir"
                    onPress={confirmarExclusao}
                    buttonStyle={[styles.button, styles.deleteBtn]}
                    containerStyle={styles.buttonContainer}
                    titleStyle={styles.buttonText}
                />
            </View>
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
    /* ---------- área dos botões ---------- */
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 100,
        backgroundColor: "#e6e8e3",
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 6,
    },
    button: {
        borderRadius: 14,
        paddingVertical: 12,
    },
    saveBtn: {
        backgroundColor: "#4CAF50",
    },
    deleteBtn: {
        backgroundColor: "#D6184F", // vermelho forte
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
    },
});
