import { Button, ListItem } from '@rneui/base';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { excluirReuniao, listarReunioes } from '../components/database/banco';

export default function Principal() {
  const [reunioes, setReunioes] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const data = await listarReunioes();
      setReunioes(data);
    };
    fetchData().catch((erro) => console.log("Problema na listagem:", erro));
  }, []);

  const geraAta = (numero) => {
    Alert.alert("Sucesso!", "Ata de Nº " + numero + " exportada para a pasta 'Minha_Atas'.");
  };

  return (
    <SafeAreaView style={estilo.container}>
      <View style={estilo.section}>
        <Text style={estilo.title}>Meeting Tracker</Text>
        <View style={estilo.buttonContainer}>
          <ThemedButton
            name="rick"
            type="primary"
            textSize={30}
            height={70}
            width={250}
            onPress={() => router.push("/reuniao")}
            backgroundDarker='#65727a'
            backgroundColor='#bec3bc'
            textColor='black'
            backgroundActive='#d7dacf'
            backgroundProgress="gray"
          >Nova Reunião</ThemedButton>

          <ThemedButton
            name="rick"
            type="primary"
            textSize={30}
            height={70}
            width={250}
            onPress={() => router.push("/membros")}
            backgroundDarker='#65727a'
            backgroundColor='#bec3bc'
            textColor='black'
            backgroundActive='#d7dacf'
            backgroundProgress="gray"
            style={estilo.secondButton}
          >Membros</ThemedButton>
        </View>
      </View>

      <View style={estilo.line} />

      <View style={estilo.section2}>


        <FlatList
          data={reunioes}
          extraData={reunioes}
          renderItem={({ item }) =>
            <ListItem.Swipeable
              leftWidth={90}
              rightWidth={90}

              leftContent={(reset) => (
                <Button
                  title="Gerar Ata"
                  onPress={() => { geraAta(item.numero); reset(); }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'gray' }}

                />
              )}
              rightContent={(reset) => (
                <Button
                  title="Excluir"
                  buttonStyle={{ minHeight: '100%', backgroundColor: '#D6184F', fontWeight: 'bold' }}
                  onPress={() => {
                    Alert.alert("Atenção!", "Deseja realmente excluir essa reunião?", [
                      {
                        text: "Sim",
                        onPress: () => {
                          excluirReuniao(item.id);
                          router.replace("/principal");
                          reset();
                        },

                      },
                      {
                        text: "Não",
                        onPress: () => { reset() },
                        style: 'cancel'
                      }
                    ])
                  }}
                  color={"red"}

                  titleStyle={{ fontWeight: "600" }}
                />
              )}
            >
              <ListItem.Content>
                <ListItem.Title style={estilo.listItemTitle}>Nº{item.numero} | {item.local}</ListItem.Title>
                <ListItem.Subtitle style={estilo.listItemSubtitle}>{item.grau}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>}

          keyExtractor={item => item.id}
        />

      </View>
    </SafeAreaView>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e8e3",
  },
  section: {
    flex: 0.5,
  },
  section2: {
    flex: 1,
  },
  title: {
    paddingTop: 10,
    alignSelf: "center",
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 3,
    backgroundColor: 'darkgray',
    width: '100%',
  },
  secondButton: {
    marginTop: 20,
  },
  listItemContainer: {
    backgroundColor: 'white', // Cor de fundo do item
    borderRadius: 10, // Bordas arredondadas
    marginVertical: 5, // Espaçamento vertical entre os itens
    padding: 10, // Espaçamento interno
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  listItemSubtitle: {
    color: 'gray',
  },
});
