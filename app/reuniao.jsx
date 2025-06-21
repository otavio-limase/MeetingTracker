import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
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
    if (numero && grau && data && local && horarioInicio && horarioFim && topicos && observacoes && membrosParticipantes) {
      console.log("chegou");
      console.log("Inserindo no banco");
      recebido = await inserirReuniao(data, numero, grau, local, horarioInicio, horarioFim, topicos, observacoes, membrosParticipantes);
      Alert.alert("Sucesso!", "Reunião inserida.")
      router.replace({ pathname: '/principal' });
    } else {
      Alert.alert("Atenção!", "Dados inválidos ou em branco.")
    }
  }

  return (
    <SafeAreaView style={estilo.container}>
      <Text style={estilo.title}>Adicionar Reunião</Text>
      <TextInput placeholder="Número" value={numero} onChangeText={setNumero} style={estilo.input} />
      <TextInput placeholder="Grau" value={grau} onChangeText={setGrau} style={estilo.input} />
      <TextInput placeholder="Data" value={data} onChangeText={setData} style={estilo.input} />
      <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={estilo.input} />
      <TextInput placeholder="Horário de Início" value={horarioInicio} onChangeText={setHorarioInicio} style={estilo.input} />
      <TextInput placeholder="Horário de Fim" value={horarioFim} onChangeText={setHorarioFim} style={estilo.input} />
      <TextInput placeholder="Tópicos (X, Y, Z)" value={topicos.join(', ')} onChangeText={(text) => setTopicos(text.split(',').map(num => num.trim()))} style={estilo.input} />
      <TextInput placeholder="Observações" value={observacoes} onChangeText={setObservacoes} style={estilo.input} />
      <TextInput
        placeholder="Números dos participantes (X, Y, Z)"
        value={membrosParticipantes.join(', ')}
        onChangeText={(text) => setMembrosParticipantes(text.split(',').map(num => num.trim()))}
        style={estilo.input}
      />
      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <ThemedButton

          name="rick"
          type="primary"
          textSize={30}
          height={70}
          width={250}
          onPress={chamaBanco}
          backgroundDarker='#65727a'
          backgroundColor='#bec3bc'
          textColor='black'
          backgroundActive='#d7dacf'
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
