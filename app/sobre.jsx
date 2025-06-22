import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre</Text>

      <View style={styles.textoContainer}>
        <Text style={styles.texto}>
          Este aplicativo, <Text style={styles.destaque}>Meeting Tracker</Text> (versão 1.0),
          foi desenvolvido como trabalho para a disciplina{' '}
          <Text style={styles.destaque}>“Programação para Dispositivos Móveis”</Text>.
        </Text>

        <Text style={[styles.texto, styles.paragrafo]}>
          O Meeting Tracker <Text style={styles.destaque}>simplifica o registro e o
            acompanhamento de reuniões</Text>:
        </Text>

        <Text style={styles.texto}>
          • adiciona participantes (membros fixos ou convidados);{'\n'}
          • define pautas, horário de início e término;{'\n'}
          • gera automaticamente ata em PDF;{'\n'}
          • mostra relatórios de presença dos últimos 6 meses.
        </Text>

        <Text style={[styles.texto, styles.paragrafo]}>
          Construído em <Text style={styles.destaque}>React Native</Text> com{' '}
          <Text style={styles.destaque}>Expo Router</Text>, o app prioriza
          praticidade em qualquer dispositivo.
        </Text>

        <Text style={styles.texto}>
          Organize, acompanhe e nunca mais perca detalhes das suas reuniões!
        </Text>
      </View>

      <View style={styles.button}>
        <ThemedButton
          name="rick"
          type="primary"
          textSize={24}
          height={60}
          width={250}
          onPress={() => router.push('../')}
          backgroundDarker='#65727a'
          backgroundColor='#bec3bc'
          textColor='black'
          backgroundActive='#d7dacf'
          style={styles.botao}
        >
          Voltar
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8e3',
    padding: 30,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 18,
  },
  textoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  texto: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'justify',
    lineHeight: 26,
  },
  destaque: {
    fontWeight: 'bold',
    color: 'black',
  },
  paragrafo: {
    marginTop: 16,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 50,
  },
  botao: {
    borderRadius: 14,
    paddingVertical: 6,
  },
});
