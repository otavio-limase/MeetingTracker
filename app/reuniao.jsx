import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { inserirReuniao } from '../components/database/banco';

export default function Reuniao() {
  const [numero, setNumero] = useState('');
  const [grau, setGrau] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const [topicos, setTopicos] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [membrosParticipantes, setMembrosParticipantes] = useState([]);

  async function chamaBanco() {
    if (
      numero &&
      grau &&
      data &&
      local &&
      horarioInicio &&
      horarioFim &&
      topicos.length &&
      observacoes &&
      membrosParticipantes.length
    ) {
      await inserirReuniao(
        data,
        numero,
        grau,
        local,
        horarioInicio,
        horarioFim,
        topicos,
        observacoes,
        membrosParticipantes
      );
      Alert.alert('Sucesso!', 'Reunião inserida.');
      router.replace('/principal');
    } else {
      Alert.alert('Atenção!', 'Dados inválidos ou em branco.');
    }
  }

  return (
    <SafeAreaView style={estilo.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={estilo.scroll}>
          <Text style={estilo.title}>Adicionar Reunião</Text>

          <TextInput
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            style={estilo.input}
          />
          <TextInput
            placeholder="Grau"
            value={grau}
            onChangeText={setGrau}
            style={estilo.input}
          />
          <TextInput
            placeholder="Data"
            value={data}
            onChangeText={setData}
            style={estilo.input}
          />
          <TextInput
            placeholder="Local"
            value={local}
            onChangeText={setLocal}
            style={estilo.input}
          />
          <TextInput
            placeholder="Horário de Início"
            value={horarioInicio}
            onChangeText={setHorarioInicio}
            style={estilo.input}
          />
          <TextInput
            placeholder="Horário de Fim"
            value={horarioFim}
            onChangeText={setHorarioFim}
            style={estilo.input}
          />
          <TextInput
            placeholder="Tópicos (X, Y, Z)"
            value={topicos.join(', ')}
            onChangeText={(text) =>
              setTopicos(text.split(',').map((t) => t.trim()))
            }
            style={estilo.input}
          />
          <TextInput
            placeholder="Observações"
            value={observacoes}
            onChangeText={setObservacoes}
            style={estilo.input}
            multiline
          />
          <TextInput
            placeholder="Números dos participantes (X, Y, Z)"
            value={membrosParticipantes.join(', ')}
            onChangeText={(text) =>
              setMembrosParticipantes(text.split(',').map((n) => n.trim()))
            }
            style={estilo.input}
          />

          <View style={estilo.botaoWrapper}>
            <ThemedButton
              name="rick"
              type="primary"
              textSize={20}
              height={60}
              width={240}
              onPress={chamaBanco}
              backgroundDarker="#65727a"
              backgroundColor="#bec3bc"
              textColor="black"
              backgroundActive="#d7dacf"
              borderRadius={14}
            >
              Salvar
            </ThemedButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8e3',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c2c5be',
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: '#f9faf8',
    fontSize: 16,
  },
  botaoWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
});
