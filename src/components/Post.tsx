import React from "react";
import {
  Box,
  Text,
} from "native-base";
import { IPost } from "../models/types";

export function Post(props : IPost) {
  return (
    <Box
      p={"15px"}
      w={"100%"}
      bgColor={"#fff"}
      borderColor={"#27569C"}
      borderWidth={"3"}
      borderRadius={"6"}
    >
      <Text fontSize={"16px"} fontWeight={"800"} lineHeight={"19px"} mb={"17px"}>Autor:{props.name}</Text>
      <Text fontSize={"16px"} fontWeight={"800"} lineHeight={"19px"} mb={"17px"}>Company: {props.company}</Text>
      <Text fontSize={"16px"} fontWeight={"800"} lineHeight={"19px"}>Title: {props.title}</Text>
    </Box>
  );
}
