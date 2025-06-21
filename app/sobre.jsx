import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

export default function Sobre() {


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre</Text>

      <Text style={styles.texto}>
        Este aplicativo, <Text style={styles.destaque}>Meeting Tracker</Text> (versão 1.0),
        foi desenvolvido como trabalho para a disciplina{' '}
        <Text style={styles.destaque}>“Programação para Dispositivos Móveis”</Text>.{'\n\n'}
        O Meeting Tracker <Text style={styles.destaque}>simplifica o registro e o
          acompanhamento de reuniões</Text>:{'\n'}
        • adiciona participantes (membros fixos ou convidados);{'\n'}
        • define pautas, horário de início e término;{'\n'}
        • gera automaticamente ata em PDF;{'\n'}
        • mostra relatórios de presença dos últimos 6 meses.{'\n\n'}
        Construído em <Text style={styles.destaque}>React Native</Text> com{' '}
        <Text style={styles.destaque}>Expo Router</Text>, o app prioriza
        praticidade em qualquer dispositivo.{'\n\n'}
        Organize, acompanhe e nunca mais perca detalhes das suas reuniões!
      </Text>

      <View style={styles.button}>
        <ThemedButton
          name="rick"
          type="primary"
          textSize={30}
          height={70}
          width={250}
          onPress={() => router.push('../')}
          backgroundDarker='#65727a'
          backgroundColor='#bec3bc'
          textColor='black'
          backgroundActive='#d7dacf'
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
    backgroundColor: '#e6e8e3',   // mais claro da paleta
    padding: 30,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    color: 'black',              // mais escuro para contraste
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 18,
  },
  texto: {
    fontSize: 18,
    color: '#1C1C1C',
    textAlign: 'justify',
  },
  destaque: {
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    marginVertical: 50,
  },
});
