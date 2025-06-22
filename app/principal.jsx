import { Button, ListItem } from '@rneui/base';
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { router } from 'expo-router';
import * as Sharing from "expo-sharing";
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import ataHTML from "../app/ata/ataTemplate";
import { excluirReuniao, listarReunioes } from '../components/database/banco';

export default function Principal() {
  const [reunioes, setReunioes] = useState([]);

  const carregarReunioes = async () => {
    try {
      const data = await listarReunioes();
      setReunioes(data);
    } catch (erro) {
      console.log("Problema na listagem:", erro);
    }
  };

  useEffect(() => {
    carregarReunioes();
  }, []);

 const ensureDir = async () => {
    const dir = FileSystem.documentDirectory + "Minhas_Atas";
    const dirInfo = await FileSystem.getInfoAsync(dir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
    return dir;
  };

  
  const geraAta = async (reuniao) => {
    try {
      const html = ataHTML(reuniao);

     
      const { uri } = await Print.printToFileAsync({ html });

      
      const dir = await ensureDir();
      const dest = `${dir}/Ata_${reuniao.numero}.pdf`;
      await FileSystem.moveAsync({ from: uri, to: dest });

      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(dest, {
          dialogTitle: `Enviar Ata Nº ${reuniao.numero}`,
        });
      }

      Alert.alert(
        "Sucesso!",
        `Ata Nº ${reuniao.numero} salva em Minhas_Atas.`
      );
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível gerar a ata.");
    }
  };

  const confirmarExclusao = (id, reset) => {
    Alert.alert("Atenção!", "Deseja realmente excluir essa reunião?", [
      {
        text: "Sim",
        onPress: async () => {
          await excluirReuniao(id);
          carregarReunioes();
          reset();
        },
      },
      {
        text: "Não",
        onPress: () => reset(),
        style: 'cancel',
      }
    ]);
  };

  return (
    <SafeAreaView style={estilo.container}>
      <View style={estilo.section}>
        <Text style={estilo.title}>Meeting Tracker</Text>
        <View style={estilo.buttonContainer}>
          <ThemedButton
            name="rick"
            type="primary"
            textSize={25}
            height={60}
            width={240}
            onPress={() => router.push("/reuniao")}
            backgroundDarker='#65727a'
            backgroundColor='#bec3bc'
            textColor='black'
            backgroundActive='#d7dacf'
            style={estilo.botao}
          >
            Nova Reunião
          </ThemedButton>

          <ThemedButton
            name="rick"
            type="primary"
            textSize={25}
            height={60}
            width={240}
            onPress={() => router.push("/membros")}
            backgroundDarker='#65727a'
            backgroundColor='#bec3bc'
            textColor='black'
            backgroundActive='#d7dacf'
            style={estilo.botao}
          >
            Membros
          </ThemedButton>
        </View>
      </View>

      <View style={estilo.line} />

      <View style={estilo.section2}>
        {reunioes.length === 0 ? (
          <Text style={estilo.vazioTexto}>Nenhuma reunião cadastrada.</Text>
        ) : (
          <FlatList
            data={reunioes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={estilo.swipeWrapper}>
                <ListItem.Swipeable
                  leftWidth={90}
                  rightWidth={90}
                  containerStyle={estilo.listItemBase}
                  leftContent={(reset) => (
                    <Button
                      title="Gerar Ata"
                      onPress={() => { geraAta(item); reset(); }}
                      buttonStyle={{ minHeight: '100%', backgroundColor: '#6c757d' }}
                      titleStyle={{ fontSize: 15 }}
                    />
                  )}
                  rightContent={(reset) => (
                    <Button
                      title="Excluir"
                      onPress={() => confirmarExclusao(item.id, reset)}
                      buttonStyle={{ minHeight: '100%', backgroundColor: '#D6184F' }}
                      titleStyle={{ fontWeight: '600', fontSize: 15}}
                    />
                  )}
                >
                  <ListItem.Content>
                    <ListItem.Title style={estilo.listItemTitle}>
                      Nº {item.numero} | {item.local}
                    </ListItem.Title>
                    <ListItem.Subtitle style={estilo.listItemSubtitle}>
                      {item.grau}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem.Swipeable>
              </View>
            )}
          />
        )}
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  section2: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  title: {
    alignSelf: "center",
    fontWeight: 'bold',
    fontSize: 36,
    color: '#2c2c2c',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 10,
  },
  botao: {
    borderRadius: 14,
  },
  line: {
    height: 3,
    backgroundColor: 'darkgray',
    width: '100%',
    marginBottom: 10,
  },
  swipeWrapper: {
    marginVertical: 6,
    borderRadius: 12,
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  listItemBase: {
    backgroundColor: 'white',
    padding: 10,
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  listItemSubtitle: {
    color: 'gray',
    fontSize: 16,
  },
  vazioTexto: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#555',
  },
});
