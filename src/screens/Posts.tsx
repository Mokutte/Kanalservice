import { useContext, useEffect, useState } from "react";
import { View, VStack, Button, Image, FlatList } from "native-base";
import { MainContext } from "../context";
import { IPost } from "../models/types";
import axios from "axios";
import { Post } from "../components/Post";
import { removeValueFromAS } from "../utils/removeValueFormAS";
import { Dimensions } from "react-native";

export default function Posts() {
  const { user, setAuth, users } = useContext(MainContext);
  const [posts, setPosts] = useState<IPost[]>();
  const screen = Dimensions.get("screen");

  const removeUser = () => {
    removeValueFromAS("auth");
    setAuth("");
  };

  const getPosts = async () => {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result: IPost[] = [];
      for (let i = 0; i < users?.length; i++) {
        const selectPosts = resp.data?.filter((el: IPost) => el?.userId === i);
        result.push({
          name: users[i].name,
          company: users[i].company.name,
          title: selectPosts[0]?.title,
        });
      }
      setPosts(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [users]);
  const postItem = ({ item }: any) => (
    <Post name={item.name} title={item.title} company={item.company} />
  );

  return (
    <View bgColor={"#e4b062"} flex={1}>
      <VStack minH={"118px"} w={"100%"} flexDirection={"row"} safeArea>
        <Image
          source={
            screen.width > 768
              ? require("../img/fullLogo.png")
              : require("../img/logo.png")
          }
          my={"auto"}
          marginLeft={"15px"}
          marginRight={"auto"}
          alt="Logo"
        ></Image>
        <Button colorScheme={"none"} onPress={removeUser}>
          <Image
            source={require("../img/backButton.png")}
            my={"auto"}
            marginRight={"15px"}
            alt="Back button"
          ></Image>
        </Button>
      </VStack>

      <FlatList
        numColumns={screen.width > 768 ? 2 : 1}
        bgColor={"#ffffff"}
        px={"10px"}
        data={posts}
        contentContainerStyle={{ paddingBottom: 20, marginTop: 5 }}
        renderItem={postItem}
        keyExtractor={(posts, index) => index.toString()}
      ></FlatList>
    </View>
  );
}
