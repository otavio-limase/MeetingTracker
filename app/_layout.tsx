import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from "expo-router";
import { View } from "react-native";


export default function Pilha() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} />

      <Stack.Screen
        name="principal"
        options={{ headerShown: false }} />

      <Stack.Screen
        name="sobre"
        options={{ headerShown: false }} />

      <Stack.Screen
        name="membros"
        options={{
          title: "Lista de Membros",
          headerLeft: () => (
            <View
              style={{ width: 60, height: 50}}>
              <AntDesign
                name="arrowleft"
                size={46}
                color="gray"
                onPress={() => router.back()}
              />
            </View>),

          headerRight: () => (
            <View
              style={{ width: 50, height: 50 }}>
              <AntDesign
                name="pluscircleo"
                size={46}
                color="gray"
                onPress={() => router.replace('../adicionaMembro')}
              />
            </View>)
        }} />

      <Stack.Screen
        name="adicionaMembro"
        options={{ headerShown: false }} />

      <Stack.Screen
        name="reuniao"
        options={{ headerShown: false }} />
      <Stack.Screen
        name="verMembro"
        options={{ headerShown: false }} />
      <Stack.Screen
        name="editaMembro"
        options={{ headerShown: false }} />
    </Stack>
  )
}