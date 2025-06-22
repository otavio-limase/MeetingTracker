import { Button, Card, Divider } from '@rneui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function verMembro() {
  const item = useLocalSearchParams();
  const { frequencia, grau, id, nome, numero, status } = item;

  const editaMembro = () => {
    console.log("Editar membro");
    console.log(item)
    
    router.push({ pathname: '/editaMembro', params: item});
  };

  const voltar = () => {
    router.back();
  };



  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{nome || "Nome não informado"}</Card.Title>
        <Divider />

        <Row label="Número:" value={numero} />
        <Row label="Grau:" value={grau} />
        <Row label="Frequência:" value={`${frequencia ?? 0}%`} />
        <Row label="Status:" value={status} />

        <Divider style={{ marginVertical: 12 }} />
        <Text style={styles.sectionTitle}>Últimas Participações</Text>
        <Text style={styles.sectionText}>Nenhuma participação registrada recentemente.</Text>

        <Divider style={{ marginVertical: 12 }} />
        <Text style={styles.sectionTitle}>Observações sobre o membro</Text>
        <Text style={styles.sectionText}>Nenhuma observação adicionada.</Text>
      </Card>

      <View style={styles.buttonRow}>
        <Button
          title="Editar"
          onPress={editaMembro}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Voltar"
          type="outline"
          onPress={voltar}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "—"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e8e3",
    padding: 16,
  },
  card: {
    flex: 0.95,
    borderRadius: 12,
    paddingVertical: 24,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 15,
    color: "#222",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    color: "#333",
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 6,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});