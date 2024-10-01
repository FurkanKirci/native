import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, ScrollView, FlatList } from "react-native";

export default function Index() {
  const [toDoList, setToDoList] = useState<{ toDo: string }[]>([])
  const [input, setInput] = useState("");
  const handlePressButton = (todo: string) => {
    setToDoList(prevState => [...prevState, { toDo: todo }])
  }
  return (
    <View style={{
      padding: 30,
      flex: 1 //ekran dışına taşan itemleri ekrana getirmek için yapmalısın
    }}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={(e) => setInput(e)} style={styles.input} placeholder="Write Your Note Here"></TextInput>
        <Button onPress={() => handlePressButton(input)} title="Add Note"></Button>
      </View>
      <ScrollView>
        {/* birden fazla ekrana yazdırılan şey var ve ekran taşıyor ise ScrollView kullan */}
        {toDoList?.map((item: { toDo: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => {
          return (
            <Text key={index} style={styles.listItem}>{item.toDo}</Text>
          )
        })}
      </ScrollView>
      <FlatList
        data={toDoList}
        renderItem={(item) => {
          return (
            <Text style={styles.listItem}>{item.item.toDo}</Text>
          )
        }}
      >
      </FlatList>
      {/* FlatList ögeleri dinamik olarak yüklediği için bellek yönetimi daha rahat ve performanslı çalışır
      dinamik ve uzun boyutlu listelemelerde FlatList kullan
      ScrollView listenin tamamını bellekte tutar uzun boyutlu listelerde performans sıkıntısı yaşarsın. */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingBottom: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    fontSize: 20
  },
  listItem: {
    backgroundColor: "green",
    marginVertical: 10,
    padding: 10,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600"
  }
})
