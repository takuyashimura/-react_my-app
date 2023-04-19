import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    StackDivider,
    VStack,
    Text,
    Flex,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, memo } from "react";
import { CustomButtom } from "../tags/buttom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    choiceMenu: any;
};

export const MenuCookModal: FC<Props> = memo((props) => {
    const { isOpen, onClose, choiceMenu } = props;

    const toast = useToast();

    const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post("http://localhost:8888/api/add_buy_list", choiceMenu)
            .then((response) => {
                console.log("post", response.data);
                toast({
                    title: "不足している食材がカートに追加されました",
                    description: "カートをご確認ください",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePost1 = () => {
        axios
            .post("http://localhost:8888/api/add_cooking_list", choiceMenu[1])
            .then((response) => {
                console.log("response", response.data);
                toast({
                    title: `${choiceMenu[1]["name"]}が調理リストに追加されました`,
                    description: "調理リストをご確認ください",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{choiceMenu && choiceMenu[1]["name"]}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <>
                        <div>
                            <form onSubmit={handlePost}>
                                <VStack
                                    divider={
                                        <StackDivider borderColor="gray.200" />
                                    }
                                    spacing={1}
                                    align="stretch"
                                >
                                    {choiceMenu && choiceMenu[0].length > 0 && (
                                        <Text mt={2} mb={2} fontWeight={700}>
                                            不足数
                                        </Text>
                                    )}
                                    {choiceMenu && choiceMenu[0].length > 0 ? (
                                        choiceMenu[0].map((f: any) => (
                                            <>
                                                <Flex
                                                    bg={"red.200"}
                                                    justify="space-between"
                                                    key={f.id}
                                                >
                                                    <Text>{f.name}</Text>
                                                    <Flex>
                                                        <Text color={"red"}>
                                                            {f.food_amount}
                                                        </Text>
                                                        <Text>個</Text>
                                                    </Flex>
                                                </Flex>
                                            </>
                                        ))
                                    ) : (
                                        <Text fontWeight={700}>
                                            不足分はありません
                                        </Text>
                                    )}
                                </VStack>
                                {choiceMenu && choiceMenu[0].length > 0 && (
                                    <Box w={"100%"} textAlign={"right"}>
                                        <CustomButtom mt={1} type="submit">
                                            {" "}
                                            カートに追加する
                                        </CustomButtom>
                                    </Box>
                                )}
                            </form>
                        </div>
                        <div>
                            <Box fontWeight={700}>使用食材</Box>
                            <VStack
                                divider={
                                    <StackDivider borderColor="gray.200" />
                                }
                                spacing={1}
                                align="stretch"
                            >
                                {choiceMenu &&
                                    choiceMenu[2].map((f: any) => (
                                        <>
                                            <Flex
                                                justify="space-between"
                                                key={f.food_id}
                                            >
                                                <Text>{f.name}</Text>
                                                <Text>{f.food_amount}個</Text>
                                            </Flex>
                                        </>
                                    ))}
                            </VStack>
                            <Box w={"100%"} textAlign={"right"}>
                                {" "}
                                <CustomButtom onClick={handlePost1}>
                                    調理リストへ追加する
                                </CustomButtom>
                            </Box>
                        </div>
                    </>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
