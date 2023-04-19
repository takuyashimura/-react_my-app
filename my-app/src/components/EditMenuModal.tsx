import {
    Box,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    StackDivider,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
    useDisclosure,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { VFC, memo, useEffect, useState } from "react";
import { CustomButtom } from "../tags/buttom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    menuName: any;
    menuData: any;
};

export const EditMenuModal: VFC<Props> = memo((props) => {
    const { isOpen, onClose, menuName, menuData } = props;
    const [postMenuData, setPostMenuData] = useState<any[] | undefined>(
        undefined
    );
    useEffect(() => {
        if (menuName && menuData) {
            setPostMenuData(menuData);
            console.log("menuName", menuName.name);
            console.log("menuData", menuData);
        }
    }, []);

    const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post("http://localhost:8888/api/add_menu_edit", {
                menuName,
                postMenuData,
            })
            .then((response) => {
                console.log("post", response.data);
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onChangeFoodNumber = (e: string, name: string, foodId: number) => {
        if (postMenuData?.some((d) => d.id === foodId)) {
            const updatedMenuData = postMenuData.map((data) =>
                data.id === foodId
                    ? { id: foodId, name, food_amount: Number(e) }
                    : data
            );
            setPostMenuData(updatedMenuData);
        } else {
            setPostMenuData([
                ...(postMenuData ? postMenuData : []),
                {
                    id: foodId,
                    name,
                    food_amount: Number(e),
                },
            ]);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {menuName &&
                        menuName.name &&
                        `${menuName.name}で使用する食材`}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handlePost}>
                        <Box w={"100%"} textAlign={"right"}>
                            {" "}
                            <CustomButtom mb={2} type="submit">
                                {" "}
                                使用する食材を変更する{" "}
                            </CustomButtom>
                        </Box>

                        <VStack
                            divider={<StackDivider borderColor="gray.200" />}
                            spacing={4}
                            align="stretch"
                        >
                            {menuData &&
                                menuData.length > 0 &&
                                menuData.map((m: any) => (
                                    <>
                                        <Flex justify="space-between">
                                            <Box
                                                key={m.id}
                                                h="40px"
                                                width={"50%"}
                                            >
                                                <Text
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    height={"100%"}
                                                >
                                                    {m.name}
                                                </Text>
                                            </Box>
                                            <Box width={"50%"}>
                                                <NumberInput
                                                    defaultValue={m.food_amount}
                                                    min={0}
                                                    onChange={(e) =>
                                                        onChangeFoodNumber(
                                                            e,
                                                            m.name,
                                                            m.id
                                                        )
                                                    }
                                                >
                                                    <NumberInputField
                                                        textAlign={"right"}
                                                    />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Box>
                                        </Flex>
                                    </>
                                ))}
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
