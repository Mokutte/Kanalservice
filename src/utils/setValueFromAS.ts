import AsyncStorage from "@react-native-async-storage/async-storage";

export const setValueFromAS = (name: string, data: any)  => {
    AsyncStorage.setItem(name, JSON.stringify(data))
}
