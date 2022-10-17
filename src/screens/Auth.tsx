import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  View,
  Input,
  FormControl,
  VStack,
  Button,
  Text,
  Image,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { IUser, IUsers } from "../models/types";
import axios from "axios";
import { MainContext } from "../context";
import { setValueFromAS } from "../utils/setValueFromAS";

export interface loginForm {
  email: string;
  password: string;
}

export default function Auth() {
  const { setUser, setAuth } = useContext(MainContext);
  const [error, setError] = useState<string>();
  const [users, setUsers] = useState<IUsers[]>();
  const screen = Dimensions.get("screen");

  const breakpoints = {
    sm: 480,
    md: 768,
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const onSubmit = (data: IUser) => {
    const result = users?.filter(
      (el: IUsers) => el.email == data.email && el.website == data.password
    );
    if (result?.length == 0) {
      setError("Invalid password or login");
    } else {
      setAuth(true);
      setValueFromAS("auth", true);
    }
  };

  const { values, errors, handleChange, submitForm } = useFormik<loginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Enter your login"),
      password: yup
        .string()
        .required("Enter your password")
        .min(7, "Enter at least 7 characters")
        .max(16, "The maximum password length is 16 characters"),
    }),
    onSubmit,
  });

  return (
    <View bgColor={"#e4b062"}>
      <SafeAreaView>
        <Box h={"118px"} w={"100%"}>
          <Image
            source={
              screen.width > 768
                ? require("../img/fullLogo.png")
                : require("../img/logo.png")
            }
            my={"auto"}
            marginLeft={"15px"}
            alt="Logo"
          ></Image>
        </Box>
        <View p={"3"} bgColor={"#fff"}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View
              h={"90%"}
              alignItems={"center"}
              justifyContent={["start", "center"]}
            >
              <Box
                width={["100%", "60%"]}
                px={"8"}
                py={"5"}
                borderColor={"#27569C"}
                borderWidth={"3"}
                borderRadius={"6"}
                bgColor={"white"}
              >
                <Text
                  textAlign={"center"}
                  fontWeight={"800"}
                  fontSize={"24px"}
                  color={"#27569C"}
                >
                  Autorization
                </Text>
                <VStack space={3}>
                  <FormControl
                    isInvalid={!!errors?.email}
                    display={"flex"}
                    flexDirection={["column", "row"]}
                    justifyContent={["none", "space-between"]}
                  >
                    <Box height="30px">
                      {errors?.email ? (
                        <FormControl.ErrorMessage
                          w={"100%"}
                          h={"110%"}
                          _text={{
                            fontSize: "24px",
                            fontWeight: "800",
                            color: "#cb1c1c",
                          }}
                        >
                          {errors?.email}
                        </FormControl.ErrorMessage>
                      ) : (
                        <FormControl.Label
                          color={errors?.email ? "#E21F1F" : "black"}
                          w={"100%"}
                          h={"110%"}
                        >
                          <Text fontSize={"24px"} fontWeight={"800"}>
                            {errors?.email || "login"}
                          </Text>
                        </FormControl.Label>
                      )}
                    </Box>
                    <Input
                      onChangeText={handleChange("email")}
                      value={values.email}
                      borderColor={"#27569C"}
                      borderWidth={"3"}
                      borderRadius={"6"}
                      bgColor={"#D9D9D9"}
                      mt={"10px"}
                      fontWeight={"800"}
                      w={["100%", "65%"]}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors?.password}
                    display={"flex"}
                    flexDirection={["column", "row"]}
                    justifyContent={["none", "space-between"]}
                  >
                    <Box height="30px">
                      {errors?.password ? (
                        <FormControl.ErrorMessage
                          w={"100%"}
                          h={"110%"}
                          _text={{
                            fontSize: "24px",
                            fontWeight: "800",
                            color: "#cb1c1c",
                          }}
                        >
                          {errors?.password}
                        </FormControl.ErrorMessage>
                      ) : (
                        <FormControl.Label
                          color={errors?.password ? "#E21F1F" : "black"}
                          w={"100%"}
                          h={"110%"}
                        >
                          <Text fontSize={"24px"} fontWeight={"800"}>
                            {errors?.email || "password"}
                          </Text>
                        </FormControl.Label>
                      )}
                    </Box>
                    <Input
                      secureTextEntry={true}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      borderColor={"#27569C"}
                      borderWidth={"3"}
                      borderRadius={"6"}
                      bgColor={"#D9D9D9"}
                      mt={"10px"}
                      w={["100%", "65%"]}
                    />
                  </FormControl>
                  {error && <Text fontWeight={"800"}>{error}</Text>}
                  <Button
                    m="auto"
                    w="213px"
                    onPress={submitForm}
                    bg="#e4b062"
                    borderRadius={"5px"}
                    _text={{
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "black",
                    }}
                  >
                    Submit
                  </Button>
                </VStack>
              </Box>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </View>
  );
}
