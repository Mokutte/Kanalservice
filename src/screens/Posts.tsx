import React, { useContext, useEffect, useState } from "react";
import { View, VStack, Button, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainContext } from "../context";
import { IPost } from "../models/types";
import axios from "axios";
import { Post } from "../components/Post";
import { removeValueFromAS } from "../utils/removeValueFormAS";

export default function Posts() {
  const { user, setUser, users } = useContext(MainContext);
  const [posts, setPosts] = useState<IPost[]>([]);

  const removeUser = () => {
    removeValueFromAS("user");
    setUser("");
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((response: any) => {
        setPosts(response);
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
      console.log(posts)
  }, []);

  useEffect(() => {
    const result = []
    console.log(posts)
    const selectPosts = posts?.filter(el => el?.userId === 1)
    console.log(selectPosts)
    // for(let i = 1; i < users?.length; i++){
      
    //   console.log(selectPosts)
      // result.push({user: users[i].name, company: users[i].company, title: posts?[count]})
    // }
  }, [posts]);

  return (
    <View bgColor={"#e4b062"}>
      <SafeAreaView>
        <VStack minH={"118px"} w={"100%"} flexDirection={"row"}>
          <Image
            source={require("../img/logo.png")}
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
        <View bgColor={"#fff"} p={"10px"} h={"100%"}>
          {/* {posts?.map((posts) => {
            <Post
              name={posts.name}
              title={posts.title}
              company={posts.company}
            />;
          })} */}
        </View>
      </SafeAreaView>
    </View>
  );
}
