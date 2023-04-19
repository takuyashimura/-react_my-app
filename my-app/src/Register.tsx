import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text } from "@chakra-ui/react";

type registerInput = {
    name: string;
    email: string;
    password: string;
    error_list: any;
};

function Register() {
    const navigation = useNavigate();

    const [registerInput, setRegister] = useState<registerInput>({
        name: "",
        email: "",
        password: "",
        error_list: [],
    });

    const handleInput = (e: any) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e: any) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`/api/register`, data).then((res) => {
                console.log("res.data", res.data);
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    swal("Success", res.data.message, "success");
                    navigation("/");
                } else {
                    setRegister({
                        ...registerInput,
                        error_list: res.data.validation_errors,
                    });
                }
            });
        });
    };
    console.log("registerInput.error_list", registerInput.error_list);

    return (
        <>
            <Box
                mt={"50px"}
                className="container"
                display={"flex"}
                justifyContent={"center"}
            >
                <Box
                    display={"flex"}
                    borderRadius={"8px"}
                    justifyContent={"center"}
                    width={"75%"}
                >
                    <Box width={"100%"}>
                        <form onSubmit={registerSubmit}>
                            {" "}
                            <Box textAlign={"center"} mb={"10px"}>
                                <Text fontSize={"30px"}>ユーザー登録</Text>
                            </Box>
                            {registerInput.error_list.name ? (
                                <>
                                    <Box display="flex" alignItems="center">
                                        <Input
                                            textAlign={"center"}
                                            type=""
                                            placeholder="name"
                                            name="name"
                                            onChange={handleInput}
                                            value={registerInput.name}
                                        />
                                    </Box>
                                    <Text color="red.300">
                                        {registerInput.error_list.name}
                                    </Text>
                                </>
                            ) : (
                                <Box display="flex" alignItems="center">
                                    <Input
                                        textAlign={"center"}
                                        mb={"24px"}
                                        type=""
                                        placeholder="name"
                                        name="name"
                                        onChange={handleInput}
                                        value={registerInput.name}
                                    />
                                </Box>
                            )}
                            {registerInput.error_list.email ? (
                                <>
                                    <Box display="flex" alignItems="center">
                                        <Input
                                            textAlign={"center"}
                                            float={"right"}
                                            type=""
                                            placeholder="email"
                                            name="email"
                                            onChange={handleInput}
                                            value={registerInput.email}
                                        />
                                    </Box>
                                    <Text color="red.300">
                                        {registerInput.error_list.email}
                                    </Text>
                                </>
                            ) : (
                                <Box display="flex" alignItems="center">
                                    <Input
                                        textAlign={"center"}
                                        mb={"24px"}
                                        type=""
                                        placeholder="email"
                                        name="email"
                                        onChange={handleInput}
                                        value={registerInput.email}
                                    />
                                </Box>
                            )}
                            {registerInput.error_list.password ? (
                                <>
                                    <Box display="flex" alignItems="center">
                                        <Input
                                            textAlign={"center"}
                                            float={"right"}
                                            type=""
                                            placeholder="password"
                                            name="password"
                                            onChange={handleInput}
                                            value={registerInput.password}
                                        />
                                    </Box>
                                    <Text color="red.300">
                                        {registerInput.error_list.password}
                                    </Text>
                                </>
                            ) : (
                                <Box display="flex" alignItems="center">
                                    <Input
                                        textAlign={"center"}
                                        mb={"24px"}
                                        type=""
                                        placeholder="password"
                                        name="password"
                                        onChange={handleInput}
                                        value={registerInput.password}
                                    />
                                </Box>
                            )}
                            <Box textAlign={"center"}>
                                <Button
                                    type="submit"
                                    bg={"white"}
                                    _hover={{ opacity: 1 }}
                                >
                                    <Text
                                        color={"blue.500"}
                                        fontWeight={"200"}
                                        _hover={{
                                            borderBottom: "1px solid #3B82F6",
                                        }}
                                    >
                                        サインアップ
                                    </Text>
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Register;
