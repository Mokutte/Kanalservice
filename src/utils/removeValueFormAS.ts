import AsyncStorage from "@react-native-async-storage/async-storage"

export const removeValueFromAS = async (key : string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log("Error remove")
    }
  }