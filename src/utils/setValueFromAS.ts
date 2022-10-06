import AsyncStorage from "@react-native-async-storage/async-storage";

export const setValueFromAS = (name: string, data: object)  => {
    AsyncStorage.setItem(name, JSON.stringify(data))
}
