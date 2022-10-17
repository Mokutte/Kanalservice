import React from "react";
import { Box, Text } from "native-base";
import { IPost } from "../models/types";
import { Dimensions } from "react-native";

export const Post = (props: IPost) => {
  const screen = Dimensions.get("screen");
  return (
    <Box
      p={screen.width > 767 ? "25px" : "15px"}
      my={screen.width > 767 ? "4px" : "5px"}
      m={screen.width > 767 ? "4px" : "0px"}
      w={screen.width > 767 ? "49%" : "100%"}
      bgColor={"#fff"}
      borderColor={"#27569C"}
      borderWidth={"3"}
      borderRadius={"6"}
      shadow={3}
    >
      <Text
        fontSize={"16px"}
        fontWeight={"800"}
        lineHeight={"19px"}
        mb={"17px"}
      >
        Autor: {props.name}
      </Text>
      <Text
        fontSize={"16px"}
        fontWeight={"800"}
        lineHeight={"19px"}
        mb={"17px"}
      >
        Company: {props.company}
      </Text>
      <Text fontSize={"16px"} fontWeight={"800"} lineHeight={"19px"}>
        Title: {props.title}
      </Text>
    </Box>
  );
};
