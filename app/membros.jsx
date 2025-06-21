import { ListItem } from '@rneui/base';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { listarMembros } from '../components/database/banco';

function verMembro(item) {
  router.push({ pathname: '/verMembro', item });

}

export default function membros() {
  const [Membros, setMembros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listarMembros();
      setMembros(data);
    }
    fetchData().then(() => console.log("listagem de membros ok"))
      .catch((erro) => { console.log("problema na listagem:", erro) })
  }, [])
  return (
    <View style={estilo.container}>

      <FlatList
        data={Membros}
        extraData={Membros}
        keyExtractor={(item, index) => item?.id ? String(item.id) : String(index)}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => verMembro(item)}
            bottomDivider
            containerStyle={estilo.listItemContainer}
            key={item.id}
          >
            <ListItem.Content>
              <ListItem.Title style={estilo.listItemTitle}>
                {item.nome} | {item.numero}
              </ListItem.Title>
              <ListItem.Subtitle style={estilo.listItemSubtitle}>
                {item.grau} | Frequência: {item.frequencia} %
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

        )}
      />
    </View>
  )
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e8e3",
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