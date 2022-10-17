import AsyncStorage from "@react-native-async-storage/async-storage";

export const getValueFromAS = async (name: string) => {
    const item = await AsyncStorage.getItem(name)
    return item ? JSON.parse(item) : {}
}


